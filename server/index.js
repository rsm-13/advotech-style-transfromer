import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { FONT_REGISTRY, getThemeFonts, validateFont } from '../fonts/fontRegistry.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
if (!process.env.GROQ_API_KEY) {
  dotenv.config({ path: resolve(__dirname, '../.env') });
}

const app = express();

const PORT = Number(process.env.PORT) || 8787;
const GROQ_BASE_URL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ============================================================================
// THEME CONFIGURATION & FONT REGISTRY
// ============================================================================

const VALID_THEMES = [
  'pixel',
  'papyrus',
  'minimalist',
  'print_newspaper',
  'online_newspaper',
  'tech',
  'slate',
  'woodland',
  'romantic'
];

const FONT_OPTIONS = {
  pixel: {
    heading: ['Press Start 2P', 'Courier New'],
    body: ['Courier New', 'Press Start 2P'],
    meta: ['Courier New']
  },
  papyrus: {
    heading: ['IM Fell English', 'Cormorant Unicase', 'Cinzel Decorative'],
    body: ['Cardo', 'Cormorant Garamond', 'Alegreya'],
    meta: ['Cormorant SC', 'Libre Baskerville']
  },
  minimalist: {
    heading: ['Inter', 'Manrope', 'DM Sans', 'Recoleta'],
    body: ['Inter', 'Source Serif 4', 'Libre Baskerville'],
    meta: ['Inter', 'DM Sans']
  },
  print_newspaper: {
    heading: ['Old Standard TT', 'Libre Baskerville', 'Recoleta'],
    body: ['Libre Baskerville', 'Lora', 'Cormorant Garamond'],
    meta: ['Inter', 'Roboto']
  },
  online_newspaper: {
    heading: ['Source Serif 4', 'Crimson Text', 'Lora'],
    body: ['Source Serif 4', 'Crimson Text', 'Inter'],
    meta: ['Source Sans 3', 'Inter', 'Roboto']
  },
  tech: {
    heading: ['IBM Plex Mono', 'JetBrains Mono', 'Space Mono'],
    body: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code'],
    meta: ['IBM Plex Mono', 'Inter']
  },
  slate: {
    heading: ['Newsreader', 'Crimson Text', 'Lora'],
    body: ['Newsreader', 'Inter', 'Crimson Text'],
    meta: ['Inter', 'Roboto']
  },
  woodland: {
    heading: ['Cormorant Garamond', 'Alegreya', 'Lora'],
    body: ['Cormorant Garamond', 'Alegreya', 'Lora'],
    meta: ['Inter', 'Roboto']
  },
  romantic: {
    heading: ['Playfair Display', 'Cormorant Garamond', 'Bodoni Moda'],
    body: ['Cormorant Garamond', 'Libre Baskerville', 'EB Garamond'],
    meta: ['Inter', 'Libre Franklin']
  }
};

const VALID_DIVIDER_STYLES = ['minimal', 'ornate', 'dashed', 'solid', 'double'];
const VALID_SPACING_SCALES = ['tight', 'comfortable', 'airy', 'generous'];
const VALID_QUOTE_EMPHASES = ['subtle', 'soft', 'moderate', 'strong'];
const VALID_ALIGNMENTS = ['left', 'center', 'right'];
const VALID_COLUMN_WIDTHS = ['narrow', 'medium', 'wide', 'full'];

