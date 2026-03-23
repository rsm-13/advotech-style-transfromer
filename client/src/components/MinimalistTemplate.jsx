import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function MinimalistTemplate({ data, text, title, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];
  const densityClass =
    data?.density === 'dense'
      ? 'minimal-body-dense'
      : data?.density === 'sparse'
        ? 'minimal-body-sparse'
        : 'minimal-body-medium';

  // Apply theme settings via inline styles
  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#f6f6f4',
    color: s.text_color || '#1a1a1a'
  };

  const headerStyle = {
    color: s.heading_color || '#000000'
  };

  const titleStyle = {
    fontFamily: createFontStack(s.heading_font_family || 'Inter'),
    fontSize: s.heading_font_size || '32px',
    fontWeight: s.heading_font_weight || 300,
    color: s.heading_color || '#000000'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '16px',
    fontFamily: createFontStack(s.body_font_family || 'Inter'),
    color: s.muted_color || '#999999'
  };

  const metaStyle = {
    fontFamily: createFontStack(s.meta_font_family || 'Inter'),
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#999999'
  };

  const bodyStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Inter'),
    fontSize: s.body_font_size || '16px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.7,
    letterSpacing: s.letter_spacing || '0px',
    color: s.text_color || '#1a1a1a'
  };

  const quoteStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Inter'),
    fontSize: s.body_font_size || '16px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#999999',
    borderLeftColor: s.accent_color || '#555555'
  };

  return (
    <article className="minimal-container" style={containerStyle}>
      <div className="minimal-column">
        <section className="minimal-sheet" style={{ backgroundColor: s.panel_color || '#fefefe' }}>
          <header className="minimal-header" style={headerStyle}>
            <p className="minimal-meta" style={metaStyle}>Editorial Edition</p>
            <h1 className="minimal-title" style={titleStyle}>{title?.trim() || data?.title_variant || 'Untitled'}</h1>
            <p className="minimal-dek" style={dekStyle}>{data?.dek || ''}</p>
          </header>

          {data?.pull_quote ? (
            <blockquote className="minimal-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
          ) : null}

          <div className="minimal-divider" style={{ borderTopColor: s.border_color || '#e0e0e0' }} />

          <div className={`minimal-body ${densityClass}`}>
            {bodyParagraphs.map((paragraph, idx) => (
              <p key={`paragraph-${idx}`} className="minimal-paragraph" style={bodyStyle}>
                {paragraph}
              </p>
            ))}
          </div>

          {highlights.length > 0 ? (
            <section className="minimal-highlights">
              <p className="minimal-meta" style={metaStyle}>Selected Lines</p>
              {highlights.map((line, idx) => (
                <p key={`highlight-${idx}`} className="minimal-highlight-row" style={bodyStyle}>
                  <span className="minimal-highlight" style={{ color: s.accent_color || '#555555' }}>{line}</span>
                </p>
              ))}
            </section>
          ) : null}
        </section>
      </div>
    </article>
  );
}
