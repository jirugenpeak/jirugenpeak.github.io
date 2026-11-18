# Aditya Sharma’s portfolio

A single-page personal website built with React, TypeScript, Tailwind CSS, and Vite. All content lives in this repository.

## Run locally

Use Node.js 24 and npm. From the repository root, run

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the code and preview the production build, run

```sh
npm run lint
npm run build
npm run preview
```

The build checks TypeScript and writes the production files to `dist/`. To check types independently, run `npm run typecheck`.

## Update the portfolio

| Edit | File | How |
| --- | --- | --- |
| Personal details and contact | `src/data/site.ts` | Edit the introduction and descriptor. Set the social URLs and a `mailto:` email link. For a local résumé, place the PDF in `public/` and set `resumeUrl` to its relative filename, such as `resume.pdf`. |
| Selected projects | `src/data/projects.ts` | The examples illustrate architecture trade-offs. Replace each with a real title, one short trade-off or measured result, and stack keywords. Set `githubUrl` and `blogUrl` to activate their reserved links, then remove `placeholder: true`. The optional `liveUrl` adds a demo link. |
| Writing | `src/data/posts.ts` | Add a title, ISO date (`YYYY-MM-DD`), description, and unique slug. The first entry replaces the empty state with a compact list. Set the optional `url` to a published article or a relative HTML file in `public/`. Each row also has a `#post-<slug>` anchor. |

## GitHub and Spotify activity

The deployment workflow refreshes activity on pushes, manual runs, and hourly at minute 17. It builds the public snapshot in `src/data/activity.json` into the site. Browsers calculate the commit age and the 24-hour IST clock locally.

The GitHub lookup selects the newest indexed commit you authored on a default branch in a public repository you own. Actions uses the repository owner automatically. Run `npm run activity:refresh` to update the local snapshot. [GitHub commit search](https://docs.github.com/en/search-github/searching-on-github/searching-commits)

### Connect Spotify

1. Create a Web API app in the Spotify Developer Dashboard. Register the exact redirect URI used for authorization. A local callback can use `http://127.0.0.1:8888/callback`. Spotify requires Premium for the owner of a development-mode app. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) · [Development mode](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)
2. Authorize your account using the **Authorization Code** flow with the single scope `user-read-recently-played`. Exchange the authorization code for a refresh token using the app’s client ID and secret. [Spotify authorization walkthrough](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
3. In **GitHub → Settings → Secrets and variables → Actions**, add repository secrets named `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN`. Run the deployment workflow once to publish the first track.

The refresh step requests one recent track and saves its title, artist names, and Spotify track ID. Tokens stay in the workflow step. A temporary API failure preserves the cached public snapshot. Removing all three Spotify secrets clears the song at the next refresh. Renew the grant if it expires or is revoked. [Recently played tracks](https://developer.spotify.com/documentation/web-api/reference/get-recently-played) · [Spotify token lifetime](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens)

## Deploy to GitHub Pages

1. In the GitHub repository, open **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source.
2. Push the site source, `package-lock.json`, and `.github/workflows/deploy.yml` to `main`.
3. Open **Actions → Deploy portfolio to Pages** to follow the build. The deployment job shows the published URL after it succeeds.

If GitHub requires an initial commit before Pages settings are available, push the source first, select **GitHub Actions**, then start the workflow manually.

Each push to `main` installs the locked dependencies, checks lint and types, builds the site, and deploys `dist/`. To redeploy manually, choose **Run workflow** on the same Actions page and select `main`. [GitHub Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

The default Vite base is `/` for a personal Pages site. The workflow reads the actual base path from GitHub Pages, so a project site also works under `/repository-name/`. To build locally for a project path, run `VITE_BASE_PATH=/repository-name/ npm run build`.

The repository `jirugenpeak/jirugenpeak.github.io` publishes at the root of the account’s Pages domain. [Live portfolio](https://jirugenpeak.github.io/)

The workflow also supplies the public Pages URL as `VITE_SITE_URL` for the canonical link and Open Graph URL. To include those tags in a local build, set `VITE_SITE_URL` to the full published URL, including any project path.
