import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ProjectImage = {
  type: 'image'
  src: string
  alt: string
}

type ProjectItem = {
  id: string
  title: string
  highlights: string[]
  technologies: string
  status?: string
  githubUrl: string
  githubLabel: string
  media: ProjectImage[]
}

type ProjectSection = {
  id: string
  title: string
  items: ProjectItem[]
}

// Try the numbered JPG first, then PNG; missing files leave no empty media area.
function ProjectIllustration({ src }: { src: string }) {
  const [imageFormat, setImageFormat] = useState<'jpg' | 'png' | null>('jpg')

  if (imageFormat === null) return null

  return (
    <img
      className="project-item__illustration"
      src={imageFormat === 'jpg' ? src : src.replace(/\.jpg$/i, '.png')}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setImageFormat((current) => current === 'jpg' ? 'png' : null)}
    />
  )
}

export default function Projects() {
  const { t } = useTranslation('projects')
  const sections = t('sections', { returnObjects: true }) as ProjectSection[]
  // Newest projects appear first, but image numbers increase chronologically.
  // Adding a new project at the top gives it the next number without renaming old images.
  const projectsInDisplayOrder = sections.flatMap((section) => section.items)
  const illustrationPaths = new Map(
    projectsInDisplayOrder.map((project, index) => [
      project.id,
      `/images/project-illustrations/${String(projectsInDisplayOrder.length - index).padStart(2, '0')}.jpg`,
    ]),
  )

  return (
    <main className="projects-page">
      {sections.map((section) => (
        <section className="project-section" key={section.id}>
          <h2>{section.title}</h2>
          <div className="project-list">
            {section.items.map((project) => {
              const illustrationSrc = illustrationPaths.get(project.id)
              return (
                <article className="project-item project-item--editorial" key={project.id}>
                  {project.status && (
                    <span className="project-status">{project.status}</span>
                  )}
                  {illustrationSrc && <ProjectIllustration src={illustrationSrc} />}

                  <div className="project-item__content">
                    <div className="project-item__title-row">
                      <h3>{project.title}</h3>
                      <a
                        className="project-github-link"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={project.githubLabel + ': ' + project.title}
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                          <path d="M12 .297a12 12 0 0 0-3.79 23.385c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576A12.001 12.001 0 0 0 12 .297" />
                        </svg>
                      </a>
                    </div>

                    <ul className="project-item__highlights">
                      {project.highlights.map((highlight, index) => (
                        <li key={project.id + '-highlight-' + index}>{highlight}</li>
                      ))}
                    </ul>

                    <div className="project-item__technologies">
                      <ul className="technology-list" aria-label={t('technologiesTitle')}>
                        {project.technologies.split('·').map((technology) => (
                          <li key={technology.trim()}>{technology.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}

    </main>
  )
}
