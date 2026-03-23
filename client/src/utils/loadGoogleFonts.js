/**
 * Dynamic Google Fonts Loader
 * 
 * Constructs and injects Google Fonts CSS URLs into the document.
 * Supports multiple fonts with weight variants and fallback handling.
 */

const loadedFonts = new Set();

/**
 * Load fonts from Google Fonts
 * @param {Object} options - Font configuration
 * @param {string} options.bodyFont - Body text font family
 * @param {string} options.headingFont - Heading font family
 * @param {string} [options.accentFont] - Optional accent font family
 * @returns {Promise} Resolves when fonts are loaded
 */
export async function loadGoogleFonts({ bodyFont, headingFont, accentFont }) {
  const fonts = Array.from(new Set([bodyFont, headingFont, accentFont].filter(Boolean)));
  
  if (fonts.length === 0) {
    return Promise.resolve();
  }

  // Check which fonts are already loaded
  const newFonts = fonts.filter(font => !loadedFonts.has(font));
  
  if (newFonts.length === 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    // Build Google Fonts URL with weight variants
    const fontParams = newFonts
      .map(font => {
        const encoded = encodeFont(font);
        // Include common weights: 400, 500, 700
        return `${encoded}:wght@400;500;700`;
      })
      .join('&family=');

    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontParams}&display=swap`;

    // Check if link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
      newFonts.forEach(font => loadedFonts.add(font));
      resolve();
      return;
    }

    // Create and inject link tag
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    
    // Resolve when fonts are loaded or timeout
    const timeoutId = setTimeout(() => {
      newFonts.forEach(font => loadedFonts.add(font));
      resolve();
    }, 3000);

    link.onload = () => {
      clearTimeout(timeoutId);
      newFonts.forEach(font => loadedFonts.add(font));
      resolve();
    };

    link.onerror = () => {
      clearTimeout(timeoutId);
      // Still mark as loaded to avoid retry loops
      newFonts.forEach(font => loadedFonts.add(font));
      console.warn(`Failed to load fonts: ${newFonts.join(', ')}`);
      resolve();
    };

    document.head.appendChild(link);
  });
}

/**
 * Encode font name for Google Fonts URL
 * "Font Name" becomes "Font+Name"
 * @param {string} fontName - Font family name
 * @returns {string} URL-encoded name
 */
function encodeFont(fontName) {
  return fontName.replace(/\s+/g, '+');
}

/**
 * Create a font family string with fallback
 * @param {string} fontName - Primary font family
 * @param {string} [fallback='serif'] - Fallback generic family
 * @returns {string} Font family CSS value
 */
export function createFontStack(fontName, fallback = 'serif') {
  if (!fontName) return fallback;
  
  // Add generic fallback
  const isMono = fontName.includes('Mono') || fontName.includes('Courier');
  const defaultFallback = isMono ? 'monospace' : fallback;
  
  return `"${fontName}", ${defaultFallback}`;
}

/**
 * Preload fonts for better performance
 * Call this immediately after getting AI response
 * @param {Object} settings - Theme settings from AI response
 * @returns {Promise} Resolves when fonts are preloaded
 */
export async function preloadFonts(settings) {
  if (!settings) return Promise.resolve();

  return loadGoogleFonts({
    bodyFont: settings.body_font_family,
    headingFont: settings.heading_font_family,
    accentFont: settings.accent_font_family
  });
}

/**
 * Get list of currently loaded fonts
 * @returns {string[]} Array of loaded font names
 */
export function getLoadedFonts() {
  return Array.from(loadedFonts);
}
