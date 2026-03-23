import React from 'react';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildMeta(data) {
  const tone = data?.tone ? `Tone: ${data.tone}` : null;
  const density = data?.density ? `Density: ${data.density}` : null;
  const type = data?.typography_mode ? `Type: ${data.typography_mode}` : null;
  return [tone, density, type].filter(Boolean).join(' • ') || 'Editorial Mode';
}

export default function SlateTemplate({ data, text, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#0f1115',
    color: s.text_color || '#b5becb'
  };

  const headerStyle = {
    color: s.heading_color || '#e8eef0'
  };

  const titleStyle = {
    fontFamily: s.heading_font_family || 'Newsreader',
    fontSize: s.heading_font_size || '40px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#e8eef0'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '16px',
    fontFamily: s.body_font_family || 'Newsreader',
    color: s.muted_color || '#7d87a2'
  };

  const metaStyle = {
    fontFamily: s.meta_font_family || 'Inter',
    fontSize: s.meta_font_size || '12px',
    color: s.muted_color || '#7d87a2'
  };

  const bodyStyle = {
    fontFamily: s.body_font_family || 'Newsreader',
    fontSize: s.body_font_size || '17px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.75,
    letterSpacing: s.letter_spacing || '0px',
    color: s.text_color || '#b5becb'
  };

  const quoteStyle = {
    fontFamily: s.body_font_family || 'Newsreader',
    fontSize: s.body_font_size || '17px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#7d87a2',
    borderLeftColor: s.accent_color || '#8b9ac6'
  };

  return (
    <article className="slate-container" style={containerStyle}>
      <div className="slate-column">
        <section className="slate-sheet" style={{ backgroundColor: s.panel_color || '#15191e' }}>
          <header className="slate-header" style={headerStyle}>
            <p className="slate-meta" style={metaStyle}>{buildMeta(data)}</p>
            <h1 className="slate-title" style={titleStyle}>{data?.title_variant || 'Untitled'}</h1>
            <p className="slate-dek" style={dekStyle}>{data?.dek || ''}</p>
          </header>

          {data?.pull_quote ? (
            <blockquote className="slate-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
          ) : null}

          <hr className="slate-divider" style={{ borderTopColor: s.border_color || '#2a2d33' }} />

          <section className="slate-body">
            {bodyParagraphs.map((paragraph, idx) => (
              <p key={`paragraph-${idx}`} className="slate-paragraph" style={bodyStyle}>
                {paragraph}
              </p>
            ))}
          </section>

          {highlights.length > 0 ? (
            <section className="slate-highlights">
              <p className="slate-meta" style={metaStyle}>Selected Excerpts</p>
              {highlights.map((line, idx) => (
                <p key={`highlight-${idx}`} className="slate-highlight-row" style={bodyStyle}>
                  <span className="slate-highlight" style={{ color: s.accent_color || '#8b9ac6' }}>{line}</span>
                </p>
              ))}
            </section>
          ) : null}
        </section>
      </div>
    </article>
  );
}
