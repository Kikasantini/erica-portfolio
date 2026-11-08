import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LIGHT_MODE_DEFAULTS = {
  "pageBackground": "#f7f7f7",
  "mainText": "#1d2b30",
  "paragraphText": "#2a3e47",
  "metaText": "#57676b",
  "headings": "#16324f",
  "sectionTitles": "#257c83",
  "buttonBackground": "#f2f6f5",
  "buttonText": "#1e6971",
  "buttonHoverBackground": "#46586d",
  "textOnAccent": "#ffffff",
  "navigationActiveBackground": "#e2eeed",
  "timelineMarkers": "#257c83",
  "headerDivider": "#dbe4e3",
  "navigationHover": "#e2eeed",
  "languageSelectorBorder": "#c5d6d6",
  "outlineButtonsBorder": "#6e9fa1",
  "timelineLine": "#d0e0df",
  "projectCardBackground": "#ffffff",
  "projectCardBorder": "#ababab",
  "projectCardMediaBackground": "#d7e0df",
  "surface": "#ffffff",
  "softBorder": "#ccdcda",
  "heroBackground": "#d0e1dc",
  "accentFill": "#437f7e",
  "accentContrast": "#ffffff",
  "statusText": "#216c69",
  "statusBorder": "#4d9c92",
  "statusSurface": "#e4f2ee",
  "experienceAlternateBackground": "#e6ebe9",
  "timelineIconHoverBackground": "#2b8b83",
  "timelineIconHoverText": "#ffffff",
  "badgeCardStart": "#d0e1dc",
  "badgeCardEnd": "#d0e1dc",
  "badgeCardBorder": "#9bbbb8",
  "badgeLabelBackground": "#a7d7d1",
  "badgeLabelText": "#0f3e3d",
  "badgeLink": "#137a80",
  "badgeLinkHover": "#119ca0",
  "badgeThumbnailBorder": "#d0e1dc",
  "projectTagBackground": "#e8f1f0",
  "projectTagBorder": "#ccdddd",
  "projectTagText": "#1e6971",
  "coreTechnologiesText": "#435258"
} as const
type ColorKey = keyof typeof LIGHT_MODE_DEFAULTS
type ColorPalette = Record<ColorKey, string>
type ThemeMode = 'light' | 'dark'
type ColorHistory = Record<ThemeMode, Partial<Record<ColorKey, string[]>>>
const DARK_MODE_DEFAULTS: ColorPalette = {
  "pageBackground": "#14191c",
  "mainText": "#e5ebee",
  "paragraphText": "#b7c1c7",
  "metaText": "#93a2a8",
  "headings": "#e5ebee",
  "sectionTitles": "#91b4ae",
  "buttonBackground": "#202b2f",
  "buttonText": "#a7d1c8",
  "buttonHoverBackground": "#314347",
  "textOnAccent": "#e5ebee",
  "navigationActiveBackground": "#27373b",
  "timelineMarkers": "#7fa9a5",
  "headerDivider": "#303b40",
  "navigationHover": "#253136",
  "languageSelectorBorder": "#405056",
  "outlineButtonsBorder": "#536e70",
  "timelineLine": "#36474c",
  "projectCardBackground": "#1d252a",
  "projectCardBorder": "#34464b",
  "projectCardMediaBackground": "#202c30",
  "surface": "#1d282d",
  "softBorder": "#34484d",
  "heroBackground": "#192328",
  "accentFill": "#85b6ac",
  "accentContrast": "#142328",
  "statusText": "#c3e7d6",
  "statusBorder": "#70b2a3",
  "statusSurface": "#294b45",
  "experienceAlternateBackground": "#22343a",
  "timelineIconHoverBackground": "#83cbbd",
  "timelineIconHoverText": "#142127",
  "badgeCardStart": "#203a40",
  "badgeCardEnd": "#192d32",
  "badgeCardBorder": "#2d4d54",
  "badgeLabelBackground": "#2e5a58",
  "badgeLabelText": "#c1e9e2",
  "badgeLink": "#69e4dc",
  "badgeLinkHover": "#119ca0",
  "badgeThumbnailBorder": "#ffffff",
  "projectTagBackground": "#27383a",
  "projectTagBorder": "#384c50",
  "projectTagText": "#b3d4ca",
  "coreTechnologiesText": "#c5d2cf"
}
const CSS_VARIABLES: Record<ColorKey, string> = {
  "pageBackground": "--page-background",
  "mainText": "--main-text",
  "paragraphText": "--paragraph-text",
  "metaText": "--meta-text",
  "headings": "--heading-color",
  "sectionTitles": "--section-title-color",
  "buttonBackground": "--button-background-color",
  "buttonText": "--button-text-color",
  "buttonHoverBackground": "--button-hover-background-color",
  "textOnAccent": "--button-hover-text-color",
  "navigationActiveBackground": "--navigation-active-background-color",
  "timelineMarkers": "--timeline-marker-color",
  "headerDivider": "--header-divider-color",
  "navigationHover": "--navigation-hover-color",
  "languageSelectorBorder": "--language-border-color",
  "outlineButtonsBorder": "--outline-button-border-color",
  "timelineLine": "--timeline-line-color",
  "projectCardBackground": "--project-card-background-color",
  "projectCardBorder": "--project-card-border-color",
  "projectCardMediaBackground": "--project-card-media-background-color",
  "surface": "--surface",
  "softBorder": "--soft-border",
  "heroBackground": "--hero-bg",
  "accentFill": "--accent-fill",
  "accentContrast": "--accent-contrast",
  "statusText": "--status-text",
  "statusBorder": "--status-border",
  "statusSurface": "--status-surface",
  "experienceAlternateBackground": "--experience-alternate-background",
  "timelineIconHoverBackground": "--timeline-icon-hover-background",
  "timelineIconHoverText": "--timeline-icon-hover-text",
  "badgeCardStart": "--badge-card-start",
  "badgeCardEnd": "--badge-card-end",
  "badgeCardBorder": "--badge-card-border",
  "badgeLabelBackground": "--badge-label-background",
  "badgeLabelText": "--badge-label-text",
  "badgeLink": "--badge-link",
  "badgeLinkHover": "--badge-link-hover",
  "badgeThumbnailBorder": "--badge-thumbnail-border",
  "projectTagBackground": "--project-tag-background",
  "projectTagBorder": "--project-tag-border",
  "projectTagText": "--project-tag-text",
  "coreTechnologiesText": "--core-technologies-text"
}
const COLOR_GROUPS: { id: string; keys: ColorKey[] }[] = [
  {
    "id": "page",
    "keys": [
      "pageBackground",
      "surface",
      "softBorder",
      "heroBackground"
    ]
  },
  {
    "id": "text",
    "keys": [
      "mainText",
      "paragraphText",
      "metaText",
      "headings",
      "sectionTitles"
    ]
  },
  {
    "id": "headerNavigation",
    "keys": [
      "headerDivider",
      "navigationHover",
      "navigationActiveBackground",
      "languageSelectorBorder"
    ]
  },
  {
    "id": "buttons",
    "keys": [
      "buttonBackground",
      "buttonText",
      "outlineButtonsBorder",
      "buttonHoverBackground",
      "textOnAccent",
      "accentFill",
      "accentContrast"
    ]
  },
  {
    "id": "coreTechnologies",
    "keys": [
      "coreTechnologiesText"
    ]
  },
  {
    "id": "projectTags",
    "keys": [
      "projectTagBackground",
      "projectTagBorder",
      "projectTagText"
    ]
  },
  {
    "id": "timeline",
    "keys": [
      "timelineMarkers",
      "timelineLine",
      "experienceAlternateBackground",
      "timelineIconHoverBackground",
      "timelineIconHoverText"
    ]
  },
  {
    "id": "certificates",
    "keys": [
      "badgeCardStart",
      "badgeCardEnd",
      "badgeCardBorder",
      "badgeLabelBackground",
      "badgeLabelText",
      "badgeLink",
      "badgeLinkHover",
      "badgeThumbnailBorder"
    ]
  },
  {
    "id": "projectCards",
    "keys": [
      "projectCardBackground",
      "projectCardBorder",
      "projectCardMediaBackground",
      "statusSurface",
      "statusBorder",
      "statusText"
    ]
  }
]
const HEX_COLOR = /^#[0-9a-f]{6}$/i
const STORAGE_KEY = 'erica-portfolio-custom-colors-v4'