// Default theme settings per theme
const DEFAULT_THEME_SETTINGS = {
  pixel: {
    background_color: '#fffef9',
    panel_color: '#f5f5f0',
    text_color: '#0a0a08',
    muted_color: '#7a7a76',
    heading_color: '#0a0a08',
    accent_color: '#1f6a4a',
    border_color: '#2a2a28',
    body_font_family: 'Courier New',
    heading_font_family: 'Press Start 2P',
    meta_font_family: 'Courier New',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '14px',
    heading_font_size: '24px',
    dek_font_size: '12px',
    meta_font_size: '11px',
    line_height: 1.6,
    letter_spacing: '0px',
    quote_emphasis: 'moderate',
    divider_style: 'solid',
    content_alignment: 'left',
    column_width: 'medium',
    spacing_scale: 'comfortable',
    use_italics_for_quotes: false,
    use_bold_for_headings: true,
    use_underline_accents: false
  },
  papyrus: {
    background_color: '#f4ecd8',
    panel_color: '#faf7ee',
    text_color: '#2c1b12',
    muted_color: '#8b7355',
    heading_color: '#2c1b12',
    accent_color: '#6d4c41',
    border_color: '#d9c5b1',
    body_font_family: 'Alegreya',
    heading_font_family: 'Cinzel Decorative',
    meta_font_family: 'Cormorant SC',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '17px',
    heading_font_size: '36px',
    dek_font_size: '16px',
    meta_font_size: '12px',
    line_height: 1.8,
    letter_spacing: '1px',
    quote_emphasis: 'strong',
    divider_style: 'ornate',
    content_alignment: 'center',
    column_width: 'narrow',
    spacing_scale: 'airy',
    use_italics_for_quotes: true,
    use_bold_for_headings: true,
    use_underline_accents: false
  },
  minimalist: {
    background_color: '#f6f6f4',
    panel_color: '#fefefe',
    text_color: '#1a1a1a',
    muted_color: '#999999',
    heading_color: '#000000',
    accent_color: '#555555',
    border_color: '#e0e0e0',
    body_font_family: 'Inter',
    heading_font_family: 'Inter',
    meta_font_family: 'Inter',
    body_font_weight: 400,
    heading_font_weight: 300,
    body_font_size: '16px',
    heading_font_size: '32px',
    dek_font_size: '16px',
    meta_font_size: '12px',
    line_height: 1.7,
    letter_spacing: '0px',
    quote_emphasis: 'subtle',
    divider_style: 'minimal',
    content_alignment: 'center',
    column_width: 'narrow',
    spacing_scale: 'generous',
    use_italics_for_quotes: false,
    use_bold_for_headings: false,
    use_underline_accents: false
  },
  print_newspaper: {
    background_color: '#fbfaf6',
    panel_color: '#ffffff',
    text_color: '#1a1a1a',
    muted_color: '#666666',
    heading_color: '#000000',
    accent_color: '#333333',
    border_color: '#cccccc',
    body_font_family: 'Libre Baskerville',
    heading_font_family: 'Old Standard TT',
    meta_font_family: 'Roboto',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '17px',
    heading_font_size: '48px',
    dek_font_size: '18px',
    meta_font_size: '11px',
    line_height: 1.75,
    letter_spacing: '0px',
    quote_emphasis: 'strong',
    divider_style: 'dashed',
    content_alignment: 'left',
    column_width: 'medium',
    spacing_scale: 'comfortable',
    use_italics_for_quotes: true,
    use_bold_for_headings: true,
    use_underline_accents: false
  },
  online_newspaper: {
    background_color: '#ffffff',
    panel_color: '#f9f9f9',
    text_color: '#121212',
    muted_color: '#757575',
    heading_color: '#000000',
    accent_color: '#1976d2',
    border_color: '#e0e0e0',
    body_font_family: 'Source Serif 4',
    heading_font_family: 'Source Serif 4',
    meta_font_family: 'Source Sans 3',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '18px',
    heading_font_size: '42px',
    dek_font_size: '18px',
    meta_font_size: '12px',
    line_height: 1.7,
    letter_spacing: '0px',
    quote_emphasis: 'moderate',
    divider_style: 'solid',
    content_alignment: 'center',
    column_width: 'narrow',
    spacing_scale: 'comfortable',
    use_italics_for_quotes: true,
    use_bold_for_headings: true,
    use_underline_accents: false
  },
  tech: {
    background_color: '#0d1117',
    panel_color: '#161b22',
    text_color: '#c9d1d9',
    muted_color: '#8b949e',
    heading_color: '#79c0ff',
    accent_color: '#58a6ff',
    border_color: '#30363d',
    body_font_family: 'JetBrains Mono',
    heading_font_family: 'JetBrains Mono',
    meta_font_family: 'JetBrains Mono',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '14px',
    heading_font_size: '20px',
    dek_font_size: '13px',
    meta_font_size: '12px',
    line_height: 1.5,
    letter_spacing: '0px',
    quote_emphasis: 'moderate',
    divider_style: 'dashed',
    content_alignment: 'left',
    column_width: 'medium',
    spacing_scale: 'tight',
    use_italics_for_quotes: false,
    use_bold_for_headings: true,
    use_underline_accents: false
  },
  slate: {
    background_color: '#0f1115',
    panel_color: '#15191e',
    text_color: '#b5becb',
    muted_color: '#7d87a2',
    heading_color: '#e8eef0',
    accent_color: '#8b9ac6',
    border_color: '#2a2d33',
    body_font_family: 'Newsreader',
    heading_font_family: 'Newsreader',
    meta_font_family: 'Inter',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '17px',
    heading_font_size: '40px',
    dek_font_size: '16px',
    meta_font_size: '12px',
    line_height: 1.75,
    letter_spacing: '0px',
    quote_emphasis: 'soft',
    divider_style: 'minimal',
    content_alignment: 'center',
    column_width: 'narrow',
    spacing_scale: 'airy',
    use_italics_for_quotes: true,
    use_bold_for_headings: false,
    use_underline_accents: false
  },
  woodland: {
    background_color: '#ede8e0',
    panel_color: '#f5ede2',
    text_color: '#201813',
    muted_color: '#8b7766',
    heading_color: '#2a1f18',
    accent_color: '#8b5e3c',
    border_color: '#c7b9a8',
    body_font_family: 'Cormorant Garamond',
    heading_font_family: 'Cormorant Garamond',
    meta_font_family: 'Inter',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '18px',
    heading_font_size: '44px',
    dek_font_size: '17px',
    meta_font_size: '12px',
    line_height: 1.85,
    letter_spacing: '0.5px',
    quote_emphasis: 'moderate',
    divider_style: 'ornate',
    content_alignment: 'center',
    column_width: 'narrow',
    spacing_scale: 'airy',
    use_italics_for_quotes: true,
    use_bold_for_headings: false,
    use_underline_accents: false
  },
  romantic: {
    background_color: '#f8f4f2',
    panel_color: '#fff8f6',
    text_color: '#2a1f1c',
    muted_color: '#7d5f5a',
    heading_color: '#4a2f2a',
    accent_color: '#b35a5a',
    border_color: '#e6d4d0',
    body_font_family: 'Cormorant Garamond',
    heading_font_family: 'Playfair Display',
    meta_font_family: 'Inter',
    body_font_weight: 400,
    heading_font_weight: 700,
    body_font_size: '17px',
    heading_font_size: '42px',
    dek_font_size: '18px',
    meta_font_size: '12px',
    line_height: 1.8,
    letter_spacing: '0px',
    quote_emphasis: 'strong',
    divider_style: 'ornate',
    content_alignment: 'center',
    column_width: 'narrow',
    spacing_scale: 'airy',
    use_italics_for_quotes: true,
    use_bold_for_headings: true,
    use_underline_accents: false
  }
};

