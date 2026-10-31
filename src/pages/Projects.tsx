import { useEffect, useRef, useState } from 'react'
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

type MediaViewerState = {
  projectTitle: string
  media: ProjectMedia[]
  currentIndex: number
}

function ProjectMediaGallery({
  projectTitle,
  media,
  previousLabel,
  nextLabel,
  openMediaLabel,
  placeholderLabel,
  onOpenMedia,
}: {
  projectTitle: string
  media: ProjectMedia[]
  previousLabel: string
  nextLabel: string
  openMediaLabel: string
  placeholderLabel: string
  onOpenMedia: (index: number) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (media.length === 0) {
    return <div className="project-item__gallery project-item__gallery--placeholder" role="img" aria-label={placeholderLabel}>{placeholderLabel}</div>
  }

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
        <div className="project-item__video-wrap">
          <video
            className="project-item__media"
            key={currentMedia.src}
            controls
            playsInline
            preload="metadata"
            aria-label={projectTitle + ': ' + currentMedia.alt}
            onClick={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect()
              if (event.clientY < bounds.bottom - 48) onOpenMedia(currentIndex)
            }}
          >
            <source src={currentMedia.src} type="video/mp4" />
          </video>
          <button
            className="project-item__expand"
            type="button"
            aria-label={openMediaLabel + ': ' + currentMedia.alt}
            onClick={() => onOpenMedia(currentIndex)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          className="project-item__image-button"
          type="button"
          aria-label={openMediaLabel + ': ' + currentMedia.alt}
          onClick={() => onOpenMedia(currentIndex)}
        >
          <img
            className="project-item__media"
            src={currentMedia.src}
            alt={currentMedia.alt}
            loading="lazy"
          />
        </button>
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

function ProjectMediaViewer({
  viewer,
  closeLabel,
  previousLabel,
  nextLabel,
  onClose,
  onPrevious,
  onNext,
}: {
  viewer: MediaViewerState
  closeLabel: string
  previousLabel: string
  nextLabel: string
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const currentMedia = viewer.media[viewer.currentIndex]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onPrevious, onNext])

  return (
    <div className="media-viewer" onClick={onClose}>
      <div
        className="media-viewer__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={viewer.projectTitle}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="media-viewer__button media-viewer__close"
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          ref={closeButtonRef}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        {currentMedia.type === 'video' ? (
          <video
            className="media-viewer__item"
            key={currentMedia.src}
            controls
            playsInline
            autoPlay
            aria-label={viewer.projectTitle + ': ' + currentMedia.alt}
          >
            <source src={currentMedia.src} type="video/mp4" />
          </video>
        ) : (
          <img
            className="media-viewer__item"
            src={currentMedia.src}
            alt={currentMedia.alt}
          />
        )}

        {viewer.media.length > 1 && (
          <>
            <button
              className="media-viewer__button media-viewer__nav media-viewer__nav--previous"
              type="button"
              aria-label={previousLabel}
              onClick={onPrevious}
            >
              <span
                className="project-item__media-chevron project-item__media-chevron--previous"
                aria-hidden="true"
              />
            </button>
            <button
              className="media-viewer__button media-viewer__nav media-viewer__nav--next"
              type="button"
              aria-label={nextLabel}
              onClick={onNext}
            >
              <span
                className="project-item__media-chevron project-item__media-chevron--next"
                aria-hidden="true"
              />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation('projects')
  const sections = t('sections', { returnObjects: true }) as ProjectSection[]
  const [viewer, setViewer] = useState<MediaViewerState | null>(null)

  function openViewer(project: ProjectItem, index: number) {
    setViewer({
      projectTitle: project.title,
      media: project.media,
      currentIndex: index,
    })
  }

  function moveViewer(direction: -1 | 1) {
    setViewer((current) => {
      if (!current || current.media.length < 2) return current
      return {
        ...current,
        currentIndex:
          (current.currentIndex + direction + current.media.length) %
          current.media.length,
      }
    })
  }

  return (
    <main className="projects-page">
      <h1>{t('title')}</h1>

      {sections.map((section) => (
        <section className="project-section" key={section.id}>
          <h2>{section.title}</h2>

          <div className="project-list">
            {section.items.map((project) => (
              <article className="project-item" key={project.id}>
                <ProjectMediaGallery
                  projectTitle={project.title}
                  media={project.media}
                  previousLabel={t('previousMedia')}
                  nextLabel={t('nextMedia')}
                  openMediaLabel={t('openMedia')}
                  placeholderLabel={t('imagePlaceholder')}
                  onOpenMedia={(index) => openViewer(project, index)}
                />

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
                  <p className="project-item__description">
                    {project.description}
                  </p>
                  <div className="project-item__technologies">
                    <p>{t('technologiesTitle')}</p>
                    <ul className="technology-list">
                      {project.technologies.split('·').map((technology) => (
                        <li key={technology.trim()}>{technology.trim()}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {viewer && (
        <ProjectMediaViewer
          viewer={viewer}
          closeLabel={t('closeMedia')}
          previousLabel={t('previousMedia')}
          nextLabel={t('nextMedia')}
          onClose={() => setViewer(null)}
          onPrevious={() => moveViewer(-1)}
          onNext={() => moveViewer(1)}
        />
      )}
    </main>
  )
}