function readStoredColors(): { light: ColorPalette; dark: ColorPalette; history: ColorHistory } {
  const state = {
    light: { ...LIGHT_MODE_DEFAULTS } as ColorPalette,
    dark: { ...DARK_MODE_DEFAULTS },
    history: { light: {}, dark: {} } as ColorHistory
  }
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    for (const mode of ['light', 'dark'] as const) {
      for (const key of Object.keys(CSS_VARIABLES) as ColorKey[]) {
        const color = saved?.[mode]?.[key]
        if (typeof color === 'string' && HEX_COLOR.test(color)) state[mode][key] = color.toLowerCase()
        const recent = saved?.history?.[mode]?.[key]
        if (Array.isArray(recent)) {
          state.history[mode][key] = [...new Set(recent.filter((c): c is string => typeof c === 'string' && HEX_COLOR.test(c)).map((c: string) => c.toLowerCase()))].slice(0, 2)
        }
      }
    }
  } catch {
    // Use the design palette if saved values are unavailable or invalid.
  }
  return state
}

export default function ColorCustomizer({ theme, onThemeChange }: {
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
}) {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [stored] = useState(readStoredColors)
  const [lightColors, setLightColors] = useState<ColorPalette>(stored.light)
  const [darkColors, setDarkColors] = useState<ColorPalette>(stored.dark)
  const [history, setHistory] = useState<ColorHistory>(stored.history)
  const [drafts, setDrafts] = useState<Partial<Record<ColorKey, string>>>({})
  const [previousTheme, setPreviousTheme] = useState(theme)
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed' | ''>('')
  const pickerSession = useRef<{ key: ColorKey; theme: ThemeMode; original: string } | null>(null)

  // Reset unfinished hex edits when switching themes, during render instead of
  // synchronously updating state in an effect (react-hooks/set-state-in-effect).
  if (previousTheme !== theme) {
    setPreviousTheme(theme)
    setDrafts({})
  }

  const colors = theme === 'dark' ? darkColors : lightColors

  useEffect(() => {
    for (const key of Object.keys(CSS_VARIABLES) as ColorKey[]) {
      document.documentElement.style.setProperty(CSS_VARIABLES[key], colors[key])
    }
  }, [colors])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ light: lightColors, dark: darkColors, history }))
    } catch {
      // Color previews remain available even if storage is unavailable.
    }
  }, [lightColors, darkColors, history])

  function savePreviousColor(mode: ThemeMode, key: ColorKey, original: string, latest: string) {
    const previousColor = original.toLowerCase()
    const selectedColor = latest.toLowerCase()
    if (previousColor === selectedColor) return
    setHistory(current => ({
      ...current,
      [mode]: {
        ...current[mode],
        [key]: [
          previousColor,
          ...(current[mode][key] ?? []).filter(color => color !== previousColor && color !== selectedColor)
        ].slice(0, 2)
      }
    }))
  }

  function setColor(key: ColorKey, value: string, recordHistory = true) {
    if (!HEX_COLOR.test(value)) return
    const next = value.toLowerCase()
    const old = colors[key].toLowerCase()
    if (next === old) return
    if (recordHistory) savePreviousColor(theme, key, old, next)
    const setter = theme === 'dark' ? setDarkColors : setLightColors
    setter(current => ({ ...current, [key]: next }))
  }

  function beginPickerSession(key: ColorKey) {
    if (pickerSession.current?.key === key && pickerSession.current.theme === theme) return
    pickerSession.current = { key, theme, original: colors[key].toLowerCase() }
  }

  function updateColor(key: ColorKey, value: string) {
    beginPickerSession(key)
    // Preview is immediate, but the two recent swatches remain fixed while the picker is in use.
    setColor(key, value, false)
    setDrafts(current => ({ ...current, [key]: value }))
  }

  function finishPickerSession(key: ColorKey) {
    const session = pickerSession.current
    if (!session || session.key !== key) return
    pickerSession.current = null
    const currentColors = session.theme === 'dark' ? darkColors : lightColors
    savePreviousColor(session.theme, key, session.original, currentColors[key])
    setDrafts(current => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function updateHexDraft(key: ColorKey, value: string) {
    setDrafts((current) => ({ ...current, [key]: value }))
    if (HEX_COLOR.test(value)) {
      setColor(key, value)
    }
  }

  function finishHexEdit(key: ColorKey) {
    setDrafts((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
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
    const defaults = theme === 'dark' ? DARK_MODE_DEFAULTS : LIGHT_MODE_DEFAULTS
    const setter = theme === 'dark' ? setDarkColors : setLightColors
    setHistory(previous => {
      const values = { ...previous[theme] }
      for (const key of Object.keys(CSS_VARIABLES) as ColorKey[]) {
        const old = colors[key].toLowerCase()
        if (old !== defaults[key]) {
          values[key] = [old, ...(values[key] ?? []).filter(color => color !== old && color !== defaults[key])].slice(0, 2)
        }
      }
      return { ...previous, [theme]: values }
    })
    setter({ ...defaults })
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
                  const recentColors = history[theme][colorKey] ?? []

                  return (
                    <div className="color-customizer__field" key={colorKey}>
                      <label htmlFor={inputId}>{colorName}</label>
                      <div className="color-customizer__inputs">
                        <input
                          className="color-customizer__swatch"
                          type="color"
                          value={colors[colorKey]}
                          aria-label={t('colorEditor.pickerLabel', {
                            color: colorName
                          })}
                          onFocus={() => beginPickerSession(colorKey)}
                          onChange={(event) =>
                            updateColor(colorKey, event.currentTarget.value)
                          }
                          onBlur={() => finishPickerSession(colorKey)}
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
                            color: colorName
                          })}
                          onChange={(event) =>
                            updateHexDraft(colorKey, event.currentTarget.value)
                          }
                          onBlur={() => finishHexEdit(colorKey)}
                        />
                      </div>
                      {recentColors.length > 0 && (
                        <div className="color-customizer__recent" role="group" aria-label={t('colorEditor.recentColorsFor', { color: colorName })}>
                          {recentColors.map((recent, index) => (
                            <button
                              className="color-customizer__recent-swatch"
                              type="button"
                              key={recent}
                              style={{ backgroundColor: recent }}
                              aria-label={t('colorEditor.restoreColor', { color: colorName, value: recent, position: index + 1 })}
                              title={recent}
                              onClick={() => {
                                setColor(colorKey, recent)
                                setDrafts(current => {
                                  const next = { ...current }
                                  delete next[colorKey]
                                  return next
                                })
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="color-customizer__actions">
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
