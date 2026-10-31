import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ProjectMedia = {
  type: 'image' | 'video'
  src: string
  alt: string
}

type ProjectItem = {
  id: string
  title: string
  description: string
  technologies: string
  githubUrl: string
  githubLabel: string
  media: ProjectMedia[]
}

type ProjectSection = {
  id: string
  title: string
  items: ProjectItem[]
}

function ProjectMediaGallery({
  projectTitle,
  media,
  previousLabel,
  nextLabel,
}: {
  projectTitle: string
  media: ProjectMedia[]
  previousLabel: string
  nextLabel: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (media.length === 0) return null

  const currentMedia = media[currentIndex]

  function showPrevious() {
    setCurrentIndex((index) => (index - 1 + media.length) % media.length)
  }

  function showNext() {
    setCurrentIndex((index) => (index + 1) % media.length)
  }

  return (
    <div className="project-item__gallery">
      {currentMedia.type === 'video' ? (
        <video
          className="project-item__media"
          key={currentMedia.src}
          controls
          playsInline
          preload="metadata"
          aria-label={projectTitle + ': ' + currentMedia.alt}
        >
          <source src={currentMedia.src} type="video/mp4" />
        </video>
      ) : (
        <img
          className="project-item__media"
          src={currentMedia.src}
          alt={currentMedia.alt}
          loading="lazy"
        />
      )}

      {media.length > 1 && (
        <>
          <button
            className="project-item__media-arrow project-item__media-arrow--previous"
            type="button"
            aria-label={previousLabel}
            onClick={showPrevious}
          >
            <span
              className="project-item__media-chevron project-item__media-chevron--previous"
              aria-hidden="true"
            />
          </button>
          <button
            className="project-item__media-arrow project-item__media-arrow--next"
            type="button"
            aria-label={nextLabel}
            onClick={showNext}
          >
            <span
              className="project-item__media-chevron project-item__media-chevron--next"
              aria-hidden="true"
            />
          </button>
        </>
      )}
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation('projects')
  const sections = t('sections', { returnObjects: true }) as ProjectSection[]

  return (
    <main className="projects-page">
      <h1>{t('title')}</h1>

      {sections.map((section) => (
        <section className="project-section" key={section.id}>
          <h2>{section.title}</h2>

          <div className="project-list">
            {section.items.map((project) => (
              <article
                className={`project-item${project.media.length > 0 ? ' project-item--with-media' : ''}`}
                key={project.id}
              >
                <ProjectMediaGallery
                  projectTitle={project.title}
                  media={project.media}
                  previousLabel={t('previousMedia')}
                  nextLabel={t('nextMedia')}
                />

                <div className="project-item__content">
                  <h3>{project.title}</h3>
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
        </section>
      ))}
    </main>
  )
}
