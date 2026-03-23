import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function WoodlandTemplate({ data, text, title, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#ede8e0',
    color: s.text_color || '#201813'
  };

  const headerStyle = {
    color: s.heading_color || '#2a1f18'
  };

  const titleStyle = {
    fontFamily: createFontStack(s.heading_font_family || 'Dosis'),
    fontSize: s.heading_font_size || '44px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#2a1f18'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '17px',
    fontFamily: createFontStack(s.body_font_family || 'Dosis'),
    color: s.muted_color || '#8b7766'
  };

  const metaStyle = {
    fontFamily: createFontStack(s.meta_font_family || 'Inter'),
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#8b7766'
  };

  const bodyStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Dosis'),
    fontSize: s.body_font_size || '18px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.85,
    letterSpacing: s.letter_spacing || '0.5px',
    color: s.text_color || '#201813'
  };

  const quoteStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Dosis'),
    fontSize: s.body_font_size || '18px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#8b7766',
    borderLeftColor: s.accent_color || '#8b5e3c'
  };

  return (
    <article className="woodland-container" style={containerStyle}>
      <div className="woodland-column">
        <div className="woodland-sheet" style={{ backgroundColor: s.panel_color || '#f5ede2' }}>
          <header className="woodland-header" style={headerStyle}>
            <p className="woodland-meta" style={metaStyle}>From Nature's Archive</p>
            <h1 className="woodland-title" style={titleStyle}>{title?.trim() || data?.title_variant || 'Untitled'}</h1>
            <p className="woodland-dek" style={dekStyle}>{data?.dek || ''}</p>
          </header>

          {data?.pull_quote ? (
            <blockquote className="woodland-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
          ) : null}

          <div className="woodland-divider" style={{ borderTopColor: s.border_color || '#c7b9a8' }} />

          <div className="woodland-body">
            {bodyParagraphs.map((paragraph, idx) => (
              <p key={`paragraph-${idx}`} className="woodland-paragraph" style={bodyStyle}>
                {paragraph}
              </p>
            ))}
          </div>

          {highlights.length > 0 ? (
            <section className="woodland-highlights">
              <p className="woodland-meta" style={metaStyle}>Key Passages</p>
              {highlights.map((line, idx) => (
                <p key={`highlight-${idx}`} className="woodland-highlight-row" style={bodyStyle}>
                  <span className="woodland-highlight" style={{ color: s.accent_color || '#8b5e3c' }}>{line}</span>
                </p>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
