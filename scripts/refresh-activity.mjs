import { readFile, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import process from 'node:process'

const snapshotFile = new URL('../src/data/activity.json', import.meta.url)
const owner = process.env.GITHUB_REPOSITORY_OWNER || 'jirugenpeak'

class ActivityError extends Error {}

async function requestJson(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(12_000) })
  if (!response.ok) throw new ActivityError(`HTTP ${response.status}`)
  return response.json()
}

async function latestRepository() {
  const url = new URL('https://api.github.com/search/commits')
  url.search = new URLSearchParams({
    q: `user:${owner} author:${owner} is:public`,
    sort: 'committer-date',
    order: 'desc',
    per_page: '1',
  }).toString()
  const headers = { Accept: 'application/vnd.github+json' }
  if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`
  const result = await requestJson(url, { headers })
  if (result.incomplete_results || !Array.isArray(result.items)) throw new ActivityError('Incomplete search')
  const commit = result.items[0]
  if (!commit) return null
  const repo = commit.repository
  if (repo.private !== false || repo.owner.login.toLowerCase() !== owner.toLowerCase()) {
    throw new ActivityError('Unexpected repository')
  }
  return { fullName: repo.full_name, committedAt: new Date(commit.commit.committer.date).toISOString() }
}

async function lastPlayedSong() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refreshToken } = process.env
  if (!id && !secret && !refreshToken) return null
  if (!id || !secret || !refreshToken) throw new ActivityError('Spotify setup is incomplete')
  const token = await requestJson('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}` },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  })
  if (!token.access_token) throw new ActivityError('Missing Spotify access token')
  const history = await requestJson('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: { Authorization: `Bearer ${token.access_token}` },
  })
  if (!Array.isArray(history.items)) throw new ActivityError('Unexpected Spotify history')
  if (!history.items.length) return null
  const track = history.items[0].track
  if (!track?.name || !track.artists?.length) throw new ActivityError('Missing track metadata')
  return { title: track.name, artist: track.artists.map(artist => artist.name).join(', '), spotifyId: track.id ?? null }
}

async function refresh(label, retrieve, previous) {
  try {
    return await retrieve()
  } catch (error) {
    // Log a status, never an API response body, request headers, or listening history.
    const reason = error instanceof ActivityError ? error.message : 'Network or response error'
    console.warn(`${label} refresh failed (${reason}). Keeping the last snapshot.`)
    return previous
  }
}

const previous = JSON.parse(await readFile(snapshotFile, 'utf8'))
const previousRepo = previous.repository?.fullName.split('/')[0].toLowerCase() === owner.toLowerCase()
  ? previous.repository : null
const [repository, lastPlayed] = await Promise.all([
  refresh('GitHub', latestRepository, previousRepo),
  refresh('Spotify', lastPlayedSong, previous.lastPlayed),
])
await writeFile(snapshotFile, JSON.stringify({ repository, lastPlayed }, null, 2) + '\n')
