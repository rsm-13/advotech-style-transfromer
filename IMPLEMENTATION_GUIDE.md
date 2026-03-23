# Dynamic Google Fonts Refactoring - Implementation Guide

## Overview
The project now supports **dynamic font selection using a curated Google Fonts registry**. The AI chooses fonts only from validated, loadable sources per theme.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Input (Text)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend: /server/index.js                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Import FONT_REGISTRY from fonts/fontRegistry.js │   │
│  │ 2. Build prompt with font constraints              │   │
│  │ 3. Call Groq API (constrained to registry fonts)   │   │
│  │ 4. Validate returned fonts against registry        │   │
│  │ 5. Return style plan with validated fonts          │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Frontend: /client/src/App.jsx                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Receive style plan from API                      │   │
│  │ 2. useEffect: Call preloadFonts(theme_settings)    │   │
│  │ 3. Fonts load from Google Fonts CDN                 │   │
│  │ 4. Fonts available before template render           │   │
│  │ 5. Pass settings to selected template               │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Frontend: /client/src/components/*Template           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Import createFontStack utility                   │   │
│  │ 2. Wrap font families: createFontStack(fontName)   │   │
│  │ 3. Apply to heading, body, meta styles              │   │
│  │ 4. Render with dynamic fonts loaded from Google     │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
                  ┌──────────────────┐
                  │  Visual Output   │
                  │ with Typography  │
                  └──────────────────┘
```

---

## Key Files

### 1. Font Registry
**File:** `/fonts/fontRegistry.js`

```javascript
export const FONT_REGISTRY = {
  romantic: {
    heading: ['Playfair Display', 'Cormorant Garamond', 'Bodoni Moda'],
    body: ['EB Garamond', 'Libre Baskerville', 'Cormorant Garamond'],
    accent: ['Allura', 'Tangerine']
  },
  tech: {
    heading: ['IBM Plex Mono', 'JetBrains Mono', 'Space Mono'],
    body: ['IBM Plex Mono', 'Source Code Pro', 'Fira Code'],
    accent: ['IBM Plex Mono']
  },
  // ... 7 more themes
}
```

**Functions:**
- `getThemeFonts(theme)` - Get font options for a theme
- `validateFont(theme, category, fontName)` - Validate or fallback
- `formatFontForUrl(fontName)` - Format for Google Fonts API

---

### 2. Backend Font Constraints
**File:** `/server/index.js`

**New Function:**
```javascript
function buildFontConstraintsSection() {
  // Lists all approved fonts per theme
  // Injected into system prompt
  // Tells AI: "You MUST choose from this list only"
}
```

**Updated Prompt:**
```
APPROVED FONT OPTIONS BY THEME:
romantic: heading=[Playfair Display, Cormorant Garamond, ...], body=[...]
tech: heading=[IBM Plex Mono, JetBrains Mono, ...], body=[...]
...

CRITICAL: You MUST choose fonts ONLY from the list above.
Do NOT invent font names.
```

**Updated Validation:**
```javascript
function validateFontChoice(theme, category, fontName) {
  // Now uses validateFont from FONT_REGISTRY
  // Returns valid font or fallback
}
```

---

### 3. Frontend Font Loader
**File:** `/client/src/utils/loadGoogleFonts.js`

**Main Function:**
```javascript
export async function loadGoogleFonts({ bodyFont, headingFont, accentFont }) {
  // Constructs URL:
  // https://fonts.googleapis.com/css2?family=Font1:wght@400;500;700&family=Font2:wght@...
  // Injects <link> tag into document.head
  // Returns Promise (resolves when loaded)
}
```

**Font Stack Helper:**
```javascript
export function createFontStack(fontName, fallback = 'serif') {
  // Returns: "Font Name", serif
  // Or: "Font Name", monospace (if Mono detected)
  // Safe rendering if font fails
}
```

**Preload Helper:**
```javascript
export async function preloadFonts(settings) {
  // Call immediately after AI response
  // Preloads fonts before template render
}
```

---

### 4. App Integration
**File:** `/client/src/App.jsx`

```javascript
import { preloadFonts } from './utils/loadGoogleFonts';

// ...

// Preload fonts when result changes
useEffect(() => {
  if (result?.theme_settings) {
    preloadFonts(result.theme_settings).catch(err => {
      console.warn('Font preload error:', err);
    });
  }
}, [result]);
```

**Flow:**
1. User submits text
2. API responds with `stylePlan`
3. `setResult(data.stylePlan)`
4. `useEffect` triggers
5. `preloadFonts()` loads Google Fonts
6. Template renders with dynamic fonts

---

### 5. Template Updates
**All 9 Components Updated:**
- MinimalistTemplate.jsx
- TechTemplate.jsx 
- RomanticTemplate.jsx
- PapyrusTemplate.jsx
- SlateTemplate.jsx
- WoodlandTemplate.jsx
- PixelTemplate.jsx
- PrintNewspaperTemplate.jsx
- OnlineNewspaperTemplate.jsx

**Pattern:**
```javascript
import { createFontStack } from '../utils/loadGoogleFonts';

// Before:
const titleStyle = {
  fontFamily: s.heading_font_family || 'Inter'  // ❌ No fallback
};

// After:
const titleStyle = {
  fontFamily: createFontStack(s.heading_font_family || 'Inter')  // ✓ Safe fallback
};
```

---

## Validation & Safety

### Backend Validation
```javascript
// validateThemeSettings() calls validateFontChoice()
// for each font (body, heading, meta)
// Returns: Valid font from registry OR first font in category
```

### Frontend Fallbacks
```javascript
// createFontStack always provides:
// "Font Name", serif    (default)
// "Font Name", monospace (if Mono-tagged font)
```

### Google Fonts Link Prevention
```javascript
// loadGoogleFonts tracks loaded fonts
// Avoids duplicate <link> tags
// Multiple renders = same fonts loaded once
```

---

## Font Registry by Theme

| Theme | Heading Fonts | Body Fonts | Accent Fonts |
|-------|---------------|-----------|-------------|
| **romantic** | Playfair Display, Cormorant Garamond, Bodoni Moda | EB Garamond, Libre Baskerville, Cormorant Garamond | Allura, Tangerine |
| **papyrus** | IM Fell English, Cinzel, Cormorant Unicase | Cardo, Alegreya, Crimson Pro | Cinzel Decorative |
| **tech** | IBM Plex Mono, JetBrains Mono, Space Mono | IBM Plex Mono, Source Code Pro, Fira Code | IBM Plex Mono |
| **minimalist** | Inter, Manrope, DM Sans | Inter, Source Serif 4, Libre Baskerville | Inter |
| **woodland** | Cormorant Garamond, Alegreya, Libre Baskerville | Alegreya, Crimson Pro, Lora | Libre Baskerville |
| **slate** | Newsreader, Crimson Text, Lora | Inter, Source Serif 4, Crimson Text | Inter |
| **pixel** | Press Start 2P, Space Mono, Courier Prime | Courier Prime, JetBrains Mono, IBM Plex Mono | Press Start 2P |
| **print_newspaper** | Old Standard TT, Libre Baskerville, Lora | Libre Baskerville, Cormorant Garamond, Lora | Old Standard TT |
| **online_newspaper** | Source Serif 4, Crimson Text, Lora | Source Serif 4, Inter, Crimson Text | Inter |

---

## Performance Optimization

### Font Preloading
```javascript
// Fonts load BEFORE template renders
// CSS URL injection happens immediately
// No rendering delays
// ~3s max timeout (still renders if slow)
```

### Weight Strategy
```javascript
// Only load weights actually used:
// 400 (regular) - all fonts
// 500 (medium) - headings
// 700 (bold) - headings
// Reduces CDN requests
```

### Deduplication
```javascript
// Tracks loaded fonts in Set
// Same fonts across multiple pieces?
// Already cached in browser + in memory
```

---

## Testing Results

### Test 1: Romantic Text
```
Input: "In the heart of darkness lies the ghosts of our loves..."
Result:
  theme: romantic
  body_font: EB Garamond ✓ (in romantic registry)
  heading_font: Playfair Display ✓ (in romantic registry)
```

### Test 2: Tech Text  
```
Input: "The system attempts to parse JSON. Algorithm complexity: O(n log n)..."
Result:
  theme: tech
  body_font: Source Code Pro ✓ (in tech registry)
  heading_font: IBM Plex Mono ✓ (in tech registry)
```

---

## Adding New Fonts

To add a new font to a theme:

1. **Edit:** `/fonts/fontRegistry.js`
2. **Add font to theme:**
   ```javascript
   romantic: {
     heading: ['Playfair Display', 'NEW FONT HERE', 'Bodoni Moda'],
     // ...
   }
   ```
3. **Verify:** Font exists on [Google Fonts](https://fonts.google.com)
4. **Server restarts** - New font available immediately
5. **No frontend changes needed** - Font loader handles it

---

## Troubleshooting

### Fonts Not Loading?
1. Check browser Network tab for Google Fonts CSS URL
2. Verify font name matches Google Fonts exactly
3. Check `loadedFonts` Set in browser console

### Wrong Font Chosen?
1. Check backend validation in `/server/index.js`
2. Verify font is in FONT_REGISTRY for theme
3. Check Groq API input constraints

### Template Not Styled?
1. Verify `createFontStack` import in template
2. Check `settings` object is passed from App
3. Browser DevTools: inspect `fontFamily` styles

---

## Summary

✓ **Centralized Registry:** Single source of truth  
✓ **AI Constrained:** Only chooses from registry fonts  
✓ **Dynamic Loading:** Google Fonts CSS injected at runtime  
✓ **Safe Fallbacks:** Font stacks with serif/monospace fallbacks  
✓ **Performance:** Fonts preload before rendering  
✓ **No Invention:** AI cannot create new font names  
✓ **Easy Maintenance:** Add fonts by editing one file  

The system is now robust, performant, and maintains typography integrity across all themes!
