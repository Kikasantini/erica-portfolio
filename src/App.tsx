import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  const { t } = useTranslation()

  return (
    <BrowserRouter>
      <header>
        <nav aria-label={t('navigation.accessibilityLabel')}>
          <NavLink to="/">{t('navigation.home')}</NavLink>
          <NavLink to="/about">{t('navigation.about')}</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
