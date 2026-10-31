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
  onOpenMedia,
}: {
  projectTitle: string
  media: ProjectMedia[]
  previousLabel: string
  nextLabel: string
  openMediaLabel: string
  onOpenMedia: (index: number) => void
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
  const actionRef = useRef({ onClose, onPrevious, onNext })
  actionRef.current = { onClose, onPrevious, onNext }
  const currentMedia = viewer.media[viewer.currentIndex]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') actionRef.current.onClose()
      if (event.key === 'ArrowLeft') actionRef.current.onPrevious()
      if (event.key === 'ArrowRight') actionRef.current.onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
              <article
                className={`project-item${project.media.length > 0 ? ' project-item--with-media' : ''}`}
                key={project.id}
              >
                <ProjectMediaGallery
                  projectTitle={project.title}
                  media={project.media}
                  previousLabel={t('previousMedia')}
                  nextLabel={t('nextMedia')}
                  openMediaLabel={t('openMedia')}
                  onOpenMedia={(index) => openViewer(project, index)}
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
