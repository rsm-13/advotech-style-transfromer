import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildMetaLine(data) {
  const tone = data?.tone ? `Tone: ${data.tone}` : null;
  const density = data?.density ? `Density: ${data.density}` : null;
  const hero = data?.hero_style ? `Hero: ${data.hero_style}` : null;
  return [tone, density, hero].filter(Boolean).join(' • ') || 'Staff Reporter';
}

export default function OnlineNewspaperTemplate({ data, text, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#ffffff',
    color: s.text_color || '#121212'
  };

  const headerStyle = {
    color: s.heading_color || '#000000'
  };

  const titleStyle = {
    fontFamily: createFontStack(s.heading_font_family || 'Source Serif 4'),
    fontSize: s.heading_font_size || '42px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#000000'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '18px',
    fontFamily: createFontStack(s.body_font_family || 'Source Serif 4'),
    color: s.muted_color || '#757575'
  };

  const metaStyle = {
    fontFamily: createFontStack(s.meta_font_family || 'Source Sans 3'),
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#757575'
  };

  const bodyStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Source Serif 4'),
    fontSize: s.body_font_size || '18px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.7,
    letterSpacing: s.letter_spacing || '0px',
    color: s.text_color || '#121212'
  };

  const quoteStyle = {
    fontFamily: createFontStack(s.body_font_family || 'Source Serif 4'),
    fontSize: s.body_font_size || '18px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#757575',
    borderLeftColor: s.accent_color || '#1976d2'
  };

  return (
    <article className="online-container" style={containerStyle}>
      <div className="online-column">
        <header className="online-header" style={headerStyle}>
          <h1 className="online-title" style={titleStyle}>{data?.title_variant || 'Untitled'}</h1>
          <p className="online-dek" style={dekStyle}>{data?.dek || ''}</p>
          <p className="online-meta" style={metaStyle}>{buildMetaLine(data)}</p>
        </header>

        <div className="online-divider" style={{ borderTopColor: s.border_color || '#e0e0e0' }} />

        {data?.pull_quote ? (
          <blockquote className="online-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
        ) : null}

        <section className="online-body">
          {bodyParagraphs.map((paragraph, idx) => (
            <p key={`paragraph-${idx}`} className="online-paragraph" style={bodyStyle}>
              {paragraph}
            </p>
          ))}
        </section>

        {highlights.length > 0 ? (
          <section className="online-highlights">
            <p className="online-meta" style={metaStyle}>Key Points</p>
            {highlights.map((line, idx) => (
              <p key={`highlight-${idx}`} className="online-highlight-row" style={bodyStyle}>
                <span className="online-highlight" style={{ color: s.accent_color || '#1976d2' }}>{line}</span>
              </p>
            ))}
          </section>
        ) : null}
      </div>
    </article>
  );
}
