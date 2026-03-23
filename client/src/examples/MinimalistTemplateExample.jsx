import React from 'react';
import MinimalistTemplate from '../components/MinimalistTemplate';

const mockData = {
  tone: 'intimate',
  density: 'sparse',
  section_breaks: true,
  pull_quote: 'A contemporary page is designed less by what it adds than by what it refuses.',
  typography_mode: 'modern',
  layout_mode: 'asymmetrical',
  hero_style: 'understated',
  title_variant: 'Notes from a Quiet Exhibition',
  dek: 'On restraint, visual cadence, and the confidence of a contemporary editorial page.',
  highlight_lines: [
    'Hierarchy can be asserted through spacing before it is asserted through weight.',
    'A literary layout should guide, not perform.'
  ]
};

const mockText = `The most modern pages are rarely the most crowded. They hold their shape through interval, measure, and silence.

When typography is treated as architecture, each line break and margin becomes structural. The reader senses intention before consciously naming it.

Asymmetry, used sparingly, introduces momentum. A shifted title, an offset quote, and a measured column can make the page feel authored rather than templated.

This is design as editorial stewardship: calm, exacting, and quietly bold.`;

export default function MinimalistTemplateExample() {
  return <MinimalistTemplate data={mockData} text={mockText} />;
}
