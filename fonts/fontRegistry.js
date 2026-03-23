/**
 * FONT REGISTRY - Curated Google Fonts
 * 
 * All fonts are verified to exist on Google Fonts.
 * The AI will only choose from these options.
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

/**
 * Get fonts for a specific theme
 * @param {string} theme - Theme name
 * @returns {Object} Font options for the theme
 */
export function getThemeFonts(theme) {
  return FONT_REGISTRY[theme] || FONT_REGISTRY.minimalist;
}

/**
 * Validate that a font exists in the registry for a theme
 * @param {string} theme - Theme name
 * @param {string} category - Font category: 'heading', 'body', or 'accent'
 * @param {string} fontName - Font family name
 * @returns {string} The valid font name, or fallback if invalid
 */
export function validateFont(theme, category, fontName) {
  const themeFonts = getThemeFonts(theme);
  const categoryFonts = themeFonts[category] || [];
  
  if (categoryFonts.includes(fontName)) {
    return fontName;
  }
  
  // Fallback to first font in category, or generic fallback
  return categoryFonts[0] || (category === 'heading' ? 'Georgia' : 'Georgia');
}

/**
 * Format font names for Google Fonts API
 * Converts "Font Name" to "Font+Name" for URL
 * @param {string} fontName - Font family name
 * @returns {string} URL-encoded font name
 */
export function formatFontForUrl(fontName) {
  return fontName.replace(/\s+/g, '+');
}

/**
 * Get all unique fonts used across all themes
 * Useful for preloading
 * @returns {Set} Unique font names
 */
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
