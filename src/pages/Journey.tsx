import { useState, type ReactNode } from 'react'
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

function CollapsibleJourneySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { t } = useTranslation('journey')
  const contentId = 'journey-section-' + id

  return (
    <section className={`journey-section${isExpanded ? '' : ' journey-section--collapsed'}`}>
      <h2>
        <button
          className="journey-section__toggle"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span>{title}</span>
          <span className="journey-section__action">
            <span>{t(isExpanded ? 'hideSection' : 'showSection')}</span>
            <span
              className={`journey-section__chevron${isExpanded ? ' is-expanded' : ''}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </h2>
      <div id={contentId} hidden={!isExpanded}>
        {children}
      </div>
    </section>
  )
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const { t } = useTranslation('journey')
  const coreTechnologies = item.coreTechnologies ?? []
  const additionalTechnologies = item.additionalTechnologies ?? []

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
          <h4>{t('additionalTechnologiesTitle')}</h4>
          <ul className="technology-list">
            {additionalTechnologies.map((technology) => (
              <li key={item.id + '-additional-' + technology}>
                {technology}
              </li>
            ))}
          </ul>
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

      <CollapsibleJourneySection
        id="experience"
        title={t('experienceTitle')}
      >
        <div className="timeline">
          {experience.map((item) => (
            <ExperienceEntry item={item} key={item.id} />
          ))}
        </div>
      </CollapsibleJourneySection>

      <CollapsibleJourneySection id="education" title={t('educationTitle')}>
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
      </CollapsibleJourneySection>
    </main>
  )
}
