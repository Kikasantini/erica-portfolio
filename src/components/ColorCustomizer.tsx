import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LIGHT_MODE_DEFAULTS = {
  "pageBackground": "#f7f7f7",
  "mainText": "#24343a",
  "paragraphText": "#435258",
  "metaText": "#667477",
  "brandName": "#16324f",
  "headings": "#16324f",
  "sectionTitles": "#257c83",
  "logo": "#257c83",
  "timelineMarkers": "#257c83",
  "headerDivider": "#dbe4e3",
  "navigationHover": "#e2eeed",
  "languageSelectorBorder": "#c5d6d6",
  "outlineButtonsBorder": "#6e9fa1",
  "timelineLine": "#d0e0df",
  "technologyTagsBorder": "#ccdddd",
  "technologyTagsBackground": "#e8f1f0",
  "textOnAccent": "#ffffff",
  "buttonBackground": "#f2f6f5",
  "buttonText": "#1e6971",
  "buttonHoverBackground": "#16324f",
  "navigationActiveBackground": "#e2eeed",
  "technologyTagsText": "#1e6971",
  "factCardFrontBackground": "#e8f1f0",
  "factCardFrontText": "#24343a",
  "factCardFrontBorder": "#9cb4b4",
  "factCardBackBackground": "#e2ddc6",
  "factCardBackText": "#24343a",
  "factCardBackBorder": "#796f44",
  "additionalTechnologiesLinkText": "#796f44",
  "projectCardBackground": "#ffffff",
  "projectCardBorder": "#dbe4e3",
  "projectCardMediaBackground": "#e8f1f0"
} as const

type ColorKey = keyof typeof LIGHT_MODE_DEFAULTS
type ColorPalette = Record<ColorKey, string>

const DARK_MODE_DEFAULTS: ColorPalette = {
  ...LIGHT_MODE_DEFAULTS,
  pageBackground: '#142127', mainText: '#e8efed', paragraphText: '#c5d2cf', metaText: '#9aa9a7',
  brandName: '#e2edeb', headings: '#eaf2f0', sectionTitles: '#80c9c3', logo: '#80c9c3', timelineMarkers: '#80c9c3',
  headerDivider: '#34474b', navigationHover: '#26393d', languageSelectorBorder: '#425b5c', outlineButtonsBorder: '#668f90',
  timelineLine: '#354b4e', technologyTagsBorder: '#3f5c5d', technologyTagsBackground: '#24383b', textOnAccent: '#f7fbfa',
  buttonBackground: '#22373b', buttonText: '#a1d8d2', buttonHoverBackground: '#347b80', navigationActiveBackground: '#26393d',
  technologyTagsText: '#a1d8d2', factCardFrontBackground: '#24383b', factCardFrontText: '#e8efed', factCardFrontBorder: '#425b5c',
  factCardBackBackground: '#35352b', factCardBackText: '#f2efdf', factCardBackBorder: '#827957',
  additionalTechnologiesLinkText: '#a1d8d2', projectCardBackground: '#1b2c32', projectCardBorder: '#354b50', projectCardMediaBackground: '#22363b',
}

const CSS_VARIABLES: Record<ColorKey, string> = {
  "pageBackground": "--page-background",
  "mainText": "--main-text",
  "paragraphText": "--paragraph-text",
  "metaText": "--meta-text",
  "brandName": "--brand-name",
  "headings": "--heading-color",
  "sectionTitles": "--section-title-color",
  "logo": "--logo-color",
  "buttonBackground": "--button-background-color",
  "buttonText": "--button-text-color",
  "buttonHoverBackground": "--button-hover-background-color",
  "textOnAccent": "--button-hover-text-color",
  "navigationActiveBackground": "--navigation-active-background-color",
  "technologyTagsText": "--technology-tag-text-color",
  "timelineMarkers": "--timeline-marker-color",
  "headerDivider": "--header-divider-color",
  "navigationHover": "--navigation-hover-color",
  "languageSelectorBorder": "--language-border-color",
  "outlineButtonsBorder": "--outline-button-border-color",
  "timelineLine": "--timeline-line-color",
  "technologyTagsBorder": "--technology-tag-border-color",
  "technologyTagsBackground": "--technology-tag-background-color",
  "factCardFrontBackground": "--fact-card-front-background-color",
  "factCardFrontText": "--fact-card-front-text-color",
  "factCardFrontBorder": "--fact-card-front-border-color",
  "factCardBackBackground": "--fact-card-back-background-color",
  "factCardBackText": "--fact-card-back-text-color",
  "factCardBackBorder": "--fact-card-back-border-color",
  "additionalTechnologiesLinkText": "--additional-technologies-link-color",
  "projectCardBackground": "--project-card-background-color",
  "projectCardBorder": "--project-card-border-color",
  "projectCardMediaBackground": "--project-card-media-background-color"
}

