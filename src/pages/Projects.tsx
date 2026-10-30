import { useTranslation } from 'react-i18next'

type ProjectItem = {
  id: string
  title: string
  description: string
  technologies: string
  githubUrl: string
  githubLabel: string
}

export default function Projects() {
  const { t } = useTranslation('projects')
  const projects = t('items', { returnObjects: true }) as ProjectItem[]

  return (
    <main>
      <h1>{t('title')}</h1>

      {projects.map((project) => (
        <section key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>{project.technologies}</p>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            {project.githubLabel}
          </a>
        </section>
      ))}
    </main>
  )
}
