import React from 'react';

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildMetaLine(data) {
  const tone = data?.tone ? `Tone: ${data.tone}` : null;
  const density = data?.density ? `Density: ${data.density}` : null;
  const layout = data?.layout_mode ? `Layout: ${data.layout_mode}` : null;
  return [tone, density, layout].filter(Boolean).join(' • ') || 'Editorial Desk';
}

export default function PrintNewspaperTemplate({ data, text, settings }) {
  const bodyParagraphs = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const s = settings || {};
  const containerStyle = {
    backgroundColor: s.background_color || '#fbfaf6',
    color: s.text_color || '#1a1a1a'
  };

  const headerStyle = {
    color: s.heading_color || '#000000'
  };

  const titleStyle = {
    fontFamily: s.heading_font_family || 'Old Standard TT',
    fontSize: s.heading_font_size || '48px',
    fontWeight: s.heading_font_weight || 700,
    color: s.heading_color || '#000000'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '18px',
    fontFamily: s.body_font_family || 'Libre Baskerville',
    color: s.muted_color || '#666666'
  };

  const metaStyle = {
    fontFamily: s.meta_font_family || 'Roboto',
    fontSize: s.meta_font_size || '11px',
    color: s.muted_color || '#666666'
  };

  const bodyStyle = {
    fontFamily: s.body_font_family || 'Libre Baskerville',
    fontSize: s.body_font_size || '17px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.75,
    letterSpacing: s.letter_spacing || '0px',
    color: s.text_color || '#1a1a1a'
  };

  const quoteStyle = {
    fontFamily: s.body_font_family || 'Libre Baskerville',
    fontSize: s.body_font_size || '17px',
    fontStyle: s.use_italics_for_quotes ? 'italic' : 'normal',
    color: s.muted_color || '#666666',
    borderLeftColor: s.accent_color || '#333333'
  };

  return (
    <article className="newspaper-container" style={containerStyle}>
      <div className="newspaper-page" style={{ backgroundColor: s.panel_color || '#ffffff' }}>
        <header className="newspaper-header" style={headerStyle}>
          <h1 className="newspaper-title" style={titleStyle}>{data?.title_variant || 'Untitled'}</h1>
          <p className="newspaper-dek" style={dekStyle}>{data?.dek || ''}</p>
          <p className="newspaper-meta" style={metaStyle}>{buildMetaLine(data)}</p>
        </header>

        <div className="newspaper-divider" style={{ borderTopColor: s.border_color || '#cccccc' }} />
        <div className="newspaper-subdivider" style={{ borderTopColor: s.border_color || '#cccccc' }} />

        {data?.pull_quote ? (
          <blockquote className="newspaper-quote" style={quoteStyle}>{data.pull_quote}</blockquote>
        ) : null}

        <section className="newspaper-body">
          {bodyParagraphs.map((paragraph, idx) => (
            <p key={`paragraph-${idx}`} className="newspaper-paragraph" style={bodyStyle}>
              {paragraph}
            </p>
          ))}
        </section>

        {highlights.length > 0 ? (
          <section className="newspaper-highlights">
            <p className="newspaper-meta" style={metaStyle}>Notable Lines</p>
            {highlights.map((line, idx) => (
              <p key={`highlight-${idx}`} className="newspaper-highlight-row" style={bodyStyle}>
                <span className="newspaper-highlight" style={{ color: s.accent_color || '#333333' }}>{line}</span>
              </p>
            ))}
          </section>
        ) : null}
      </div>
    </article>
  );
}
