import { useEffect, useRef, useState, type ReactNode } from 'react'
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
  const certificates = t('certificates', {
    returnObjects: true,
  }) as CertificateItem[]
  const experience = t('experience', {
    returnObjects: true,
  }) as ExperienceItem[]
  const education = t('education', {
    returnObjects: true,
  }) as EducationItem[]
  const [activeCertificate, setActiveCertificate] = useState<
    CertificateItem | null
  >(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const thumbnailButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!activeCertificate) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveCertificate(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      thumbnailButtonRef.current?.focus()
    }
  }, [activeCertificate])

  return (
    <main className="journey-page">
      <CollapsibleJourneySection
        id="certificates"
        title={t('certificatesTitle')}
      >
        <div className="certificate-list">
          {certificates.map((certificate) => (
            <article className="certificate-item" key={certificate.id}>
              <button
                className="certificate-item__thumbnail"
                type="button"
                aria-label={t('openCertificateImage') + ': ' + certificate.title}
                onClick={(event) => {
                  thumbnailButtonRef.current = event.currentTarget
                  setActiveCertificate(certificate)
                }}
              >
                <img
                  src={certificate.image}
                  alt={certificate.imageAlt}
                  loading="lazy"
                />
              </button>
              <div className="certificate-item__content">
                <div className="certificate-item__header">
                  <h3>{certificate.title}</h3>
                  <p className="timeline-item__meta">{certificate.issuer}</p>
                  <div className="certificate-item__period-row">
                    <p className="timeline-item__period">{certificate.period}</p>
                    <a
                      className="certificate-item__link"
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('verifyCertificate')}
                    </a>
                  </div>
                </div>
                <p className="certificate-item__description">
                  {certificate.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </CollapsibleJourneySection>

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

      <section className="journey-section journey-section--static">
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

      {activeCertificate && (
        <div className="media-viewer" onClick={() => setActiveCertificate(null)}>
          <div
            className="media-viewer__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={activeCertificate.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="media-viewer__button media-viewer__close"
              type="button"
              aria-label={t('closeCertificateImage')}
              onClick={() => setActiveCertificate(null)}
              ref={closeButtonRef}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <img
              className="media-viewer__item"
              src={activeCertificate.image}
              alt={activeCertificate.imageAlt}
            />
          </div>
        </div>
      )}
    </main>
  )
}
