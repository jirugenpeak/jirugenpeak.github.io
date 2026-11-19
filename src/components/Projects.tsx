import { Fragment } from 'react'
import { projects } from '../data/projects'
import { ResourceLink } from './ResourceLink'

export function Projects() {
  return (
    <section className="document-section" aria-labelledby="projects-title">
      <h2 id="projects-title">Selected Projects</h2>
      <ul className="entry-list">
        {projects.map((project) => (
          <li className="project-entry" key={project.id} id={project.id}>
            <div className="project-heading">
              <h3>{project.title}</h3>
              <div className="project-links">
                <ResourceLink label="GitHub" url={project.githubUrl} accessibleName={`${project.title} on GitHub`} showArrow animateArrow />
                <ResourceLink label="Blog" url={project.blogUrl ?? null} accessibleName={`Blog post about ${project.title}`} showArrow animateArrow />
                {project.liveUrl && (
                  <ResourceLink label="Demo" url={project.liveUrl} accessibleName={`Live demo of ${project.title}`} />
                )}
              </div>
            </div>
            <p className="entry-description">{project.description}</p>
            {project.technologies.length > 0 && <p className="technologies">
              {project.technologies.map((term, index) => (
                <Fragment key={term}>
                  {index > 0 && ' · '}
                  <span className="inline-block max-w-full">{term}</span>
                </Fragment>
              ))}
            </p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
