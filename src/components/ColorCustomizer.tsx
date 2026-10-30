import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const PALETTE_PRESETS = {
  softSage: {
    "pageBackground": "#f3f1eb",
    "mainText": "#363a3b",
    "paragraphText": "#4b5354",
    "metaText": "#68706f",
    "brandName": "#44565c",
    "headings": "#576d73",
    "sectionTitles": "#687f6f",
    "logo": "#687f6f",
    "controlText": "#53685a",
    "timelineMarkers": "#728b76",
    "headerDivider": "#dadfd8",
    "navigationHover": "#e7eae3",
    "languageSelectorBorder": "#cbd4ca",
    "outlineButtonsBorder": "#98a991",
    "timelineLine": "#d8ded5",
    "technologyTagsBorder": "#dadbd2",
    "technologyTagsBackground": "#ebede6",
    "textOnAccent": "#ffffff"
  },
  inkTeal: {
    "pageBackground": "#f2f6f5",
    "mainText": "#24343a",
    "paragraphText": "#435258",
    "metaText": "#667477",
    "brandName": "#16324f",
    "headings": "#16324f",
    "sectionTitles": "#257c83",
    "logo": "#257c83",
    "controlText": "#1e6971",
    "timelineMarkers": "#257c83",
    "headerDivider": "#dbe4e3",
    "navigationHover": "#e2eeed",
    "languageSelectorBorder": "#c5d6d6",
    "outlineButtonsBorder": "#6e9fa1",
    "timelineLine": "#d0e0df",
    "technologyTagsBorder": "#ccdddd",
    "technologyTagsBackground": "#e8f1f0",
    "textOnAccent": "#ffffff"
  },
  mauveStone: {
    "pageBackground": "#f4f0f3",
    "mainText": "#3b353d",
    "paragraphText": "#514b54",
    "metaText": "#726973",
    "brandName": "#544055",
    "headings": "#6a536e",
    "sectionTitles": "#876f87",
    "logo": "#876f87",
    "controlText": "#68576d",
    "timelineMarkers": "#907795",
    "headerDivider": "#e0d8e0",
    "navigationHover": "#eee8ee",
    "languageSelectorBorder": "#d8cad7",
    "outlineButtonsBorder": "#b49eb3",
    "timelineLine": "#e1d7e2",
    "technologyTagsBorder": "#e4dbe4",
    "technologyTagsBackground": "#f0eaf0",
    "textOnAccent": "#ffffff"
  },
  blueFog: {
    "pageBackground": "#f0f4f7",
    "mainText": "#303b47",
    "paragraphText": "#495660",
    "metaText": "#697783",
    "brandName": "#2f4358",
    "headings": "#3d5d7a",
    "sectionTitles": "#627f99",
    "logo": "#627f99",
    "controlText": "#50677d",
    "timelineMarkers": "#67849f",
    "headerDivider": "#d9e1e9",
    "navigationHover": "#e6ecf2",
    "languageSelectorBorder": "#c9d5e0",
    "outlineButtonsBorder": "#9cafc0",
    "timelineLine": "#d5dfe8",
    "technologyTagsBorder": "#d4dee7",
    "technologyTagsBackground": "#e9eff4",
    "textOnAccent": "#ffffff"
  }
} as const

const DEFAULT_PALETTE_ID = 'softSage' as const
const DEFAULT_COLORS = PALETTE_PRESETS[DEFAULT_PALETTE_ID]

type PaletteId = keyof typeof PALETTE_PRESETS
type ColorKey = keyof typeof DEFAULT_COLORS
type ColorPalette = Record<ColorKey, string>
type SavedPalettes = Record<PaletteId, ColorPalette>
type PaletteStorage = { activePaletteId: PaletteId; palettes: SavedPalettes }

const PALETTE_SWATCH_KEYS: ColorKey[] = [
  'pageBackground',
  'brandName',
  'headings',
  'sectionTitles',
  'logo',
]

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

function createDefaultPalettes(): SavedPalettes {
  return {
    softSage: { ...PALETTE_PRESETS.softSage },
    inkTeal: { ...PALETTE_PRESETS.inkTeal },
    mauveStone: { ...PALETTE_PRESETS.mauveStone },
    blueFog: { ...PALETTE_PRESETS.blueFog },
  }
}

