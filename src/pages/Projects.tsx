import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ProjectImage = {
  type: 'image'
  src: string
  alt: string
}

type ProjectItem = {
  id: string
  title: string
  highlights: string[]
  technologies: string
  status?: string
  githubUrl: string
  githubLabel: string
  media: ProjectImage[]
}

type ProjectSection = {
  id: string
  title: string
  items: ProjectItem[]
}

// Try the numbered JPG first, then PNG; missing files leave no empty media area.
function ProjectIllustration({ src }: { src: string }) {
  const [imageFormat, setImageFormat] = useState<'jpg' | 'png' | null>('jpg')

  if (imageFormat === null) return null

  return (
    <img
      className="project-item__illustration"
      src={imageFormat === 'jpg' ? src : src.replace(/\.jpg$/i, '.png')}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setImageFormat((current) => current === 'jpg' ? 'png' : null)}
    />
  )
}

type GroupKey = 'frontend' | 'backend' | 'ai' | 'database' | 'testing' | 'automation' | 'quality' | 'tools' | 'programming' | 'data' | 'routing' | 'versioning' | 'game' | 'libraries' | 'design' | 'platform' | 'hardware' | 'connectivity' | 'monitoring' | 'messaging' | 'document' | 'scheduling' | 'environment'
type TechnologyGroup = { key: GroupKey; items: string[] }

const projectTechGroups: Record<string, TechnologyGroup[]> = {
  "careerPilotAi": [
    {
      "key": "frontend",
      "items": [
        "React",
        "TypeScript",
        "JavaScript"
      ]
    },
    {
      "key": "backend",
      "items": [
        "Java 21",
        "Spring Boot",
        "Maven"
      ]
    },
    {
      "key": "ai",
      "items": [
        "Python",
        "FastAPI",
        "LangGraph",
        "Ollama"
      ]
    },
    {
      "key": "database",
      "items": [
        "PostgreSQL"
      ]
    },
    {
      "key": "testing",
      "items": [
        "JUnit",
        "FastAPI TestClient"
      ]
    },
    {
      "key": "automation",
      "items": [
        "JavaScript",
        "Node.js",
        "Maven Wrapper",
        "Husky",
        "lint-staged"
      ]
    },
    {
      "key": "quality",
      "items": [
        "Ruff",
        "Spotless"
      ]
    },
    {
      "key": "tools",
      "items": [
        "VS Code",
        "Git",
        "GitHub"
      ]
    }
  ],
  "productionCellSimulator": [
    {
      "key": "programming",
      "items": [
        "Python 3"
      ]
    },
    {
      "key": "data",
      "items": [
        "JSON",
        "CSV",
        "UUID",
        "datetime"
      ]
    },
    {
      "key": "testing",
      "items": [
        "unittest",
        "unittest.mock"
      ]
    },
    {
      "key": "tools",
      "items": [
        "Git",
        "GitHub",
        "Visual Studio Code"
      ]
    }
  ],
  "portfolioWebsite": [
    {
      "key": "frontend",
      "items": [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS"
      ]
    },
    {
      "key": "routing",
      "items": [
        "React Router",
        "i18next",
        "react-i18next"
      ]
    },
    {
      "key": "tools",
      "items": [
        "Vite",
        "Node.js",
        "npm",
        "VS Code",
        "Git Bash"
      ]
    },
    {
      "key": "quality",
      "items": [
        "ESLint",
        "Prettier",
        "Husky",
        "lint-staged"
      ]
    },
    {
      "key": "versioning",
      "items": [
        "Git",
        "GitHub",
        "GitHub Actions",
        "GitHub Pages"
      ]
    }
  ],
  "runnerRpg": [
    {
      "key": "game",
      "items": [
        "C#",
        "Unity",
        "Unity UI",
        "ScriptableObjects"
      ]
    },
    {
      "key": "libraries",
      "items": [
        "DOTween"
      ]
    },
    {
      "key": "design",
      "items": [
        "Adobe Illustrator",
        "Adobe Photoshop",
        "Inkscape"
      ]
    },
    {
      "key": "platform",
      "items": [
        "Android"
      ]
    }
  ],
  "esp8266WeatherStationGame": [
    {
      "key": "hardware",
      "items": [
        "ESP8266",
        "BME280",
        "SSD1306 OLED",
        "LEDs",
        "Push button",
        "Buzzer"
      ]
    },
    {
      "key": "programming",
      "items": [
        "C++",
        "Arduino"
      ]
    },
    {
      "key": "connectivity",
      "items": [
        "Wi-Fi",
        "I²C",
        "HTTP",
        "NTP"
      ]
    },
    {
      "key": "libraries",
      "items": [
        "NTPClient",
        "PinButton",
        "Adafruit GFX",
        "Adafruit SSD1306",
        "Adafruit Unified Sensor",
        "Adafruit BME280"
      ]
    },
    {
      "key": "tools",
      "items": [
        "Arduino IDE",
        "draw.io"
      ]
    }
  ],
  "connectedWeatherStationZabbix": [
    {
      "key": "hardware",
      "items": [
        "2× ESP8266",
        "BME280",
        "SSD1306 OLED",
        "LEDs",
        "Push buttons",
        "Potentiometer"
      ]
    },
    {
      "key": "programming",
      "items": [
        "C++",
        "Arduino",
        "MicroPython"
      ]
    },
    {
      "key": "connectivity",
      "items": [
        "Wi-Fi",
        "HTTP",
        "JSON",
        "I²C",
        "mDNS"
      ]
    },
    {
      "key": "monitoring",
      "items": [
        "Zabbix"
      ]
    },
    {
      "key": "libraries",
      "items": [
        "PinButton",
        "Adafruit Unified Sensor",
        "Adafruit BME280",
        "SSD1306 driver"
      ]
    },
    {
      "key": "tools",
      "items": [
        "Arduino IDE",
        "draw.io"
      ]
    }
  ],
  "iotSensorMonitoringZabbixMqtt": [
    {
      "key": "hardware",
      "items": [
        "2× ESP8266",
        "ESP32",
        "BME280",
        "GY-521/MPU-6050",
        "SSD1306 OLED"
      ]
    },
    {
      "key": "programming",
      "items": [
        "C++",
        "Arduino",
        "MicroPython"
      ]
    },
    {
      "key": "connectivity",
      "items": [
        "Wi-Fi",
        "MQTT",
        "HTTP",
        "JSON"
      ]
    },
    {
      "key": "messaging",
      "items": [
        "Mosquitto"
      ]
    },
    {
      "key": "monitoring",
      "items": [
        "Zabbix"
      ]
    },
    {
      "key": "tools",
      "items": [
        "Arduino IDE",
        "draw.io"
      ]
    }
  ],
  "translationCompany": [
    {
      "key": "programming",
      "items": [
        "Python 3",
        "Shell"
      ]
    },
    {
      "key": "document",
      "items": [
        "PyPDF2",
        "ReportLab"
      ]
    },
    {
      "key": "scheduling",
      "items": [
        "Crontab"
      ]
    },
    {
      "key": "environment",
      "items": [
        "Linux (VM)"
      ]
    },
    {
      "key": "versioning",
      "items": [
        "Git",
        "GitHub"
      ]
    }
  ]
}