// ============================================================================
// PROMPT BUILDER & VALIDATION
// ============================================================================

function buildFontConstraintsSection() {
  const constraints = [];
  
  for (const [theme, fonts] of Object.entries(FONT_REGISTRY)) {
    constraints.push(
      `${theme}: heading=[${fonts.heading.join(', ')}], body=[${fonts.body.join(', ')}]`
    );
  }
  
  return `APPROVED FONT OPTIONS BY THEME:
${constraints.join('\n')}

CRITICAL: You MUST choose fonts ONLY from the list above for your selected theme.
Do NOT invent font names. Do NOT suggest fonts not in this list.
If a font is not listed, pick the first option from its category.`;
}

function buildAnalysisPrompt(text) {
  return `You are an editorial art-direction engine for literary presentation.

You will be given a literary piece.
Your job is to:
1. Choose the best presentation theme from the approved theme list
2. Analyze the piece's mood, tone, structure, and material feel
3. Choose specific typographic and visual settings within that theme
4. Return structured JSON only

Do NOT generate HTML, React, CSS, or code.
Do NOT invent new themes.
Do NOT invent font names.
Do NOT return arbitrary unbounded style values.

Choose ONE theme from these options:
- pixel: retro 8-bit green terminal archive
- papyrus: aged manuscript with calligraphy
- minimalist: ultra-clean modern editorial
- print_newspaper: traditional broadsheet newspaper
- online_newspaper: modern web article style
- tech: dark developer terminal aesthetic
- slate: premium dark editorial reading app
- woodland: warm earth tones with organic feel
- romantic: lyrical, expressive, soft palette

${buildFontConstraintsSection()}

Return ONLY valid JSON with this structure:

{
  "theme": "pixel|papyrus|minimalist|print_newspaper|online_newspaper|tech|slate|woodland|romantic",
  "reasoning_summary": "One sentence explaining why this theme fits the piece.",
  "tone": "austere|lyrical|dramatic|analytic|intimate",
  "density": "sparse|medium|dense",
  "section_breaks": boolean,
  "title_variant": "string (suggested title based on piece content)",
  "dek": "string (one-sentence editorial subheading)",
  "pull_quote": "string (short excerpt from the text itself)",
  "highlight_lines": ["string", "string"] (1-3 key excerpts from text),
  "theme_settings": {
    "body_font_family": "approved font for chosen theme",
    "heading_font_family": "approved font for chosen theme",
    "meta_font_family": "approved font for chosen theme",
    "background_color": "#hex",
    "panel_color": "#hex",
    "text_color": "#hex",
    "muted_color": "#hex",
    "heading_color": "#hex",
    "accent_color": "#hex",
    "border_color": "#hex",
    "body_font_weight": 400|500|700,
    "heading_font_weight": 400|500|700,
    "body_font_size": "14px|16px|17px|18px|20px",
    "heading_font_size": "24px|32px|36px|40px|42px|44px|48px",
    "dek_font_size": "12px|14px|16px|17px|18px",
    "meta_font_size": "11px|12px|13px|14px",
    "line_height": 1.5|1.6|1.7|1.75|1.8|1.85,
    "letter_spacing": "0px|0.5px|1px",
    "quote_emphasis": "subtle|soft|moderate|strong",
    "divider_style": "minimal|ornate|dashed|solid|double",
    "content_alignment": "left|center|right",
    "column_width": "narrow|medium|wide|full",
    "spacing_scale": "tight|comfortable|airy|generous",
    "use_italics_for_quotes": boolean,
    "use_bold_for_headings": boolean,
    "use_underline_accents": boolean
  }
}

IMPORTANT RULES:
- Only choose fonts from the approved list for the selected theme
- Do NOT invent or suggest fonts not in the registry
- Colors should form a cohesive palette that supports the theme
- Font sizes must be reasonable and readable
- Line height values should be between 1.5 and 1.9
- All boolean values must be true or false
- All string values must be intentional and text-sensitive
- Avoid defaulting to the same combination for different pieces

Text to analyze:
${text}`;
}

