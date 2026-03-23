import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildMetaLine(data) {
  const tone = data?.tone ? `tone=${data.tone}` : null;
  const density = data?.density ? `density=${data.density}` : null;
  const layout = data?.layout_mode ? `layout=${data.layout_mode}` : null;
  return [tone, density, layout].filter(Boolean).join(' · ') || 'mode=terminal';
}

export default function TechTemplate({ data, text, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#0d1117',
    color: s.text_color || '#c9d1d9'
  };

  const titleStyle = {
    fontFamily: createFontStack(s.heading_font_family || 'JetBrains Mono'),
    fontSize: s.heading_font_size || '20px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#79c0ff'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '13px',
    fontFamily: createFontStack(s.body_font_family || 'JetBrains Mono'),
    color: s.muted_color || '#8b949e'
  };

  const metaStyle = {
    fontFamily: createFontStack(s.meta_font_family || 'JetBrains Mono'),
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#8b949e'
  };

  const bodyStyle = {
    fontFamily: createFontStack(s.body_font_family || 'JetBrains Mono'),
    fontSize: s.body_font_size || '14px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.5,
    letterSpacing: s.letter_spacing || '0px',
    color: s.text_color || '#c9d1d9'
  };

  const quoteStyle = {
    fontFamily: createFontStack(s.body_font_family || 'JetBrains Mono'),
    fontSize: s.body_font_size || '14px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#8b949e',
    borderLeftColor: s.accent_color || '#58a6ff'
  };

  const panelBgColor = s.panel_color || '#161b22';

  return (
    <article className="terminal-container" style={containerStyle}>
      <div className="terminal-column">
        <section className="terminal-window" style={{ backgroundColor: panelBgColor }}>
          <header className="terminal-toolbar">
            <div className="terminal-controls" aria-hidden="true">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
            <span className="terminal-toolbar-label" style={metaStyle}>advocate-style-transformer</span>
          </header>

          <div className="terminal-content">
            <p className="terminal-meta" style={metaStyle}>$ article.render --profile tech</p>
            <h1 className="terminal-title" style={titleStyle}>{data?.title_variant || 'Untitled'}</h1>
            <p className="terminal-dek" style={dekStyle}>{data?.dek || ''}</p>
            <p className="terminal-meta" style={metaStyle}>{buildMetaLine(data)}</p>

            <hr className="terminal-divider" style={{ borderTopColor: s.border_color || '#30363d' }} />

            {data?.pull_quote ? (
              <blockquote className="terminal-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
            ) : null}

            <div className="terminal-body">
              {bodyParagraphs.map((paragraph, idx) => (
                <span key={`line-${idx}`} className="terminal-line" style={bodyStyle}>
                  <span className="terminal-prefix">&gt;</span>
                  {paragraph}
                </span>
              ))}
            </div>

            {highlights.length > 0 ? (
              <section className="terminal-highlights">
                <p className="terminal-meta" style={metaStyle}>[HIGHLIGHTS]</p>
                {highlights.map((line, idx) => (
                  <p key={`highlight-${idx}`} className="terminal-highlight-row" style={bodyStyle}>
                    <span className="terminal-prefix">$</span>
                    <span className="terminal-highlight" style={{ color: s.accent_color || '#58a6ff' }}>{line}</span>
                  </p>
                ))}
              </section>
            ) : null}
          </div>
        </section>
      </div>
    </article>
  );
}
