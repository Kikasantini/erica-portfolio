import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type CertificateItem = {
  id: string
  title: string
  issuer: string
  period: string
  description: string
  image: string
  imageAlt: string
  credentialUrl: string
}

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

function ExperienceIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {id === 'fullStackDeveloper' ? (
        <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 9 5.5 11.5 8 14m8-5 2.5 2.5L16 14m-6 6h4m-2-2v2" /></>
      ) : id === 'sageConsultant' ? (
        <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>
      ) : id === 'developerIntern' ? (
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4" />
      ) : id === 'producer' ? (
        <><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><path d="M6 13V7a1 1 0 0 1 1-1h6M11 17h6a1 1 0 0 0 1-1v-5" /></>
      ) : (
        <><circle cx="12" cy="5.5" r="2.5" /><circle cx="5" cy="11" r="2" /><circle cx="19" cy="11" r="2" /><path d="M12 8v3m-7 2v3m14-3v3M3 19h4m3 0h4m3 0h4" /></>
      )}
    </svg>
  )
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const { t } = useTranslation('journey')
  const coreTechnologies = item.coreTechnologies ?? []
  const additionalTechnologies = item.additionalTechnologies ?? []
  const [expanded, setExpanded] = useState(true)
  const detailsId = 'experience-details-' + item.id

  return (
    <article className="timeline-item experience-timeline__entry">
      <button
        className="experience-timeline__toggle"
        type="button"
        aria-label={t(expanded ? 'collapseExperience' : 'expandExperience', { role: item.role })}
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => setExpanded((value) => !value)}
      >
        <ExperienceIcon id={item.id} />
      </button>
      <h3>{item.role}</h3>
      <p className="timeline-item__meta">
        <span>{item.company}</span>
        <span className="journey-meta-divider" aria-hidden="true" />
        <span>{item.location}</span>
      </p>
      <p className="timeline-item__period">{item.period}</p>

      <div id={detailsId} className="experience-timeline__details" hidden={!expanded}>
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
      </div>
    </article>
  )
}

export default function Journey() {
  const { t } = useTranslation('journey')
  const certificates = t('certificates', {
    returnObjects: true,
  }) as CertificateItem[]
  const experience = t('experience', {
    returnObjects: true,
  }) as ExperienceItem[]
  const education = t('education', {
    returnObjects: true,
  }) as EducationItem[]

  return (
    <main className="journey-page">
      <div className="journey-overview">
        <section className="journey-overview__experience" aria-labelledby="journey-experience-title">
          <h2 id="journey-experience-title" className="journey-overview__heading">
            {t('experienceTitle')}
          </h2>
          <div className="timeline">
            {experience.map((item) => (
              <ExperienceEntry item={item} key={item.id} />
            ))}
          </div>
        </section>

        <aside className="journey-overview__side">
          <section className="journey-overview__certificates" aria-labelledby="journey-certificates-title">
            <h2 id="journey-certificates-title" className="journey-overview__heading">
              {t('certificatesTitle')}
            </h2>
            <div className="certificate-list">
              {certificates.map((certificate) => (
                <article className="certificate-item" key={certificate.id}>
                  <img
                    className="certificate-item__thumbnail"
                    src={certificate.image}
                    alt={certificate.imageAlt}
                    loading="lazy"
                  />
                  <div className="certificate-item__content">
                    <div className="certificate-item__header">
                      <h3>{certificate.title}</h3>
                      <p className="certificate-item__detail">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 9 9-6 9 6M4 10h16M6 10v9m4-9v9m4-9v9m4-9v9M3 21h18" />
                        </svg>
                        <span>{certificate.issuer}</span>
                      </p>
                      <p className="certificate-item__detail">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="5" width="18" height="16" rx="2"/>
                          <path d="M7 3v4m10-4v4M3 10h18" />
                        </svg>
                        <span>{certificate.period}</span>
                      </p>
                      <a
                        className="certificate-item__link"
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{t('verifyCertificate')}</span>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 5h6v6m0-6-9 9"/>
                          <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="journey-overview__education" aria-labelledby="journey-education-title">
            <h2 id="journey-education-title" className="journey-overview__heading">
              {t('educationTitle')}
            </h2>
            <div className="timeline">
              {education.map((item) => (
                <article className="timeline-item" key={item.id}>
                  <h3>{item.program}</h3>
                  <p className="timeline-item__meta">
                    <span>{item.institution}</span>
                  <span className="journey-meta-divider" aria-hidden="true" />
                  <span>{item.location}</span>
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
        </aside>
      </div>

    </main>
  )
}
