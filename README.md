# Advocate Style Transformer & Page Builder (Prototype)

Minimal full-stack prototype that uses an LLM to return **structured JSON style analysis**, then renders the piece with predefined React templates.

## Minimal folder structure

```txt
advotech-style-transfromer/
├─ client/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ styles.css
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
├─ server/
│  ├─ index.js
│  └─ package.json
├─ .env.example
└─ README.md
```

## Tech choices

- Frontend: React + Vite
- Backend: Node.js + Express
- LLM API: Groq OpenAI-compatible API (`https://api.groq.com/openai/v1/chat/completions`)

## Setup

1. Create env file at repo root:

```bash
cp .env.example .env
```

2. Add your key in `.env`:

```env
GROQ_API_KEY=your_real_key
GROQ_MODEL=openai/gpt-oss-120b
```

3. Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

## Run locally

Open two terminals.

Terminal 1 (backend):

```bash
cd server
npm run dev
```

Terminal 2 (frontend):

```bash
cd client
npm run dev
```

Then open the Vite URL (usually `http://localhost:5173`).

## API

`POST /analyze-style` accepts JSON:

```json
{
  "text": "literary piece text",
  "targetStyle": "minimalist"
}
```

`targetStyle` options used by the frontend:

- `minimalist`
- `brutalist`
- `romantic`

Returns:

```json
{
  "stylePlan": {
    "tone": "lyrical",
    "density": "medium",
    "section_breaks": true,
    "pull_quote": "...",
    "typography_mode": "poetic",
    "layout_mode": "narrow_centered",
    "hero_style": "dramatic",
    "title_variant": "...",
    "dek": "...",
    "highlight_lines": ["...", "..."]
  }
}
```

## Notes

- Prototype only; no auth, DB, history, or analytics.
- The frontend does not execute model-generated code.
- Three built-in templates render the original piece: Minimalist, Brutalist Editorial, Romantic Literary.
