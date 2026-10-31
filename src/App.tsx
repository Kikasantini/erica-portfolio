import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Projects from './pages/Projects'
import ColorCustomizer from './components/ColorCustomizer'

const supportedLanguages = ['en', 'fr', 'pt']
const SHOW_COLOR_CUSTOMIZER = true
const LANGUAGE_STORAGE_KEY = 'erica-portfolio-language-v1'
const THEME_STORAGE_KEY = 'erica-portfolio-theme-v1'
type ThemeMode = 'light' | 'dark'

function readPreferredLanguage() {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return supportedLanguages.includes(saved ?? '') ? saved! : 'en'
  } catch {
    return 'en'
  }
}

function readSavedTheme(): ThemeMode {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const languageOptions = ['en', 'fr', 'pt'] as const

function LocalizedLayout() {
  const { language } = useParams()
  const { t, i18n } = useTranslation('common')
  const location = useLocation()
  const navigate = useNavigate()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>(readSavedTheme)
  const languageControlRef = useRef<HTMLDivElement>(null)

  const activeLanguage = supportedLanguages.includes(language ?? '')
    ? language!
    : null

  useEffect(() => {
    if (!activeLanguage) return
    void i18n.changeLanguage(activeLanguage)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage)
    } catch {
      // The selected language still works for this session.
    }
  }, [activeLanguage, i18n])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // The selected theme still works for this session.
    }
  }, [theme])

  useEffect(() => {
    const titleKey = location.pathname.endsWith('/journey')
      ? 'pageTitles.journey'
      : location.pathname.endsWith('/projects')
        ? 'pageTitles.projects'
        : 'pageTitles.home'

    document.title = t(titleKey)
  }, [activeLanguage, i18n.language, location.pathname, t])

  useEffect(() => {
    if (!isLanguageMenuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!languageControlRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsLanguageMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLanguageMenuOpen])

  if (!activeLanguage) {
    return <Navigate to="/en" replace />
  }

  function handleLanguageChange(nextLanguage: string) {
    const currentPage = location.pathname.replace(/^\/(en|fr|pt)(?=\/|$)/, '')

    setIsLanguageMenuOpen(false)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    } catch {
      // The selected language still works for this session.
    }
    navigate('/' + nextLanguage + currentPage)
  }

  return (
    <>
      <header className="site-header">
        <NavLink className="site-brand" to={'/' + activeLanguage} end>
          <span className="site-brand__logo" aria-hidden="true" />
          <span>{t('brandName')}</span>
        </NavLink>

        <nav className="site-nav" aria-label={t('navigation.accessibilityLabel')}>
          <NavLink to={'/' + activeLanguage} end>
            {t('navigation.home')}
          </NavLink>

          <NavLink to={'/' + activeLanguage + '/journey'}>
            {t('navigation.journey')}
          </NavLink>

          <NavLink to={'/' + activeLanguage + '/projects'}>
            {t('navigation.projects')}
          </NavLink>
        </nav>

        <button className="theme-toggle" type="button"
          aria-label={t(theme === 'light' ? 'navigation.switchToDark' : 'navigation.switchToLight')}
          aria-pressed={theme === 'dark'}
          onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            {theme === 'light' ? <path d="M20.1 15.3A8.3 8.3 0 0 1 8.7 3.9a8.5 8.5 0 1 0 11.4 11.4Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>}
          </svg>
        </button>

        <div className="language-control" ref={languageControlRef}>
          <button
            className="language-control__toggle"
            type="button"
            aria-label={t('navigation.languageLabel')}
            aria-haspopup="menu"
            aria-expanded={isLanguageMenuOpen}
            onClick={() => setIsLanguageMenuOpen((open) => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
            <span>{activeLanguage.toUpperCase()}</span>
          </button>
          {isLanguageMenuOpen && (
            <div className="language-control__menu" role="menu">
              {languageOptions
                .filter((option) => option !== activeLanguage)
                .map((option) => (
                  <button
                    className="language-control__option"
                    key={option}
                    type="button"
                    role="menuitem"
                    aria-label={t('navigation.changeTo', {
                      language: t('navigation.languageNames.' + option),
                    })}
                    onClick={() => handleLanguageChange(option)}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
            </div>
          )}
        </div>
      </header>

      <Outlet />
      {SHOW_COLOR_CUSTOMIZER && <ColorCustomizer theme={theme} onThemeChange={setTheme} />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/' + readPreferredLanguage()} replace />} />

        <Route path="/:language" element={<LocalizedLayout />}>
          <Route index element={<Home />} />
          <Route path="journey" element={<Journey />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
