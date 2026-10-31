import { useTranslation } from 'react-i18next'

type ProjectItem = {
  id: string
  title: string
  description: string
  technologies: string
  githubUrl: string
  githubLabel: string
  image?: string
  imageAlt?: string
}

export default function Projects() {
  const { t } = useTranslation('projects')
  const projects = t('items', { returnObjects: true }) as ProjectItem[]

  return (
    <main className="projects-page">
      <h1>{t('title')}</h1>

      <div className="project-list">
        {projects.map((project) => (
          <article
            className={`project-item${project.image ? ' project-item--with-image' : ''}`}
            key={project.id}
          >
            {project.image && (
              <img
                className="project-item__image"
                src={project.image}
                alt={project.imageAlt ?? ''}
                loading="lazy"
              />
            )}
            <div className="project-item__content">
              <h2>{project.title}</h2>
              <p className="project-item__description">{project.description}</p>
              <div className="project-item__technologies">
                <p>{t('technologiesTitle')}</p>
                <ul className="technology-list">
                  {project.technologies.split('·').map((technology) => (
                    <li key={technology.trim()}>{technology.trim()}</li>
                  ))}
                </ul>
              </div>
              <a
                className="project-link"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={project.githubLabel + ': ' + project.title}
              >
                {project.githubLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
