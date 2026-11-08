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
          <section className="journey-overview__education" aria-labelledby="journey-education-title">
            <h2 id="journey-education-title" className="journey-overview__heading">
              {t('educationTitle')}
            </h2>
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
                      <span className="certificate-item__kind">{t('digitalBadge')}</span>
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
        </aside>
      </div>

    </main>
  )
}
