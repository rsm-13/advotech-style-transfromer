import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function RomanticTemplate({ data, text, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#f8f4f2',
    color: s.text_color || '#2a1f1c'
  };

  const headerStyle = {
    color: s.heading_color || '#4a2f2a'
  };

  const titleStyle = {
    fontFamily: createFontStack(s.heading_font_family || 'Playfair Display'),
    fontSize: s.heading_font_size || '42px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#4a2f2a'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '18px',
    fontFamily: createFontStack(s.body_font_family || 'Cormorant Garamond'),
    color: s.muted_color || '#7d5f5a'
  };

  const metaStyle = {
    fontFamily: createFontStack(s.meta_font_family || 'Inter'),
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#7d5f5a'
  };

  const bodyStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Cormorant Garamond'),
    fontSize: s.body_font_size || '17px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.8,
    letterSpacing: s.letter_spacing || '0px',
    color: s.text_color || '#2a1f1c'
  };

  const quoteStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Cormorant Garamond'),
    fontSize: s.body_font_size || '17px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#7d5f5a',
    borderLeftColor: s.accent_color || '#b35a5a'
  };

  return (
    <article className="romantic-container" style={containerStyle}>
      <div className="romantic-column">
        <div className="romantic-sheet" style={{ backgroundColor: s.panel_color || '#fff8f6' }}>
          <header className="romantic-header" style={headerStyle}>
            <p className="romantic-meta" style={metaStyle}>A Lyrical Reading</p>
            <h1 className="romantic-title" style={titleStyle}>{data?.title_variant || 'Untitled'}</h1>
            <p className="romantic-dek" style={dekStyle}>{data?.dek || ''}</p>
          </header>

          {data?.pull_quote ? (
            <blockquote className="romantic-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
          ) : null}

          <div className="romantic-divider" style={{ borderTopColor: s.border_color || '#e6d4d0' }} />

          <div className="romantic-body">
            {bodyParagraphs.map((paragraph, idx) => (
              <p key={`paragraph-${idx}`} className="romantic-paragraph" style={bodyStyle}>
                {paragraph}
              </p>
            ))}
          </div>

          {highlights.length > 0 ? (
            <section className="romantic-highlights">
              <p className="romantic-meta" style={metaStyle}>Passages</p>
              {highlights.map((line, idx) => (
                <p key={`highlight-${idx}`} className="romantic-highlight-row" style={bodyStyle}>
                  <span className="romantic-highlight" style={{ color: s.accent_color || '#b35a5a' }}>{line}</span>
                </p>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
