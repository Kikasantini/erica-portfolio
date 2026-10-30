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
    <main>
      <h1>{t('title')}</h1>
      <p>{t('personalIntro')}</p>
      <p>{t('professionalSummary')}</p>

      <section aria-labelledby="contact-title">
        <h2 id="contact-title">{t('contactTitle')}</h2>
        <ul>
          {contactLinks.map((link) => {
            const isExternal = link.id !== 'email'

            return (
              <li key={link.id}>
                <a
                  href={link.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