function validateFontChoice(theme, category, fontFamily) {
  // Use the font registry validator
  // Note: meta_font_family falls back to body_font_family since registry only has heading/body/accent
  const registryCategory = category === 'meta' ? 'body' : category;
  return validateFont(theme, registryCategory, fontFamily);
}

function validateThemeSettings(theme, settings) {
  if (!settings || typeof settings !== 'object') {
    return DEFAULT_THEME_SETTINGS[theme] || DEFAULT_THEME_SETTINGS.minimalist;
  }

  const sanitized = { ...DEFAULT_THEME_SETTINGS[theme] };

  // Validate font families
  if (typeof settings.body_font_family === 'string') {
    sanitized.body_font_family = validateFontChoice(theme, 'body', settings.body_font_family);
  }
  if (typeof settings.heading_font_family === 'string') {
    sanitized.heading_font_family = validateFontChoice(theme, 'heading', settings.heading_font_family);
  }
  if (typeof settings.meta_font_family === 'string') {
    sanitized.meta_font_family = validateFontChoice(theme, 'meta', settings.meta_font_family);
  }

  // Validate hex colors
  const validHexColor = (color) => typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color);
  if (validHexColor(settings.background_color)) sanitized.background_color = settings.background_color;
  if (validHexColor(settings.panel_color)) sanitized.panel_color = settings.panel_color;
  if (validHexColor(settings.text_color)) sanitized.text_color = settings.text_color;
  if (validHexColor(settings.muted_color)) sanitized.muted_color = settings.muted_color;
  if (validHexColor(settings.heading_color)) sanitized.heading_color = settings.heading_color;
  if (validHexColor(settings.accent_color)) sanitized.accent_color = settings.accent_color;
  if (validHexColor(settings.border_color)) sanitized.border_color = settings.border_color;

  // Validate font weights
  if ([400, 500, 700].includes(settings.body_font_weight)) sanitized.body_font_weight = settings.body_font_weight;
  if ([400, 500, 700].includes(settings.heading_font_weight)) sanitized.heading_font_weight = settings.heading_font_weight;

  // Validate pixel sizes
  const validSizes = {
    body: ['14px', '16px', '17px', '18px', '20px'],
    heading: ['24px', '32px', '36px', '40px', '42px', '44px', '48px'],
    dek: ['12px', '14px', '16px', '17px', '18px'],
    meta: ['11px', '12px', '13px', '14px']
  };
  if (validSizes.body.includes(settings.body_font_size)) sanitized.body_font_size = settings.body_font_size;
  if (validSizes.heading.includes(settings.heading_font_size)) sanitized.heading_font_size = settings.heading_font_size;
  if (validSizes.dek.includes(settings.dek_font_size)) sanitized.dek_font_size = settings.dek_font_size;
  if (validSizes.meta.includes(settings.meta_font_size)) sanitized.meta_font_size = settings.meta_font_size;

  // Validate line height
  const validLineHeights = [1.5, 1.6, 1.7, 1.75, 1.8, 1.85];
  if (validLineHeights.includes(settings.line_height)) sanitized.line_height = settings.line_height;

  // Validate letter spacing
  const validLetterSpacings = ['0px', '0.5px', '1px'];
  if (validLetterSpacings.includes(settings.letter_spacing)) sanitized.letter_spacing = settings.letter_spacing;

  // Validate enums
  if (VALID_QUOTE_EMPHASES.includes(settings.quote_emphasis)) sanitized.quote_emphasis = settings.quote_emphasis;
  if (VALID_DIVIDER_STYLES.includes(settings.divider_style)) sanitized.divider_style = settings.divider_style;
  if (VALID_ALIGNMENTS.includes(settings.content_alignment)) sanitized.content_alignment = settings.content_alignment;
  if (VALID_COLUMN_WIDTHS.includes(settings.column_width)) sanitized.column_width = settings.column_width;
  if (VALID_SPACING_SCALES.includes(settings.spacing_scale)) sanitized.spacing_scale = settings.spacing_scale;

  // Validate booleans
  if (typeof settings.use_italics_for_quotes === 'boolean') sanitized.use_italics_for_quotes = settings.use_italics_for_quotes;
  if (typeof settings.use_bold_for_headings === 'boolean') sanitized.use_bold_for_headings = settings.use_bold_for_headings;
  if (typeof settings.use_underline_accents === 'boolean') sanitized.use_underline_accents = settings.use_underline_accents;

  return sanitized;
}