const COLOR_GROUPS = [
  { id: "page", keys: ["pageBackground"] },
  {
    id: "text",
    keys: ["mainText", "paragraphText", "metaText", "brandName", "headings", "sectionTitles"]
  },
  {
    id: "headerNavigation",
    keys: ["logo", "headerDivider", "navigationHover", "navigationActiveBackground", "languageSelectorBorder"]
  },
  {
    id: "buttons",
    keys: ["buttonBackground", "buttonText", "outlineButtonsBorder", "buttonHoverBackground", "textOnAccent", "additionalTechnologiesLinkText"]
  },
  {
    id: "technologyTags",
    keys: ["technologyTagsBackground", "technologyTagsBorder", "technologyTagsText"]
  },
  { id: "factCardsFront", keys: ["factCardFrontBackground", "factCardFrontText", "factCardFrontBorder"] },
  { id: "factCardsBack", keys: ["factCardBackBackground", "factCardBackText", "factCardBackBorder"] },
  { id: "timeline", keys: ["timelineMarkers", "timelineLine"] },
  { id: "projectCards", keys: ["projectCardBackground", "projectCardBorder", "projectCardMediaBackground"] }
] as const

const HEX_COLOR = /^#[0-9a-f]{6}$/i

export default function ColorCustomizer({ theme, onThemeChange }: {
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
}) {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [lightColors, setLightColors] = useState<ColorPalette>(() => ({ ...LIGHT_MODE_DEFAULTS }))
  const [darkColors, setDarkColors] = useState<ColorPalette>(() => ({ ...DARK_MODE_DEFAULTS }))
  const [appliedLightColors, setAppliedLightColors] = useState<ColorPalette>(() => ({ ...LIGHT_MODE_DEFAULTS }))
  const [appliedDarkColors, setAppliedDarkColors] = useState<ColorPalette>(() => ({ ...DARK_MODE_DEFAULTS }))
  const [drafts, setDrafts] = useState<Partial<Record<ColorKey, string>>>({})
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed' | ''>('')
  useEffect(() => setDrafts({}), [theme])
  const colors = theme === 'dark' ? darkColors : lightColors
  const appliedColors = theme === 'dark' ? appliedDarkColors : appliedLightColors

  useEffect(() => {
    for (const key of Object.keys(CSS_VARIABLES) as ColorKey[]) {
      document.documentElement.style.setProperty(CSS_VARIABLES[key], appliedColors[key])
    }
  }, [appliedColors])

  function updateColor(key: ColorKey, value: string) {
    const setColors = theme === 'dark' ? setDarkColors : setLightColors
    setColors((current) => ({ ...current, [key]: value }))
    setDrafts((current) => ({ ...current, [key]: value }))
  }

  function updateHexDraft(key: ColorKey, value: string) {
    setDrafts((current) => ({ ...current, [key]: value }))
    if (HEX_COLOR.test(value)) {
      const setColors = theme === 'dark' ? setDarkColors : setLightColors
      setColors((current) => ({ ...current, [key]: value }))
    }
  }

  function finishHexEdit(key: ColorKey) {
    setDrafts((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function applyColors() {
    if (theme === 'dark') setAppliedDarkColors({ ...colors })
    else setAppliedLightColors({ ...colors })
  }

  async function copyColors() {
    try {
      await navigator.clipboard.writeText(JSON.stringify({ light: lightColors, dark: darkColors }, null, 2))
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  function resetColors() {
    if (theme === 'dark') setDarkColors({ ...DARK_MODE_DEFAULTS })
    else setLightColors({ ...LIGHT_MODE_DEFAULTS })
    setDrafts({})
  }

  return (
    <aside className="color-customizer">
      <button
        className="color-customizer__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="color-customizer-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {t('colorEditor.open')}
      </button>

      <section
        className="color-customizer__panel"
        id="color-customizer-panel"
        aria-labelledby="color-customizer-title"
        hidden={!isOpen}
      >
        <header className="color-customizer__header">
          <h2 id="color-customizer-title">{t('colorEditor.title')}</h2>
          <button
            className="color-customizer__close"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            {t('colorEditor.close')}
          </button>
        </header>

        <p className="color-customizer__description">
          {t('colorEditor.description')}
        </p>

        <fieldset className="color-customizer__theme-section">
          <legend>{t('colorEditor.editingTheme')}</legend>
          <div className="color-customizer__theme-grid" role="group">
            <button className="color-customizer__theme-button" type="button" aria-pressed={theme === 'light'} onClick={() => onThemeChange('light')}>{t('colorEditor.lightMode')}</button>
            <button className="color-customizer__theme-button" type="button" aria-pressed={theme === 'dark'} onClick={() => onThemeChange('dark')}>{t('colorEditor.darkMode')}</button>
          </div>
        </fieldset>

        <div className="color-customizer__groups">
          {COLOR_GROUPS.map((group) => (
            <fieldset className="color-customizer__group" key={group.id}>
              <legend>{t('colorEditor.groups.' + group.id)}</legend>
              <div className="color-customizer__fields">
                {group.keys.map((key) => {
                  const colorKey = key as ColorKey
                  const inputId = 'color-' + colorKey
                  const colorName = t('colorEditor.fields.' + colorKey)
                  const hexValue = drafts[colorKey] ?? colors[colorKey]

                  return (
                    <div className="color-customizer__field" key={colorKey}>
                      <label htmlFor={inputId}>{colorName}</label>
                      <div className="color-customizer__inputs">
                        <input
                          className="color-customizer__swatch"
                          type="color"
                          value={colors[colorKey]}
                          aria-label={t('colorEditor.pickerLabel', {
                            color: colorName,
                          })}
                          onChange={(event) =>
                            updateColor(colorKey, event.currentTarget.value)
                          }
                        />
                        <input
                          className="color-customizer__hex"
                          id={inputId}
                          type="text"
                          inputMode="text"
                          autoComplete="off"
                          spellCheck={false}
                          maxLength={7}
                          value={hexValue}
                          aria-label={t('colorEditor.hexLabel', {
                            color: colorName,
                          })}
                          onChange={(event) =>
                            updateHexDraft(colorKey, event.currentTarget.value)
                          }
                          onBlur={() => finishHexEdit(colorKey)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="color-customizer__actions">
          <button
            className="color-customizer__apply"
            type="button"
            onClick={applyColors}
          >
            {t('colorEditor.apply')}
          </button>
          <button
            className="color-customizer__copy"
            type="button"
            onClick={copyColors}
          >
            {copyStatus === 'copied'
              ? t('colorEditor.copied')
              : copyStatus === 'failed'
                ? t('colorEditor.copyFailed')
                : t('colorEditor.copy')}
          </button>
          <button
            className="color-customizer__reset"
            type="button"
            onClick={resetColors}
          >
            {t('colorEditor.reset')}
          </button>
        </div>
        <span className="visually-hidden" aria-live="polite">
          {copyStatus === 'copied'
            ? t('colorEditor.copied')
            : copyStatus === 'failed'
              ? t('colorEditor.copyFailed')
              : ''}
        </span>
      </section>
    </aside>
  )
}
