import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Projects from './pages/Projects'

function App() {
  const { t } = useTranslation('common')

  return (
    <BrowserRouter>
      <header>
        <nav aria-label={t('navigation.accessibilityLabel')}>
          <NavLink to="/">{t('navigation.home')}</NavLink>
          <NavLink to="/journey">{t('navigation.journey')}</NavLink>
          <NavLink to="/projects">{t('navigation.projects')}</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