const primaryTech: Record<string, string[]> = {
  "careerPilotAi": [
    "React",
    "Spring Boot",
    "FastAPI"
  ],
  "productionCellSimulator": [
    "Python 3",
    "JSON",
    "CSV"
  ],
  "portfolioWebsite": [
    "React",
    "TypeScript",
    "Vite"
  ],
  "runnerRpg": [
    "C#",
    "Unity",
    "ScriptableObjects"
  ],
  "esp8266WeatherStationGame": [
    "ESP8266",
    "C++",
    "Arduino"
  ],
  "connectedWeatherStationZabbix": [
    "ESP8266",
    "MicroPython",
    "Zabbix"
  ],
  "iotSensorMonitoringZabbixMqtt": [
    "ESP32",
    "MQTT",
    "Zabbix"
  ],
  "translationCompany": [
    "Python 3",
    "PyPDF2",
    "ReportLab"
  ]
}

// Simple line icons match the portfolio's existing icon language.
function TechnologyGroupIcon({ name }: { name: GroupKey }) {
  switch (name) {
    case 'frontend': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 .297a12 12 0 0 0-3.79 23.385c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576A12.001 12.001 0 0 0 12 .297"/></svg>
    case 'backend': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6h.01M7 17h.01"/></svg>
    case 'ai': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a3 3 0 0 0-5 1 4 4 0 0 0-2 7 4 4 0 0 0 3 6 3 3 0 0 0 4-2V5ZM12 5a3 3 0 0 1 5 1 4 4 0 0 1 2 7 4 4 0 0 1-3 6 3 3 0 0 1-4-2V5Z"/></svg>
    case 'database': return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/></svg>
    case 'testing': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v7l-6 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9V3M8 16h8"/></svg>
    case 'automation': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 10 3 2-3 2m5 0h3"/></svg>
    case 'quality': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>
    case 'tools': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 17.5 6.5 21l5.2-5.3a5 5 0 0 0 6.4-6.4l-3.2 3.2-3.4-3.4Z"/></svg>
    case 'programming': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14"/></svg>
    case 'data': return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/></svg>
    case 'routing': return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h7a5 5 0 0 1 0 10H9a4 4 0 0 0-4 4"/></svg>
    case 'versioning': return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 6v12M8 8c6 0 10-2 10-2"/></svg>
    case 'game': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h4m-2-2v4m7-1h.01M18 11h.01M5 7h14l3 9a3 3 0 0 1-5 3l-2-2H9l-2 2a3 3 0 0 1-5-3Z"/></svg>
    case 'libraries': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="6" height="18"/><rect x="11" y="3" width="4" height="18"/><path d="m17 7 4-1 2 14-4 1z"/></svg>
    case 'design': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 4 7 7-9 9-7-7 9-9ZM4 20h16M15 6l3 3"/></svg>
    case 'platform': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/></svg>
    case 'hardware': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5M1 15h5m12-6h5m-5 6h5"/></svg>
    case 'connectivity': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/></svg>
    case 'monitoring': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>
    case 'messaging': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H9l-5 4Z"/></svg>
    case 'document': return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l5 5v15H6zM15 2v5h5M9 12h8M9 16h8"/></svg>
    case 'scheduling': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 11h18M9 15h3"/></svg>
    case 'environment': return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 10 3 2-3 2m5 0h3"/></svg>
  }
}

