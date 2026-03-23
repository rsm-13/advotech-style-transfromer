import React from 'react';
import TechTemplate from '../components/TechTemplate';

const mockData = {
  tone: 'analytic',
  density: 'dense',
  section_breaks: true,
  pull_quote: 'Documentation is where design intent becomes executable understanding.',
  typography_mode: 'modern',
  layout_mode: 'narrow_centered',
  hero_style: 'minimal',
  title_variant: 'Log Entry: Reading as Structured Output',
  dek: 'A technical rendering mode for literary text in terminal form.',
  highlight_lines: [
    'Signal improves when visual noise is constrained.',
    'Monospace rhythm encourages slow, sequential reading.'
  ]
};

const mockText = `The interface frames text as ordered output. Each paragraph is treated as an emitted line, preserving sequence and reducing ornamental distraction.

Within a terminal-like surface, hierarchy is still possible: headline, descriptor, metadata, and quoted annotation each map to familiar CLI semantics.

This mode is useful when the reader values structure, traceability, and precision over decorative styling.`;

export default function TechTemplateExample() {
  return <TechTemplate data={mockData} text={mockText} />;
}
