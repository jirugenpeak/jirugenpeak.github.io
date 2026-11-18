"""One-time Spotify authorization from an interactive macOS terminal."""

import base64
import getpass
import json
import secrets
import subprocess
import time
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlencode, urlsplit
from urllib.request import Request, urlopen


def main():
    client_id = input("Spotify Client ID: ").strip()
    secret = getpass.getpass("Spotify Client secret (hidden): ").strip()
    if not client_id or not secret:
        raise SystemExit("Both fields are required.")
    redirect = "http://127.0.0.1:8888/callback"
    state = secrets.token_urlsafe(32)
    result = {}

    class Callback(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass  # Callback URLs contain the authorization code.

        def do_GET(self):
            url = urlsplit(self.path)
            params = parse_qs(url.query)
            if url.path != "/callback" or params.get("state") != [state]:
                self.send_error(400)
                return
            result["code"] = params.get("code", [None])[0]
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(b"Return to your terminal to finish.")

    authorize = "https://accounts.spotify.com/authorize?" + urlencode({
        "client_id": client_id, "response_type": "code", "state": state,
        "redirect_uri": redirect, "scope": "user-read-recently-played",
    })
    with HTTPServer(("127.0.0.1", 8888), Callback) as server:
        print("Opening Spotify. If needed, open this URL yourself:", authorize, sep="\n")
        webbrowser.open(authorize)
        server.timeout = 1
        deadline = time.monotonic() + 300
        while not result and time.monotonic() < deadline:
            server.handle_request()
    if not result.get("code"):
        raise SystemExit("Authorization was declined or timed out.")

    basic = base64.b64encode(f"{client_id}:{secret}".encode()).decode()
    request = Request("https://accounts.spotify.com/api/token", headers={
        "Authorization": f"Basic {basic}",
    }, data=urlencode({
        "grant_type": "authorization_code", "code": result["code"], "redirect_uri": redirect,
    }).encode())
    with urlopen(request, timeout=20) as response:
        token = json.load(response)["refresh_token"]
    subprocess.run(["pbcopy"], input=token, text=True, check=True)
    print("Refresh token copied. Paste it into the GitHub secret SPOTIFY_REFRESH_TOKEN.")


if __name__ == "__main__":
    main()
