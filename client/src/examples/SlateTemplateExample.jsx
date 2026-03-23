import React from 'react';
import SlateTemplate from '../components/SlateTemplate';

const mockData = {
  tone: 'intimate',
  density: 'medium',
  section_breaks: true,
  pull_quote: 'In dark mode, typography must carry both clarity and atmosphere without spectacle.',
  typography_mode: 'editorial',
  layout_mode: 'narrow_centered',
  hero_style: 'understated',
  title_variant: 'After Midnight, the Page Glows Slate',
  dek: 'A study in contrast, restraint, and composure across a premium dark reading surface.',
  highlight_lines: [
    'Good dark design is never loud; it is measured and legible.',
    'A cool charcoal palette can feel cinematic without becoming dramatic.'
  ]
};

const mockText = `A premium dark page begins with discipline. Contrast must be strong enough to sustain long reading while avoiding harsh light.

Layered slate surfaces establish depth without theatrics. Border lines, spacing, and hierarchy quietly separate elements and preserve calm.

When typography is balanced against generous rhythm, the interface feels composed rather than dense. The page becomes an environment for attention.`;

export default function SlateTemplateExample() {
  return <SlateTemplate data={mockData} text={mockText} />;
}
