import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ExperienceItem = {
  id: string
  role: string
  company: string
  location: string
  period: string
  details: string[]
  coreTechnologies: string[]
  additionalTechnologies: string[]
}

type EducationItem = {
  id: string
  program: string
  institution: string
  location: string
  period: string
  details: string[]
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const { t } = useTranslation('journey')
  const [showAdditional, setShowAdditional] = useState(false)
  const coreTechnologies = item.coreTechnologies ?? []
  const additionalTechnologies = item.additionalTechnologies ?? []
  const additionalId = 'additional-technologies-' + item.id

  return (
    <article className="timeline-item">
      <h3>{item.role}</h3>
      <p className="timeline-item__meta">
        {item.company} · {item.location}
      </p>
      <p className="timeline-item__period">{item.period}</p>

      <ul className="journey-details">
        {item.details.map((detail, index) => (
          <li key={item.id + '-detail-' + index}>{detail}</li>
        ))}
      </ul>

      {coreTechnologies.length > 0 && (
        <div className="technology-group">
          <h4>{t('coreTechnologiesTitle')}</h4>
          <ul className="technology-list">
            {coreTechnologies.map((technology) => (
              <li key={item.id + '-core-' + technology}>{technology}</li>
            ))}
          </ul>
        </div>
      )}

      {additionalTechnologies.length > 0 && (
        <div className="technology-group technology-group--additional">
          <button
            className="outline-button technology-toggle"
            type="button"
            aria-expanded={showAdditional}
            aria-controls={additionalId}
            onClick={() => setShowAdditional((isShowing) => !isShowing)}
          >
            {t(
              showAdditional
                ? 'hideAdditionalTechnologies'
                : 'showAdditionalTechnologies',
            )}
          </button>

          <div id={additionalId} hidden={!showAdditional}>
            <h4>{t('additionalTechnologiesTitle')}</h4>
            <ul className="technology-list">
              {additionalTechnologies.map((technology) => (
                <li key={item.id + '-additional-' + technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  )
}

export default function Journey() {
  const { t } = useTranslation('journey')
  const experience = t('experience', {
    returnObjects: true,
  }) as ExperienceItem[]
  const education = t('education', {
    returnObjects: true,
  }) as EducationItem[]

  return (
    <main className="journey-page">
      <h1>{t('title')}</h1>

      <section className="journey-section">
        <h2>{t('experienceTitle')}</h2>
        <div className="timeline">
          {experience.map((item) => (
            <ExperienceEntry item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className="journey-section">
        <h2>{t('educationTitle')}</h2>
        <div className="timeline">
          {education.map((item) => (
            <article className="timeline-item" key={item.id}>
              <h3>{item.program}</h3>
              <p className="timeline-item__meta">
                {item.institution} · {item.location}
              </p>
              <p className="timeline-item__period">{item.period}</p>
              <ul className="journey-details">
                {item.details.map((detail, index) => (
                  <li key={item.id + '-detail-' + index}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
