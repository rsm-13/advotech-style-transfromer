import React, { useEffect, useMemo, useState } from 'react';
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
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  // Select template based on theme from result
  const SelectedTemplate = result && TEMPLATE_MAP[result.theme];

  return (
    <main className="app-shell">
      <section className="input-panel">
        <h1>Advocate Style Transformer &amp; Page Builder</h1>
        <p className="subtitle">Paste your text. The AI reads it and automatically selects the best theme and styling. No manual theme selection needed.</p>

        <label htmlFor="piece-text">Literary text</label>
        <textarea
          id="piece-text"
          rows={14}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste literary text here..."
        />

        <button onClick={handleGenerate} disabled={!canGenerate || loading}>
          {loading ? 'Analyzing & Generating…' : 'Generate'}
        </button>

        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="output-panel">
        {!result ? (
          <div className="empty-state">Generate to see AI-selected theme and styling.</div>
        ) : (
          <>
            <div className="decision-panel">
              <p className="decision-title">AI decisions</p>
              <div className="tag-row">
                <span className="tag theme-tag">theme: {result.theme}</span>
                <span className="tag">tone: {result.tone}</span>
                <span className="tag">density: {result.density}</span>
              </div>
              <p className="reasoning">{result.reasoning_summary}</p>
            </div>
            {SelectedTemplate ? (
              <SelectedTemplate data={result} text={text} settings={result.theme_settings} />
            ) : (
              <div className="error">Template not found for theme: {result.theme}</div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