function ProjectCard({ project, illustrationSrc, labels }: {
  project: ProjectItem
  illustrationSrc?: string
  labels: {
    technologies: string
    viewAll: string
    backToProject: string
    groups: Record<GroupKey, string>
  }
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const featuredTech = primaryTech[project.id] ?? project.technologies.split('·').slice(0, 3)
  const groupedTech = projectTechGroups[project.id] ?? [
    { key: 'tools' as const, items: project.technologies.split('·').map((tech) => tech.trim()) },
  ]

  return (
    <article className="project-item project-item--editorial" key={project.id}>
      {project.status && <span className="project-status">{project.status}</span>}
      <div className={`project-item__flip-inner${isFlipped ? ' is-flipped' : ''}`}>
        <div className="project-item__face project-item__face--front" aria-hidden={isFlipped}>
          {illustrationSrc && <ProjectIllustration src={illustrationSrc} />}
          <div className="project-item__content">
            <div className="project-item__title-row">
              <h3>{project.title}</h3>
              <a
                className="project-github-link"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={project.githubLabel + ': ' + project.title}
                tabIndex={isFlipped ? -1 : undefined}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 .297a12 12 0 0 0-3.79 23.385c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108.418-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576A12.001 12.001 0 0 0 12 .297" />
                </svg>
              </a>
            </div>
            <ul className="project-item__highlights">
              {project.highlights.map((highlight, index) => (
                <li key={project.id + '-highlight-' + index}>{highlight}</li>
              ))}
            </ul>
            <div className="project-item__technologies">
              <h4>{labels.technologies}</h4>
              <div className="project-item__tech-preview">
                <ul className="technology-list project-item__main-tech-list" aria-label={labels.technologies}>
                  {featuredTech.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <button
                  className="project-item__flip-link"
                  type="button"
                  tabIndex={isFlipped ? -1 : undefined}
                  onClick={() => setIsFlipped(true)}
                  aria-label={labels.viewAll + ': ' + project.title}
                >
                  {labels.viewAll} <span aria-hidden="true">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="project-item__face project-item__face--back" aria-hidden={!isFlipped}>
          <h3>{project.title}</h3>
          <h4>{labels.technologies}</h4>
          <div className="project-item__tech-groups">
            {groupedTech.map((group) => (
              <div className="project-item__tech-group" key={group.key}>
                <span className="project-item__tech-category"><TechnologyGroupIcon name={group.key} /><strong>{labels.groups[group.key]}:</strong></span>
                <span>{group.items.map((tech, index) => (
                  <span className="project-item__tech-name" key={tech}>
                    <strong>{tech}</strong>{index < group.items.length - 1 ? ' · ' : ''}
                  </span>
                ))}</span>
              </div>
            ))}
          </div>
          <button
            className="project-item__flip-back"
            type="button"
            tabIndex={isFlipped ? undefined : -1}
            onClick={() => setIsFlipped(false)}
          >
            <span aria-hidden="true">‹</span> {labels.backToProject}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useTranslation('projects')
  const sections = t('sections', { returnObjects: true }) as ProjectSection[]
  // Newest projects appear first, but image numbers increase chronologically.
  // Adding a new project at the top gives it the next number without renaming old images.
  const projectsInDisplayOrder = sections.flatMap((section) => section.items)
  const illustrationPaths = new Map(
    projectsInDisplayOrder.map((project, index) => [
      project.id,
      `/images/project-illustrations/${String(projectsInDisplayOrder.length - index).padStart(2, '0')}.jpg`,
    ]),
  )

  return (
    <main className="projects-page">
      {sections.map((section) => (
        <section className="project-section" key={section.id}>
          <h2>{section.title}</h2>
          <div className="project-list">
            {section.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                illustrationSrc={illustrationPaths.get(project.id)}
                labels={{
                  technologies: t('technologiesAndTools'),
                  viewAll: t('viewAllTechnologies'),
                  backToProject: t('backToProject'),
                  groups: t('technologyGroups', { returnObjects: true }) as Record<GroupKey, string>,
                }}
              />
            ))}
          </div>
        </section>
      ))}

    </main>
  )
}
