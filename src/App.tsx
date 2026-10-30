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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Projects from './pages/Projects'

const supportedLanguages = ['en', 'fr', 'pt']

function LocalizedLayout() {
  const { language } = useParams()
  const { t, i18n } = useTranslation('common')
  const location = useLocation()
  const navigate = useNavigate()

  const activeLanguage = supportedLanguages.includes(language ?? '')
    ? language!
    : null

  useEffect(() => {
    if (activeLanguage) {
      void i18n.changeLanguage(activeLanguage)
    }
  }, [activeLanguage, i18n])

  if (!activeLanguage) {
    return <Navigate to="/en" replace />
  }

  function handleLanguageChange(nextLanguage: string) {
    const currentPage = location.pathname.replace(/^\/(en|fr|pt)(?=\/|$)/, '')

    navigate('/' + nextLanguage + currentPage)
  }

  return (
    <>
      <header className="site-header">
        <NavLink className="site-brand" to={'/' + activeLanguage} end>
          Erica Santini
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

        <label className="language-control">
          <span className="visually-hidden">{t('navigation.languageLabel')}</span>
          <select
            aria-label={t('navigation.languageLabel')}
            value={activeLanguage}
            onChange={(event) => handleLanguageChange(event.target.value)}
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="pt">PT</option>
          </select>
        </label>
      </header>

      <Outlet />
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
