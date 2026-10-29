import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <main>
      <h1>{t('about.title')}</h1>
      <p>{t('about.paragraph1')}</p>
      <p>{t('about.paragraph2')}</p>
      <p>{t('about.paragraph3')}</p>
    </main>
  )
}
