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

export default function Journey() {
  const { t } = useTranslation('journey')

  const experience = t('experience', {
    returnObjects: true,
  }) as ExperienceItem[]

  const education = t('education', {
    returnObjects: true,
  }) as EducationItem[]

  return (
    <main>
      <h1>{t('title')}</h1>

      <section>
        <h2>{t('experienceTitle')}</h2>

        {experience.map((item) => {
          const coreTechnologies = item.coreTechnologies ?? []
          const additionalTechnologies = item.additionalTechnologies ?? []

          return (
            <article key={item.id}>
              <h3>{item.role}</h3>
              <p>
                {item.company} · {item.location}
              </p>
              <p>{item.period}</p>

              <ul>
                {item.details.map((detail, index) => (
                  <li key={`${item.id}-detail-${index}`}>{detail}</li>
                ))}
              </ul>

              {coreTechnologies.length > 0 && (
                <div>
                  <h4>{t('coreTechnologiesTitle')}</h4>
                  <ul>
                    {coreTechnologies.map((technology) => (
                      <li key={`${item.id}-core-${technology}`}>
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {additionalTechnologies.length > 0 && (
                <div>
                  <h4>{t('additionalTechnologiesTitle')}</h4>
                  <ul>
                    {additionalTechnologies.map((technology) => (
                      <li key={`${item.id}-additional-${technology}`}>
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        })}
      </section>

      <section>
        <h2>{t('educationTitle')}</h2>

        {education.map((item) => (
          <article key={item.id}>
            <h3>{item.program}</h3>
            <p>
              {item.institution} · {item.location}
            </p>
            <p>{item.period}</p>
            <ul>
              {item.details.map((detail, index) => (
                <li key={`${item.id}-detail-${index}`}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  )
}
