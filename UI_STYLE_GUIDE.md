# 🎨 UI Design System - Quick Reference

## Components Overview

### New Components

```
Header (sticky)
├─ App Title + Tagline
└─ Tab Nav (Editor | Instructions)

InstructionsPanel
├─ What This Tool Does
├─ How to Use
├─ How Styles Are Chosen
├─ The Themes (grid)
├─ About Typography
└─ Start Writing (CTA)

LoadingState
├─ Animated spinner
└─ Status message
```

### Layout System

```
DESKTOP (> 1000px)
┌─ Header ─────────────────────────┐
├─────────────────┬─────────────────┤
│  Input Panel    │  Output Panel   │
│  (40px gap)     │  (renders theme)│
│                 │                 │
└─────────────────┴─────────────────┘

TABLET (640px - 1000px)
┌─ Header ──────────────────┐
├──────────────────────────┐
│  Input Panel             │
│  (32px gap)              │
│  Output Panel            │
│  (renders theme)         │
└──────────────────────────┘

MOBILE (< 640px)
┌─ Header ──────┐
├──────────────┐
│ Input Panel  │
│ (16px gap)   │
│ Output Panel │
└──────────────┘
```

---

## Typography Scale

```
20px / 600  - App Title, Section Headings
18px / 600  - Input Labels
15px / 400  - Body Text (instructions, content)
14px / 400  - Meta text, hints, hints
13px / 400+ - Small labels, table data
12px / 500  - Tag text, decision labels
11px / 700  - Tiny labels (uppercase)
```

---

## Color System

```
Text Colors:
  #1a1a18   Primary (headings, main text)
  #3a3a32   Body text
  #5a5a52   Decision reasoning
  #6a6a62   Secondary text (meta, hints)
  #8a8a82   Tertiary text (tags, small)

Background Colors:
  #ffffff   Cards, textarea
  #fefdfb   Soft white (textareas, cards light)
  #fbfbf9   Panel backgrounds
  #fafaf8   Main background (page)

Border Colors:
  #d4d3ce   Primary borders
  #e0dfd8   Secondary borders (lighter)
  #c4c3be   Hover state (darker)

Error State:
  #fff5f5   Error background
  #f5d4d4   Error border
  #c33      Error text
```

---

## Spacing Scale

```
4px   - Micro spacing (gaps between elements)
8px   - Component spacing (button padding)
12px  - Element spacing (tag padding)
16px  - Section spacing (between major elements)
20px  - Large spacing (panel gaps)
24px  - Page padding (tablet)
32px  - Page padding (desktop), main gap
40px  - Large section gaps (layout columns)
```

---

## Component Styles

### Button (Generate)

```
Default:
  Background: #1a1a18
  Color:      #ffffff
  Padding:    12px 28px
  Border:     none
  Radius:     6px
  Font:       14px / 600 weight

Hover:
  Background: #2a2a28 (darker)
  Transform:  translateY(-1px)
  Transition: 0.3s ease

Active:
  Transform:  translateY(0)

Disabled:
  Opacity:    0.5
  Cursor:     not-allowed
```

### Textarea

```
Default:
  Border:     1px solid #d4d3ce
  Background: #fefdfb
  Padding:    16px
  Radius:     6px
  Font:       15px
  Line-height: 1.7

Focus:
  Border:     1px solid #1a1a18
  Background: #ffffff
  Outline:    none

Placeholder:
  Color:      #9a9a92
```

### Tags (Decision)

```
Regular Tag:
  Background: #f5f4f1
  Border:     1px solid #e0dfd8
  Padding:    6px 10px
  Radius:     4px
  Font:       12px / 500 weight
  Color:      #4a4a42
  Text-transform: capitalize

Theme Tag (emphasized):
  Background: #ede8df
  Border:     1px solid #d4d3ce
  Font-weight: 600
```

### Cards (Instructions)

```
Theme Item Card:
  Border:     1px solid #d4d3ce
  Background: #fbfbf9
  Padding:    16px
  Radius:     6px

Hover:
  Background: #fefdfb
  Border:     1px solid #c4c3be
  Transition: 0.2s ease

Content:
  Heading:    14px / 600 / #1a1a18
  Text:       13px / #6a6a62 / 1.6 line-height
```

