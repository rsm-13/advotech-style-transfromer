import React from 'react';

export default function InstructionsPanel() {
  return (
    <div className="instructions-panel">
      <article className="instructions-content">
        <section className="instruction-section">
          <h2>What This Tool Does</h2>
          <p>
            Advocate Style Transformer analyzes your literary writing and automatically selects
            the perfect visual design. It reads the tone, structure, and feeling of your text,
            then applies a curated theme with matching typography and color palette.
          </p>
          <p>
            No manual design decisions. No multiple revisions. Just paste your writing and let
            the AI work.
          </p>
        </section>

        <section className="instruction-section">
          <h2>How to Use</h2>
          <ol>
            <li>
              <strong>Paste your text</strong> in the editor on the left. Any length, any genre.
              Literary fiction, essays, poetry, reflections.
            </li>
            <li>
              <strong>Click "Generate"</strong> to analyze your piece and create a styled preview.
            </li>
            <li>
              <strong>Explore the result</strong>. The AI has selected a theme and typography
              that matches your piece's voice.
            </li>
          </ol>
        </section>

        <section className="instruction-section">
          <h2>How Styles Are Chosen</h2>
          <p>
            The AI reads your text and evaluates:
          </p>
          <ul>
            <li><strong>Tone:</strong> Is it intimate, dramatic, analytical, lyrical?</li>
            <li><strong>Density:</strong> Does it sprawl or compress? Brief or elaborate?</li>
            <li><strong>Material:</strong> Does it feel modern, vintage, technical, romantic?</li>
          </ul>
          <p>
            Based on these insights, it selects from 9 distinct themes, each with carefully
            curated typography, colors, and spacing that complement different literary voices.
          </p>
        </section>

        <section className="instruction-section">
          <h2>The Themes</h2>
          <div className="themes-grid">
            <div className="theme-item">
              <h3>Romantic</h3>
              <p>Lyrical, expressive, soft palette. Playfair Display and elegant serifs.</p>
            </div>
            <div className="theme-item">
              <h3>Minimalist</h3>
              <p>Ultra-clean, modern editorial. Inter and refined sans-serif.</p>
            </div>
            <div className="theme-item">
              <h3>Tech</h3>
              <p>Dark terminal aesthetic. IBM Plex Mono for analytical voices.</p>
            </div>
            <div className="theme-item">
              <h3>Papyrus</h3>
              <p>Aged manuscript, calligraphy. Cinzel and decorative fonts.</p>
            </div>
            <div className="theme-item">
              <h3>Slate</h3>
              <p>Premium dark editorial. Newsreader and refined typography.</p>
            </div>
            <div className="theme-item">
              <h3>Woodland</h3>
              <p>Warm earth tones, organic feel. Cormorant Garamond.</p>
            </div>
            <div className="theme-item">
              <h3>Print Newspaper</h3>
              <p>Traditional broadsheet. Old Standard TT and classic layouts.</p>
            </div>
            <div className="theme-item">
              <h3>Online Newspaper</h3>
              <p>Modern web article style. Source Serif 4 for readability.</p>
            </div>
            <div className="theme-item">
              <h3>Pixel</h3>
              <p>Retro 8-bit aesthetic. Press Start 2P for playful voices.</p>
            </div>
          </div>
        </section>

        <section className="instruction-section">
          <h2>About Typography</h2>
          <p>
            Each theme uses fonts from Google Fonts—a curated library of open-source typefaces.
            The AI selects not just a theme, but specific fonts that match your piece's voice.
            A romantic story gets flowing serifs. A technical essay gets monospace clarity.
          </p>
          <p>
            Typography matters. This tool proves it.
          </p>
        </section>

        <section className="instruction-section last-section">
          <h2>Start Writing</h2>
          <p>
            Return to the <strong>Editor</strong> tab and paste your work. The AI is ready to
            read it.
          </p>
        </section>
      </article>
    </div>
  );
}
