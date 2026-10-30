import { useTranslation } from 'react-i18next'

type ContactLink = {
  id: string
  label: string
  url: string
}

export default function Home() {
  const { t } = useTranslation('home')
  const contactLinks = t('contactLinks', {
    returnObjects: true,
  }) as ContactLink[]

  return (
    <main className="home-page">
      <p className="home-eyebrow">{t('roleLocation')}</p>
      <h1>{t('title')}</h1>
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
        <p>{t('personalInterests')}</p>
      </section>
    </main>
  )
}
