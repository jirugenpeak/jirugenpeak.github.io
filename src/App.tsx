import { Fragment } from 'react'
import { ActivityLines, LocalClock, useCurrentMinute } from './components/Activity'
import { Projects } from './components/Projects'
import { ResourceLink } from './components/ResourceLink'
import { ThemeToggle } from './components/ThemeToggle'
import { Writing } from './components/Writing'
import { site } from './data/site'

export default function App() {
  const now = useCurrentMinute()
  const contactsPending = site.contacts.every((contact) => !contact.url)

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
            <a className="employer-link" href={site.intro.employerUrl}>
              {site.intro.employer}<span aria-hidden="true"> ↗</span>
            </a>. {site.intro.about}
          </p>
          <ActivityLines now={now} />
        </section>
        <Projects />
      </main>

      <footer>
        <Writing />
        <section className="document-section contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <div className="contact-details flex flex-wrap items-baseline">
            <ul className="contact-links flex flex-wrap items-baseline">
              {site.contacts.map(({ label, url }) => (
                <li key={label}><ResourceLink label={label} url={url} groupStatus={contactsPending} /></li>
              ))}
            </ul>
            {contactsPending && <small className="contact-status">Links pending</small>}
          </div>
        </section>
        <div className="colophon flex flex-wrap items-baseline justify-between gap-2">
          <p>© 2026 {site.name}</p>
          <LocalClock now={now} />
        </div>
      </footer>
    </div>
  )
}
