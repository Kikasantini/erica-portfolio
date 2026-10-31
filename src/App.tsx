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
const languageOptions = ['en', 'fr', 'pt'] as const

function LocalizedLayout() {
  const { language } = useParams()
  const { t, i18n } = useTranslation('common')
  const location = useLocation()
  const navigate = useNavigate()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageControlRef = useRef<HTMLDivElement>(null)

  const activeLanguage = supportedLanguages.includes(language ?? '')
    ? language!
    : null

  useEffect(() => {
    if (activeLanguage) {
      void i18n.changeLanguage(activeLanguage)
    }
  }, [activeLanguage, i18n])

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
      {SHOW_COLOR_CUSTOMIZER && <ColorCustomizer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />

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