function normalizeModelOutput(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const trimmed = raw.trim();

  // Try to extract JSON from markdown code fence
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch?.[1]) return fenceMatch[1].trim();

  // Try to find JSON object in the response
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function parseStyleJson(rawContent) {
  const normalized = normalizeModelOutput(rawContent);
  
  if (!normalized || normalized.length === 0) {
    throw new Error('Response was empty after normalization.');
  }

  let parsed;
  try {
    parsed = JSON.parse(normalized);
  } catch (e) {
    // Try extracting JSON from the normalized content
    const firstBrace = normalized.indexOf('{');
    const lastBrace = normalized.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error(`No JSON object found in model response. Got: "${normalized.substring(0, 200)}"`);
    }

    const jsonCandidate = normalized.slice(firstBrace, lastBrace + 1);
    try {
      parsed = JSON.parse(jsonCandidate);
    } catch (parseErr) {
      throw new Error(`JSON parse failed: ${parseErr.message}. Input: "${jsonCandidate.substring(0, 300)}"`);
    }
  }

  // Validate theme
  if (!parsed.theme || !VALID_THEMES.includes(parsed.theme)) {
    throw new Error(`Invalid or missing theme. Must be one of: ${VALID_THEMES.join(', ')}`);
  }

  const theme = parsed.theme;

  // Validate required keys
  const requiredKeys = [
    'theme',
    'reasoning_summary',
    'tone',
    'density',
    'section_breaks',
    'title_variant',
    'dek',
    'pull_quote',
    'highlight_lines',
    'theme_settings'
  ];

  for (const key of requiredKeys) {
    if (!(key in parsed)) {
      throw new Error(`Missing required key: ${key}`);
    }
  }

  // Validate tone and density against allowed values
  const allowed = {
    tone: ['austere', 'lyrical', 'dramatic', 'analytic', 'intimate'],
    density: ['sparse', 'medium', 'dense']
  };

  for (const [key, values] of Object.entries(allowed)) {
    if (!values.includes(parsed[key])) {
      throw new Error(`Invalid value for ${key}: ${parsed[key]}`);
    }
  }

  // Validate booleans
  if (typeof parsed.section_breaks !== 'boolean') {
    throw new Error('section_breaks must be boolean.');
  }

  // Validate strings
  if (typeof parsed.pull_quote !== 'string') throw new Error('pull_quote must be a string.');
  if (typeof parsed.title_variant !== 'string') throw new Error('title_variant must be a string.');
  if (typeof parsed.dek !== 'string') throw new Error('dek must be a string.');
  if (typeof parsed.reasoning_summary !== 'string') throw new Error('reasoning_summary must be a string.');

  // Validate highlight_lines
  if (!Array.isArray(parsed.highlight_lines)) {
    throw new Error('highlight_lines must be an array.');
  }

  const normalizedHighlights = parsed.highlight_lines
    .map((line) => (typeof line === 'string' ? line.trim() : ''))
    .filter(Boolean)
    .slice(0, 3);

  if (normalizedHighlights.length === 0) {
    throw new Error('highlight_lines must include at least one excerpt.');
  }

  // Validate and normalize theme_settings
  const themeSettings = validateThemeSettings(theme, parsed.theme_settings);

  return {
    theme,
    reasoning_summary: parsed.reasoning_summary.trim(),
    tone: parsed.tone,
    density: parsed.density,
    section_breaks: parsed.section_breaks,
    title_variant: parsed.title_variant.trim(),
    dek: parsed.dek.trim(),
    pull_quote: parsed.pull_quote.trim(),
    highlight_lines: normalizedHighlights,
    theme_settings: themeSettings
  };
}

