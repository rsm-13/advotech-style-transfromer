import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function PapyrusTemplate({ data, text, title, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#f4ecd8',
    color: s.text_color || '#2c1b12'
  };

  const headerStyle = {
    color: s.heading_color || '#2c1b12'
  };

  const titleStyle = {
    fontFamily: createFontStack(s.heading_font_family || 'Cinzel Decorative'),
    fontSize: s.heading_font_size || '36px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#2c1b12'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '16px',
    fontFamily: createFontStack(s.body_font_family || 'Alegreya'),
    color: s.muted_color || '#8b7355'
  };

  const metaStyle = {
    fontFamily: createFontStack(s.meta_font_family || 'Cormorant SC'),
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#8b7355'
  };

  const bodyStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Alegreya'),
    fontSize: s.body_font_size || '17px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.8,
    letterSpacing: s.letter_spacing || '1px',
    color: s.text_color || '#2c1b12'
  };

  const quoteStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Alegreya'),
    fontSize: s.body_font_size || '17px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#8b7355',
    borderLeftColor: s.accent_color || '#6d4c41'
  };

  return (
    <article className="papyrus-container" style={containerStyle}>
      <div className="papyrus-column">
        <div className="papyrus-sheet" style={{ backgroundColor: s.panel_color || '#faf7ee' }}>
          <p className="papyrus-meta" style={metaStyle}>Manuscript</p>
          <h1 className="papyrus-title" style={titleStyle}>{title?.trim() || data?.title_variant || 'Untitled'}</h1>
          <p className="papyrus-dek" style={dekStyle}>{data?.dek || ''}</p>
        </div>

        {data?.pull_quote ? (
          <blockquote className="papyrus-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
        ) : null}

        <div className="papyrus-sheet" style={{ backgroundColor: s.panel_color || '#faf7ee' }}>
          <div className="papyrus-body">
            {bodyParagraphs.map((paragraph, idx) => (
              <p key={`para-${idx}`} style={bodyStyle}>{paragraph}</p>
            ))}
          </div>
        </div>

        {highlights.length > 0 ? (
          <div className="papyrus-sheet" style={{ backgroundColor: s.panel_color || '#faf7ee' }}>
            <div className="papyrus-highlights">
              <p className="papyrus-meta" style={metaStyle}>Key Passages</p>
              {highlights.map((line, idx) => (
                <p key={`highlight-${idx}`} style={bodyStyle}>
                  <span className="papyrus-highlight" style={{ color: s.accent_color || '#6d4c41' }}>{line}</span>
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="papyrus-divider" style={{ borderTopColor: s.border_color || '#d9c5b1' }} />
      </div>
    </article>
  );
}
