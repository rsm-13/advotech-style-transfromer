import React from 'react';
import { createFontStack } from '../utils/loadGoogleFonts';

function bodyFontFromTypography(mode) {
  return 'Press Start 2P';
}

function headingFontFromTypography(mode) {
  return "'Press Start 2P', monospace";
}

function accentByVariant(variant) {
  return '#1f6a4a';
}

function panelByVariant(variant) {
  return '#f5f1e8';
}

function accentFromTone(tone, fallbackAccent) {
  const map = {
    austere: '#5c5c5c',
    lyrical: '#d4547c',
    dramatic: '#c73a4a',
    analytic: '#1f6a4a',
    intimate: '#c73a4a'
  };
  return map[tone] || fallbackAccent;
}

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n\n');
}

export default function PixelTemplate({ data, text, title, settings, variant = 'minimal' }) {
  const s = settings || {};
  const baseAccent = s.accent_color || accentByVariant(variant);
  const accent = accentFromTone(data?.tone, baseAccent);

  const cssVars = {
    '--bg': s.background_color || '#fffef9',
    '--accent': accent,
    '--panel': s.panel_color || panelByVariant(variant),
    '--pixel-heading-font': createFontStack(s.heading_font_family || headingFontFromTypography(data?.typography_mode)),
    '--pixel-body-font': createFontStack(s.body_font_family || bodyFontFromTypography(data?.typography_mode)),
    '--text': s.text_color || '#0a0a08',
    '--heading': s.heading_color || '#0a0a08',
    '--border': s.border_color || '#2a2a28'
  };

  const bodyText = splitParagraphs(text || '');
  const highlights = Array.isArray(data?.highlight_lines) ? data.highlight_lines : [];

  const titleStyle = {
    fontSize: s.heading_font_size || '24px',
    fontWeight: s.heading_font_weight || 700
  };

  const metaStyle = {
    fontSize: s.meta_font_size || '11px'
  };

  const dekStyle = {
    fontSize: s.dek_font_size || '12px'
  };

  const bodyStyle = {
    fontSize: s.body_font_size || '14px',
    fontWeight: s.body_font_weight || 400,
    lineHeight: s.line_height || 1.6
  };

  return (
    <article className={`pixel-container pixel-variant-${variant}`} style={cssVars}>
      <div className="pixel-column">
        <div className="pixel-box">
          <p className="pixel-meta" style={metaStyle}>ADVOCATE</p>
          <h1 className="pixel-title" style={titleStyle}>{title?.trim() || data?.title_variant || 'Untitled'}</h1>
          <p className="pixel-dek" style={dekStyle}>{data?.dek || ''}</p>
        </div>

        {data?.pull_quote ? <blockquote className="pixel-quote" style={bodyStyle}>{data.pull_quote}</blockquote> : null}

        <div className="pixel-divider" />

        <div className="pixel-box">
          <p className="pixel-body" style={bodyStyle}>{bodyText}</p>
        </div>

        {highlights.length > 0 ? (
          <div className="pixel-box">
            <p className="pixel-meta" style={metaStyle}>HIGHLIGHTS</p>
            {highlights.map((line, idx) => (
              <p key={`${idx}-${line.slice(0, 14)}`} style={bodyStyle}>
                <span className="pixel-highlight">{line}</span>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
