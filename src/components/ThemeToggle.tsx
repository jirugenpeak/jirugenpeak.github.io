import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

const storageKey = 'portfolio-theme'
const darkPreference = '(prefers-color-scheme: dark)'

function readSavedTheme(): Theme | null {
  try {
    const theme = localStorage.getItem(storageKey)
    return theme === 'light' || theme === 'dark' ? theme : null
  } catch {
    return null
  }
}

function subscribeToSystemTheme(onChange: () => void) {
  const preference = window.matchMedia(darkPreference)
  preference.addEventListener('change', onChange)
  return () => preference.removeEventListener('change', onChange)
}

function prefersDark() {
  return window.matchMedia(darkPreference).matches
}

export function ThemeToggle() {
  const [savedTheme, setSavedTheme] = useState(readSavedTheme)
  const systemIsDark = useSyncExternalStore(subscribeToSystemTheme, prefersDark)
  const theme = savedTheme ?? (systemIsDark ? 'dark' : 'light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const label = `Switch to ${nextTheme} theme`
  const Icon = nextTheme === 'dark' ? Moon : Sun

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColor) themeColor.content = theme === 'dark' ? '#151515' : '#FAFAF8'
  }, [theme])

  useEffect(() => {
    function syncTabs(event: StorageEvent) {
      if (event.key === null || event.key === storageKey) setSavedTheme(readSavedTheme())
    }
    window.addEventListener('storage', syncTabs)
    return () => window.removeEventListener('storage', syncTabs)
  }, [])

  function toggleTheme() {
    setSavedTheme(nextTheme)
    try {
      localStorage.setItem(storageKey, nextTheme)
    } catch {
      // Keep the selection for this visit when persistent storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" type="button" aria-label={label} title={label} onClick={toggleTheme}>
      <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
    </button>
  )
}
