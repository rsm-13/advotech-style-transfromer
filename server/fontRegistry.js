/**
 * FONT REGISTRY - Curated Google Fonts
 *
 * Local copy for serverless deployment stability.
 */

export const FONT_REGISTRY = {
  romantic: {
    heading: ['Dancing Script', 'Tangerine', 'Allura'],
    body: ['EB Garamond', 'Libre Baskerville', 'Cormorant Garamond'],
    accent: ['Allura', 'Tangerine']
  },
  papyrus: {
    heading: ['IM Fell English', 'Cinzel', 'Cormorant Unicase'],
    body: ['Cardo', 'Alegreya', 'Crimson Pro'],
    accent: ['Cinzel Decorative']
  },
  tech: {
    heading: ['IBM Plex Mono', 'JetBrains Mono', 'Space Mono'],
    body: ['IBM Plex Mono', 'Source Code Pro', 'Fira Code'],
    accent: ['IBM Plex Mono']
  },
  minimalist: {
    heading: ['Inter', 'Manrope', 'DM Sans'],
    body: ['Inter', 'Source Serif 4', 'Libre Baskerville'],
    accent: ['Inter']
  },
  woodland: {
    heading: ['Dosis', 'Cormorant Garamond', 'Alegreya'],
    body: ['Dosis', 'Alegreya', 'Crimson Pro'],
    accent: ['Dosis']
  },
  slate: {
    heading: ['Newsreader', 'Crimson Text', 'Lora'],
    body: ['Inter', 'Source Serif 4', 'Crimson Text'],
    accent: ['Inter']
  },
  pixel: {
    heading: ['Press Start 2P', 'Courier Prime', 'Space Mono'],
    body: ['Press Start 2P', 'Courier Prime', 'JetBrains Mono'],
    accent: ['Press Start 2P']
  },
  print_newspaper: {
    heading: ['Old Standard TT', 'Libre Baskerville', 'Lora'],
    body: ['Libre Baskerville', 'Cormorant Garamond', 'Lora'],
    accent: ['Old Standard TT']
  },
  online_newspaper: {
    heading: ['Source Serif 4', 'Crimson Text', 'Lora'],
    body: ['Source Serif 4', 'Inter', 'Crimson Text'],
    accent: ['Inter']
  }
};

export function getThemeFonts(theme) {
  return FONT_REGISTRY[theme] || FONT_REGISTRY.minimalist;
}

export function validateFont(theme, category, fontName) {
  const themeFonts = getThemeFonts(theme);
  const categoryFonts = themeFonts[category] || [];

  if (categoryFonts.includes(fontName)) {
    return fontName;
  }

  return categoryFonts[0] || (category === 'heading' ? 'Georgia' : 'Georgia');
}

export function formatFontForUrl(fontName) {
  return fontName.replace(/\s+/g, '+');
}

export function getAllThemeFonts() {
  const allFonts = new Set();
  Object.values(FONT_REGISTRY).forEach(theme => {
    Object.values(theme).forEach(categoryFonts => {
      if (Array.isArray(categoryFonts)) {
        categoryFonts.forEach(font => allFonts.add(font));
      }
    });
  });
  return allFonts;
}
