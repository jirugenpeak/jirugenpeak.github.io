import { useEffect, useState } from 'react'
import snapshot from '../data/activity.json'

type Activity = {
  repository: { fullName: string; committedAt: string } | null
  lastPlayed: { title: string; artist: string; spotifyId: string | null } | null
}

const activity: Activity = snapshot
const ist = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
})

export function useCurrentMinute() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    function tick() {
      setNow(new Date())
      timer = window.setTimeout(tick, 60_000 - Date.now() % 60_000)
    }
    let timer = window.setTimeout(tick, 60_000 - Date.now() % 60_000)
    return () => window.clearTimeout(timer)
  }, [])
  return now
}

export function LocalClock({ now }: { now: Date }) {
  return (
    <time className="local-clock" dateTime={now.toISOString()} title="India Standard Time (UTC+05:30)">
      {ist.format(now)} IST
    </time>
  )
}

function commitAge(timestamp: string, now: Date) {
  const minutes = Math.max(0, Math.floor((now.getTime() - Date.parse(timestamp)) / 60_000))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
  return `${Math.floor(minutes / 1440)}d ago`
}

export function ActivityLines({ now }: { now: Date }) {
  const { repository, lastPlayed } = activity
  return (
    <div className="activity-lines">
      <p>
        {lastPlayed ? <>
          Last played song — {lastPlayed.spotifyId
            ? <a href={`https://open.spotify.com/track/${lastPlayed.spotifyId}`}>{lastPlayed.title}</a>
            : lastPlayed.title} by {lastPlayed.artist}.
        </> : 'Last played song — unavailable.'}
      </p>
      <p>
        {repository ? <>
          Currently building <a href={`https://github.com/${repository.fullName}`}>{repository.fullName.split('/')[1]}</a>
          {' '}<span className="inline-block">(last commit <time dateTime={repository.committedAt} title={repository.committedAt}>{commitAge(repository.committedAt, now)}</time>).</span>
        </> : 'Currently building — repository unavailable.'}
      </p>
    </div>
  )
}
