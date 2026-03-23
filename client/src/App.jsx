import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import InstructionsPanel from './components/InstructionsPanel';
import PixelTemplate from './components/PixelTemplate';
import PapyrusTemplate from './components/PapyrusTemplate';
import MinimalistTemplate from './components/MinimalistTemplate';
import PrintNewspaperTemplate from './components/PrintNewspaperTemplate';
import OnlineNewspaperTemplate from './components/OnlineNewspaperTemplate';
import TechTemplate from './components/TechTemplate';
import SlateTemplate from './components/SlateTemplate';
import WoodlandTemplate from './components/WoodlandTemplate';
import RomanticTemplate from './components/RomanticTemplate';
import { preloadFonts } from './utils/loadGoogleFonts';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8787').replace(/\/+$/, '');

const TEMPLATE_MAP = {
  pixel: PixelTemplate,
  papyrus: PapyrusTemplate,
  minimalist: MinimalistTemplate,
  print_newspaper: PrintNewspaperTemplate,
  online_newspaper: OnlineNewspaperTemplate,
  tech: TechTemplate,
  slate: SlateTemplate,
  woodland: WoodlandTemplate,
  romantic: RomanticTemplate
};

const THEME_DEFAULT_FONT_SETTINGS = {
  pixel: { heading_font_family: 'Press Start 2P', body_font_family: 'Press Start 2P' },
  papyrus: { heading_font_family: 'Cinzel Decorative', body_font_family: 'Alegreya' },
  minimalist: { heading_font_family: 'Inter', body_font_family: 'Inter' },
  print_newspaper: { heading_font_family: 'Old Standard TT', body_font_family: 'Libre Baskerville' },
  online_newspaper: { heading_font_family: 'Source Serif 4', body_font_family: 'Source Serif 4' },
  tech: { heading_font_family: 'JetBrains Mono', body_font_family: 'JetBrains Mono' },
  slate: { heading_font_family: 'Newsreader', body_font_family: 'Newsreader' },
  woodland: { heading_font_family: 'Dosis', body_font_family: 'Dosis' },
  romantic: { heading_font_family: 'Dancing Script', body_font_family: 'Cormorant Garamond' }
};

export default function App() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [currentTab, setCurrentTab] = useState('editor');
  const [generatedText, setGeneratedText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  const canGenerate = useMemo(() => text.trim().length > 10, [text]);

  async function handleGenerate() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/analyze-style`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text.trim(),
          title: title.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');

      const stylePlan = data.stylePlan || null;
      setResult(stylePlan);
      setGeneratedText(text.trim());
      setSelectedTheme(stylePlan?.theme || '');
      setCurrentTab('preview');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const activeTheme = selectedTheme || result?.theme;
  const previewData = result && activeTheme ? { ...result, theme: activeTheme } : result;
  const SelectedTemplate = activeTheme && TEMPLATE_MAP[activeTheme];
  const activeSettings = result
    ? activeTheme === result.theme
      ? result.theme_settings
      : THEME_DEFAULT_FONT_SETTINGS[activeTheme]
    : undefined;
  const hasGeneratedForCurrentText = Boolean(result) && generatedText === text.trim();

  useEffect(() => {
    if (activeSettings) {
      preloadFonts(activeSettings).catch((err) => {
        console.warn('Font preload error:', err);
      });
    }
  }, [activeSettings]);

  function handleTextChange(nextText) {
    setText(nextText);
  }

  return (
    <>
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {currentTab === 'editor' ? (
        <main className="app-main full-width-main">
          <section className="input-panel">
            <div className="input-header">
              <h2>Your Piece</h2>
              <p className="input-hint">Paste literary text. The AI will select a theme and styling.</p>
            </div>

            <input
              id="piece-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="piece-title"
            />

            <textarea
              id="piece-text"
              rows={18}
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Paste your writing here..."
              className="piece-textarea"
            />

            <div className="input-footer">
              <span className="char-count">{text.length} characters</span>
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || loading}
                className="generate-button"
              >
                {loading ? 'Analyzing…' : 'Generate'}
              </button>
            </div>

            {error ? <p className="error-message">{error}</p> : null}
          </section>
        </main>
      ) : currentTab === 'preview' ? (
        <main className="app-main preview-main full-width-main">
          {!result ? (
            <div className="empty-state">
              <div className="empty-state-content">
                <p className="empty-state-title">No preview yet</p>
                <p className="empty-state-text">Go to Editor and click Generate to see it styled.</p>
              </div>
            </div>
          ) : loading ? (
            <LoadingState />
          ) : (
            <>
              <section className="output-panel">
                <div className="decision-panel">
                  <div className="decision-header">
                    <span className="decision-label">AI Selection</span>
                  </div>
                  <div className="decision-tags">
                    <span className="tag theme-tag">{activeTheme}</span>
                    <span className="tag">{result.tone}</span>
                    <span className="tag">{result.density}</span>
                  </div>
                  <p className="decision-reasoning">{result.reasoning_summary}</p>
                </div>

                {SelectedTemplate ? (
                  <div className="template-container">
                    <SelectedTemplate data={previewData} text={text} title={title} settings={activeSettings} />
                  </div>
                ) : (
                  <div className="error-message">Template not found for theme: {activeTheme}</div>
                )}

                {hasGeneratedForCurrentText ? (
                  <div className="theme-switcher-bar">
                    <span className="theme-switcher-label">Switch Theme</span>
                    <div className="theme-switcher-options">
                      {Object.keys(TEMPLATE_MAP).map((themeName) => (
                        <button
                          key={themeName}
                          type="button"
                          className={`theme-switcher-btn ${activeTheme === themeName ? 'active' : ''}`}
                          onClick={() => setSelectedTheme(themeName)}
                        >
                          {themeName.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            </>
          )}
        </main>
      ) : (
        <main className="app-main instructions-main">
          <InstructionsPanel />
        </main>
      )}
    </>
  );
}