app.post('/analyze-style', async (req, res) => {
  try {
    const text = (req.body.text || '').trim();

    if (!text) {
      return res.status(400).json({ error: 'text is required.' });
    }

    const token = process.env.GROQ_API_KEY;
    if (!token) {
      return res.status(500).json({ error: 'GROQ_API_KEY is missing. Add it to your environment.' });
    }

    const prompt = buildAnalysisPrompt(text);

    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: 'You are an editorial art-direction engine. Return valid JSON only. Do not generate code or arbitrary CSS.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1200
      })
    });

    if (!response.ok) {
      const raw = await response.text();
      if (response.status === 401) {
        return res.status(401).json({ error: 'Groq authorization failed (401). Check GROQ_API_KEY.', details: raw.slice(0, 1000) });
      }
      if (response.status === 403) {
        return res.status(403).json({ error: 'Groq forbidden (403). Key may lack model access.', details: raw.slice(0, 1000) });
      }
      return res.status(502).json({ error: `Groq request failed (${response.status}).`, details: raw.slice(0, 1000) });
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      return res.status(502).json({ error: 'Groq returned non-JSON response.', details: jsonErr?.message || String(jsonErr) });
    }

    const rawContent = data?.choices?.[0]?.message?.content || '';

    if (!rawContent) {
      return res.status(502).json({ error: 'Groq returned empty completion content.' });
    }

    let stylePlan;
    try {
      stylePlan = parseStyleJson(rawContent);
    } catch (parseError) {
      return res.status(502).json({
        error: 'Failed to parse model response as JSON.',
        details: parseError?.message || String(parseError),
        rawOutput: rawContent.slice(0, 2000)
      });
    }

    return res.json({ stylePlan });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error.', details: error?.message || String(error) });
  }
});

app.get('/health', (_, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
