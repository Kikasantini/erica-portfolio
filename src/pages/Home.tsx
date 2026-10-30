import { useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

type ContactLink = {
  id: string
  label: string
  url: string
}

type PersonalHighlight = {
  id: string
  text: string
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
  const [isHovered, setIsHovered] = useState(false)
  const title = t('title')
  const nicknameTitle = t('nicknameTitle')
  const contactLinks = t('contactLinks', {
    returnObjects: true,
  }) as ContactLink[]
  const personalHighlights = t('personalHighlights', {
    returnObjects: true,
  }) as PersonalHighlight[]

  return (
    <main className="home-page">
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
      <p className="home-intro">{t('personalIntro')}</p>

      <nav className="home-contact" aria-label={t('contactTitle')}>
        {contactLinks.map((link) => {
          const isExternal = link.id !== 'email'

          return (
            <a
              className="home-contact__link"
              key={link.id}
              href={link.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          )
        })}
      </nav>

      <section className="home-section" aria-labelledby="home-work-title">
        <h2 id="home-work-title">{t('workTitle')}</h2>
        <p>{t('professionalSummary')}</p>
      </section>

      <section
        className="home-section home-section--personal"
        aria-labelledby="home-interests-title"
      >
        <h2 id="home-interests-title">{t('interestsTitle')}</h2>
        <div className="home-interests">
          {personalHighlights.map((highlight) => (
            <p key={highlight.id}>{highlight.text}</p>
          ))}
        </div>
      </section>
    </main>
  )
}