function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(PALETTE_PRESETS, value)
}

function mergeSavedColors(target: ColorPalette, saved: unknown) {
  if (!saved || typeof saved !== 'object') return

  const values = saved as Partial<ColorPalette>
  for (const key of Object.keys(DEFAULT_COLORS) as ColorKey[]) {
    const value = values[key]
    if (typeof value === 'string' && HEX_COLOR.test(value)) {
      target[key] = value
    }
  }
}

function readSavedPaletteData(): PaletteStorage {
  const palettes = createDefaultPalettes()
  let activePaletteId: PaletteId = DEFAULT_PALETTE_ID

  try {
    const saved = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? '{}',
    ) as {
      activePaletteId?: unknown
      palettes?: Partial<Record<PaletteId, Partial<ColorPalette>>>
    } & Partial<ColorPalette>

    if (isPaletteId(saved.activePaletteId)) {
      activePaletteId = saved.activePaletteId
    }

    if (saved.palettes && typeof saved.palettes === 'object') {
      for (const id of Object.keys(PALETTE_PRESETS) as PaletteId[]) {
        mergeSavedColors(palettes[id], saved.palettes[id])
      }
    } else {
      // Migrate the previous single-palette format into Soft Sage.
      mergeSavedColors(palettes[DEFAULT_PALETTE_ID], saved)
    }
  } catch {
    // Keep the preset palettes when browser storage is unavailable.
  }

  return { activePaletteId, palettes }
}

export default function ColorCustomizer() {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [initialPaletteData] = useState(readSavedPaletteData)
  const [activePaletteId, setActivePaletteId] = useState(
    initialPaletteData.activePaletteId,
  )
  const [palettes, setPalettes] = useState(initialPaletteData.palettes)
  const [drafts, setDrafts] = useState<Partial<Record<ColorKey, string>>>({})
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed' | ''>('')
  const colors = palettes[activePaletteId]

  useEffect(() => {
    for (const key of Object.keys(CSS_VARIABLES) as ColorKey[]) {
      document.documentElement.style.setProperty(CSS_VARIABLES[key], colors[key])
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ activePaletteId, palettes }),
      )
    } catch {
      // The live preview still works when browser storage is unavailable.
    }
  }, [activePaletteId, colors, palettes])

  function selectPalette(id: PaletteId) {
    setActivePaletteId(id)
    setDrafts({})
  }

  function updateColor(key: ColorKey, value: string) {
    setPalettes((current) => ({
      ...current,
      [activePaletteId]: { ...current[activePaletteId], [key]: value },
    }))
    setDrafts((current) => ({ ...current, [key]: value }))
  }

  function updateHexDraft(key: ColorKey, value: string) {
    setDrafts((current) => ({ ...current, [key]: value }))
    if (HEX_COLOR.test(value)) {
      setPalettes((current) => ({
        ...current,
        [activePaletteId]: { ...current[activePaletteId], [key]: value },
      }))
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
      await navigator.clipboard.writeText(JSON.stringify(colors, null, 2))
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  function resetColors() {
    setPalettes((current) => ({
      ...current,
      [activePaletteId]: { ...PALETTE_PRESETS[activePaletteId] },
    }))
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

        <fieldset className="color-customizer__palette-section">
          <legend>{t('colorEditor.palettesTitle')}</legend>
          <div className="color-customizer__palette-grid">
            {(Object.keys(PALETTE_PRESETS) as PaletteId[]).map((id) => {
              const name = t('colorEditor.palettes.' + id)

              return (
                <button
                  className="color-customizer__palette-button"
                  type="button"
                  key={id}
                  aria-label={t('colorEditor.selectPalette', { palette: name })}
                  aria-pressed={activePaletteId === id}
                  onClick={() => selectPalette(id)}
                >
                  <span className="color-customizer__palette-swatches" aria-hidden="true">
                    {PALETTE_SWATCH_KEYS.map((key) => (
                      <span
                        className="color-customizer__palette-swatch"
                        key={key}
                        style={{ backgroundColor: PALETTE_PRESETS[id][key] }}
                      />
                    ))}
                  </span>
                  <span>{name}</span>
                </button>
              )
            })}
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
