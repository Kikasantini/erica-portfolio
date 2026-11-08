import { useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

type ContactLink = {
  id: string
  label: string
  url: string
  download?: string
}

type PersonalHighlight = {
  id: string
  front: string
  back: string
}

function AnimatedTitleLayer({
  text,
  variant,
}: {
  text: string
  variant: 'original' | 'nickname'
}) {
  let letterIndex = 0

  return (
    <span
      className={`home-title__layer home-title__layer--${variant}`}
      aria-hidden="true"
    >
      {text.trim().split(/\s+/).map((word, wordIndex) => (
        <span className="home-title__word" key={variant + '-word-' + wordIndex}>
          {Array.from(word).map((character) => {
            const currentIndex = letterIndex++

            return (
              <span
                className="home-title__letter"
                key={variant + '-letter-' + currentIndex}
                style={
                  { '--letter-index': currentIndex } as CSSProperties
                }
              >
                {character}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

export default function Home() {
  const { t } = useTranslation('home')
  const { t: projectT } = useTranslation('projects')
  const { t: journeyT } = useTranslation('journey')
  const { language = 'en' } = useParams()
  const recentSection = (projectT('sections', { returnObjects: true }) as Array<{
    id: string
    title: string
    items: Array<{
      id: string
      title: string
      status?: string
      highlights: string[]
      githubUrl: string
      technologies: string
    }>
  }>).find((section) => section.id === 'recentProjects')
  const certificates = journeyT('certificates', { returnObjects: true }) as Array<{
    id: string
    title: string
    issuer: string
    period: string
    image: string
    imageAlt: string
    credentialUrl: string
  }>
  const firstCertificate = certificates[0]
  const [isHovered, setIsHovered] = useState(false)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  const title = t('title')
  const nicknameTitle = t('hoverTitle')
  const contactLinks = t('contactLinks', {
    returnObjects: true,
  }) as ContactLink[]
  const personalHighlights = t('personalHighlights', {
    returnObjects: true,
  }) as PersonalHighlight[]

  return (
    <main className="home-page">
      <div className="home-hero">
        <div className="home-hero__copy">
      <p className="home-eyebrow">{t('roleLocation')}</p>
      <h1
        className={`home-title${isHovered ? ' home-title--hovered' : ''}`}
        aria-label={title}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setIsHovered(true)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setIsHovered(false)
        }}
      >
        <AnimatedTitleLayer text={title} variant="original" />
        <AnimatedTitleLayer text={nicknameTitle} variant="nickname" />
      </h1>
      <p className="home-intro">
        {t('aiIntro')} {t('personalIntro')}
      </p>

      <nav className="home-contact" aria-label={t('contactTitle')}>
        {contactLinks.map((link) => {
          const isExternal = link.id === 'linkedin' || link.id === 'github'

          return (
            <a
              className="home-contact__link"
              key={link.id}
              href={link.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              aria-label={link.label}
              data-tooltip={link.label}
              download={link.download}
            >
              <svg className="home-contact__icon" aria-hidden="true" viewBox="0 0 24 24">
                {link.id === 'linkedin' ? (
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.456v6.285ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.56 20.452h3.554V9H3.56v11.452Z" />
                ) : link.id === 'github' ? (
                  <path fillRule="evenodd" d="M12 .75a11.25 11.25 0 0 0-3.558 21.924c.563.104.77-.244.77-.542 0-.268-.01-.976-.015-1.916-3.13.68-3.79-1.508-3.79-1.508-.512-1.3-1.25-1.647-1.25-1.647-1.022-.698.077-.684.077-.684 1.13.08 1.724 1.16 1.724 1.16 1.004 1.72 2.635 1.223 3.278.935.102-.726.393-1.223.715-1.504-2.498-.284-5.126-1.25-5.126-5.565 0-1.23.44-2.235 1.16-3.023-.116-.285-.503-1.43.11-2.98 0 0 .945-.303 3.094 1.155a10.75 10.75 0 0 1 5.63 0c2.15-1.458 3.093-1.155 3.093-1.155.615 1.55.228 2.695.112 2.98.722.788 1.158 1.793 1.158 3.023 0 4.326-2.633 5.278-5.138 5.557.404.35.763 1.04.763 2.095 0 1.513-.014 2.735-.014 3.108 0 .3.203.65.772.54A11.25 11.25 0 0 0 12 .75Z" clipRule="evenodd" />
                ) : link.id === 'resume' ? (
                  <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 18v3h14v-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <>
                    <path d="M3 5.5h18a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                    <path d="m2.5 7 9.5 7 9.5-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
              </svg>
              <span className="visually-hidden">{link.label}</span>
            </a>
          )
        })}
      </nav>
        </div>
        <div className="home-hero__art" role="img" aria-label={t('workspaceArtworkAlt')} />
      </div>

      <div className="home-overview">
      <section className="home-section" aria-labelledby="home-work-title">
        <h2 id="home-work-title">{t('workTitle')}</h2>
        <p>{t('professionalSummary')}</p>
      </section>

      <section className="home-section home-section--career" aria-labelledby="home-career-title">
        <h2 id="home-career-title">{t('careerTitle')}</h2>
        <p>{t('careerSummary')}</p>
      </section>
      </div>

      {recentSection && (
        <section className="home-featured" aria-labelledby="home-featured-title">
          <div className="home-featured__heading">
            <h2 id="home-featured-title">{recentSection.title}</h2>
            <Link to={`/${language}/projects`} className="home-featured__all">
              {t('viewAllProjects')} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-featured__grid">
            {recentSection.items.map((project) => (
              <article className="home-project" key={project.id}>
                <div className="home-project__heading">
                  <h3>{project.title}</h3>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                     aria-label={project.title + ' — GitHub'} className="home-project__github">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 .297a12 12 0 0 0-3.79 23.385c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576A12.001 12.001 0 0 0 12 .297" />
                    </svg>
                  </a>
                </div>
                {project.status && <span className="project-status">{project.status}</span>}
                <p>{project.highlights[0]}</p>
                <ul className="home-project__tags" aria-label={projectT('technologiesTitle')}>
                  {project.technologies.split(' · ').slice(0, 5).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {firstCertificate && (
        <section className="home-badge" aria-labelledby="home-badge-title">
          <h2 id="home-badge-title">{journeyT('certificatesTitle')}</h2>
          <div className="home-badge__content">
            <img src={firstCertificate.image} alt={firstCertificate.imageAlt} loading="lazy" />
            <div>
              <h3>{firstCertificate.title}</h3>
              <p>{firstCertificate.issuer} · {firstCertificate.period}</p>
            </div>
            <a href={firstCertificate.credentialUrl} target="_blank" rel="noreferrer">
              {journeyT('verifyCertificate')} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      )}

      <section
        className="home-section home-section--personal"
        aria-labelledby="home-interests-title"
      >
        <h2 id="home-interests-title">{t('interestsTitle')}</h2>
        <div className="home-fun-cards">
          {personalHighlights.map((card) => {
            const isFlipped = Boolean(flippedCards[card.id])

            return (
              <button
                className={`home-fun-card${isFlipped ? ' is-flipped' : ''}`}
                type="button"
                key={card.id}
                aria-label={isFlipped ? card.back : card.front}
                aria-pressed={isFlipped}
                onClick={() =>
                  setFlippedCards((current) => ({
                    ...current,
                    [card.id]: !current[card.id],
                  }))
                }
              >
                <span className="home-fun-card__inner" aria-hidden="true">
                  <span className="home-fun-card__face home-fun-card__face--front">
                    {card.front}
                  </span>
                  <span className="home-fun-card__face home-fun-card__face--back">
                    {card.back}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}
