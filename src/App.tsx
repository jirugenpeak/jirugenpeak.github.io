import { Fragment } from 'react'
import { ActivityLines, LocalClock, useCurrentMinute } from './components/Activity'
import { Projects } from './components/Projects'
import { ResourceLink } from './components/ResourceLink'
import { ThemeToggle } from './components/ThemeToggle'
import { Writing } from './components/Writing'
import { site } from './data/site'

export default function App() {
  const now = useCurrentMinute()

  return (
    <div className="page">
      <a className="skip-link" href="#introduction">Skip to content</a>
      <header className="masthead flex flex-wrap items-center justify-between gap-3">
        <span className="monogram" aria-hidden="true">as.</span>
        <div className="header-actions flex items-center">
          <ResourceLink label="Résumé" url={site.resumeUrl} />
          <ThemeToggle />
        </div>
      </header>

      <main id="introduction" tabIndex={-1}>
        <section className="introduction" aria-labelledby="name">
          <h1 id="name">{site.name}</h1>
          <p className="descriptor">
            {site.descriptor.map((area, index) => (
              <Fragment key={area}>
                {index > 0 && ' · '}
                <span className="inline-block">{area}</span>
              </Fragment>
            ))}
          </p>
          <p className="intro-copy">
            {site.intro.work}{' '}
            <a className="employer-link link-arrow-motion" href={site.intro.employerUrl}>
              {site.intro.employer}{' '}<span className="link-arrow" aria-hidden="true">↗</span>
            </a>. {site.intro.about}
          </p>
          <ActivityLines now={now} />
        </section>
        <Projects />
        <Writing />
      </main>

      <footer className="colophon">
        <ul className="contact-links" aria-label="Contact">
          {site.contacts.map(({ label, url }, index) => (
            <li key={label}>
              {index > 0 && <span aria-hidden="true">·</span>}
              <ResourceLink label={label} url={url} showArrow={false} />
            </li>
          ))}
        </ul>
        <div className="footer-meta">
          <LocalClock now={now} />
          <span aria-hidden="true">·</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  )
}