---

## Animation Details

### Loading Spinner
```
Size:       32px
Border:     2px solid #e0dfd8
Top:        #1a1a18 (contrast color)
Animation:  spin 0.8s linear infinite
Rotation:   0deg → 360deg
```

### Transitions
```
Button:         0.3s ease
Border/color:   0.2s ease
Hover states:   0.2s ease
No page-load animations
```

---

## States

### Input Panel States
```
Empty:      Textarea empty, generate button disabled
Filled:     Textarea has text, button enabled
Focused:    Textarea has focus, dark border
Error:      Red error message below button
```

### Output Panel States
```
Empty:      "No piece yet" message, light border
Loading:    Spinner + "Analyzing..." message
Generated:  Decision panel + rendered template
Error:      Red error message
```

---

## Responsive Breakpoints

```
Mobile:     < 640px
Tablet:     640px - 1000px
Desktop:    > 1000px

Mobile → Tablet changes:
  ✓ Header items stack vertically
  ✓ Grid to single column layout
  ✓ Textarea height: 240px → 320px

Tablet → Desktop changes:
  ✓ Header items inline
  ✓ Single column to two-column
  ✓ Gap 32px → 40px
  ✓ Textarea height: 320px → 460px
```

---

## CSS Architecture

```
styles.css (550 lines)
├── Reset & Base Styles
├── Header
├── Tab Navigation
├── Main Layout
├── Input Panel
├── Output Panel
├── Decision Panel
├── Template Container
├── Instructions Panel
├── Responsive Design (@media queries)
└── Utility & Legacy
```

---

## Key Design Principles

1. **Typography First** - Strong hierarchy guides the eye
2. **Whitespace Breathing** - Generous padding/margins
3. **Subtle Interactions** - Smooth, not flashy
4. **Minimal Color** - Neutrals with restraint
5. **Editorial Tone** - Literary, not corporate
6. **Performance** - No frameworks, pure CSS
7. **Accessible** - Good contrast, semantic HTML
8. **Responsive** - Works on all devices

---

## Do's ✅

- ✅ Use the spacing scale consistently
- ✅ Favor subtle borders over heavy shadows
- ✅ Keep transitions under 0.3s
- ✅ Use system fonts
- ✅ Maintain color palette
- ✅ Test on mobile, tablet, desktop
- ✅ Prioritize whitespace
- ✅ Use semantic HTML

## Don'ts ❌

- ❌ Don't add bright colors
- ❌ Don't use heavy shadows
- ❌ Don't add unnecessary animations
- ❌ Don't break spacing scale
- ❌ Don't forget responsive design
- ❌ Don't use non-system fonts without reason
- ❌ Don't reduce heading hierarchy
- ❌ Don't overcomplicate interactions

---

## Files to Know

```
client/src/
├── App.jsx                    ← Tab state, main layout
├── styles.css                 ← Complete design system
├── components/
│   ├── Header.jsx             ← Navigation
│   ├── InstructionsPanel.jsx  ← Educational content
│   └── LoadingState.jsx       ← Loading animation
```

---

## Quick Development Tips

### Adding a New Section
1. Use `<section>` with proper heading
2. Add spacing: `gap: 20px` or `margin: 20px 0`
3. Follow typography scale
4. Test on mobile

### Styling New Component
1. Follow spacing scale
2. Use border instead of shadow
3. Add hover state (if interactive)
4. Ensure responsive (mobile breakpoint)

### Testing
1. Desktop: 1400px
2. Tablet: 800px
3. Mobile: 375px
4. Check focus states
5. Verify color contrast

---

## Summary

Clean, minimal, refined design system based on:
- **Typography hierarchy** (clear scale)
- **Strategic spacing** (consistent increments)
- **Minimal color** (neutral palette)
- **Subtle interactions** (smooth, not flashy)
- **Editorial aesthetic** (literary, thoughtful)

Result: A polished product interface that feels contemporary and literary at the same time.

**Production Ready.** ✅
