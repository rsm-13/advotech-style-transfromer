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

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787';

// Map theme names to template components
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

export default function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [currentTab, setCurrentTab] = useState('editor');

  const canGenerate = useMemo(() => text.trim().length > 10, [text]);

  // Preload fonts when result is received
  useEffect(() => {
    if (result?.theme_settings) {
      preloadFonts(result.theme_settings).catch(err => {
        console.warn('Font preload error:', err);
      });
    }
  }, [result]);

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
          text: text.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');
      
      setResult(data.stylePlan || null);
      setCurrentTab('editor');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  // Select template based on theme from result
  const SelectedTemplate = result && TEMPLATE_MAP[result.theme];

  return (
    <>
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      
      {currentTab === 'editor' ? (
        <main className="app-main">
          <section className="input-panel">
            <div className="input-header">
              <h2>Your Piece</h2>
              <p className="input-hint">Paste literary text. The AI will select a theme and styling.</p>
            </div>

            <textarea
              id="piece-text"
              rows={18}
              value={text}
              onChange={(e) => setText(e.target.value)}
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

          <section className="output-panel">
            {!result ? (
              <div className="empty-state">
                <div className="empty-state-content">
                  <p className="empty-state-title">No piece yet</p>
                  <p className="empty-state-text">Paste your writing and click Generate to see it styled.</p>
                </div>
              </div>
            ) : loading ? (
              <LoadingState />
            ) : (
              <>
                <div className="decision-panel">
                  <div className="decision-header">
                    <span className="decision-label">AI Selection</span>
                  </div>
                  <div className="decision-tags">
                    <span className="tag theme-tag">{result.theme}</span>
                    <span className="tag">{result.tone}</span>
                    <span className="tag">{result.density}</span>
                  </div>
                  <p className="decision-reasoning">{result.reasoning_summary}</p>
                </div>
                {SelectedTemplate ? (
                  <div className="template-container">
                    <SelectedTemplate data={result} text={text} settings={result.theme_settings} />
                  </div>
                ) : (
                  <div className="error-message">Template not found for theme: {result.theme}</div>
                )}
              </>
            )}
          </section>
        </main>
      ) : (
        <main className="app-main instructions-main">
          <InstructionsPanel />
        </main>
      )}
    </>
  );
}
