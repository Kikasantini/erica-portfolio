import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const DEFAULT_COLORS = {
  "pageBackground": "#f2eee6",
  "mainText": "#37352f",
  "paragraphText": "#4c4a44",
  "metaText": "#55514a",
  "brandName": "#51465e",
  "headings": "#705d85",
  "sectionTitles": "#657c68",
  "logo": "#657c68",
  "controlText": "#5f526e",
  "timelineMarkers": "#796895",
  "headerDivider": "#e7e0d4",
  "navigationHover": "#e8e7df",
  "languageSelectorBorder": "#d9d0df",
  "outlineButtonsBorder": "#a99ab6",
  "timelineLine": "#d8cfe0",
  "technologyTagsBorder": "#ddd5c7",
  "technologyTagsBackground": "#f0ebe3",
  "textOnAccent": "#ffffff"
} as const

type ColorKey = keyof typeof DEFAULT_COLORS
type ColorPalette = Record<ColorKey, string>

const CSS_VARIABLES: Record<ColorKey, string> = {
  "pageBackground": "--page-background",
  "mainText": "--main-text",
  "paragraphText": "--paragraph-text",
  "metaText": "--meta-text",
  "brandName": "--brand-name",
  "headings": "--heading-color",
  "sectionTitles": "--section-title-color",
  "logo": "--logo-color",
  "controlText": "--control-text-color",
  "timelineMarkers": "--timeline-marker-color",
  "headerDivider": "--header-divider-color",
  "navigationHover": "--navigation-hover-color",
  "languageSelectorBorder": "--language-border-color",
  "outlineButtonsBorder": "--outline-button-border-color",
  "timelineLine": "--timeline-line-color",
  "technologyTagsBorder": "--technology-tag-border-color",
  "technologyTagsBackground": "--technology-tag-background-color",
  "textOnAccent": "--text-on-accent-color"
}

const COLOR_GROUPS = [
  {
    "id": "surfaces",
    "keys": [
      "pageBackground",
      "technologyTagsBackground"
    ]
  },
  {
    "id": "text",
    "keys": [
      "mainText",
      "paragraphText",
      "metaText",
      "brandName"
    ]
  },
  {
    "id": "accents",
    "keys": [
      "headings",
      "sectionTitles",
      "logo",
      "controlText",
      "timelineMarkers",
      "textOnAccent"
    ]
  },
  {
    "id": "borders",
    "keys": [
      "headerDivider",
      "navigationHover",
      "languageSelectorBorder",
      "outlineButtonsBorder",
      "timelineLine",
      "technologyTagsBorder"
    ]
  }
] as const

const STORAGE_KEY = 'erica-portfolio-color-palette-v1'
const HEX_COLOR = /^#[0-9a-f]{6}$/i

function readSavedColors(): ColorPalette {
  const colors: ColorPalette = { ...DEFAULT_COLORS }

  try {
    const saved = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? '{}',
    ) as Partial<ColorPalette>

    for (const key of Object.keys(DEFAULT_COLORS) as ColorKey[]) {
      const value = saved[key]
      if (typeof value === 'string' && HEX_COLOR.test(value)) {
        colors[key] = value
      }
    }
  } catch {
    return colors
  }

  return colors
}

export default function ColorCustomizer() {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [colors, setColors] = useState<ColorPalette>(readSavedColors)
  const [drafts, setDrafts] = useState<Partial<Record<ColorKey, string>>>({})

  useEffect(() => {
    for (const key of Object.keys(CSS_VARIABLES) as ColorKey[]) {
      document.documentElement.style.setProperty(CSS_VARIABLES[key], colors[key])
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(colors))
    } catch {
      // The live preview still works when browser storage is unavailable.
    }
  }, [colors])

  function updateColor(key: ColorKey, value: string) {
    setColors((current) => ({ ...current, [key]: value }))
    setDrafts((current) => ({ ...current, [key]: value }))
  }

  function updateHexDraft(key: ColorKey, value: string) {
    setDrafts((current) => ({ ...current, [key]: value }))
    if (HEX_COLOR.test(value)) {
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

  function resetColors() {
    setColors({ ...DEFAULT_COLORS })
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

        <button
          className="color-customizer__reset"
          type="button"
          onClick={resetColors}
        >
          {t('colorEditor.reset')}
        </button>
      </section>
    </aside>
  )
}
