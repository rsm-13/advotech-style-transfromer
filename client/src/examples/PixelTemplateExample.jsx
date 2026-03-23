import React from 'react';
import PixelTemplate from '../components/PixelTemplate';

const mockData = {
  tone: 'lyrical',
  density: 'medium',
  section_breaks: true,
  pull_quote: 'I watched and memorized while all this was lived by others.',
  typography_mode: 'editorial',
  layout_mode: 'narrow_centered',
  hero_style: 'minimal',
  title_variant: 'Months of Witness',
  dek: 'A literary note on memory, distance, and civic unrest.',
  highlight_lines: ['I sat staring at my phone screen for weeks on end.', 'I do not know what to do with such a sound.']
};

const mockText = `Starting with the 19th of March this past year, I sat staring at my phone screen for weeks on end.

The mayor had been put in custody, and many protests had begun.

I watched and memorized while all this was lived by others.`;

export default function PixelTemplateExample() {
  return <PixelTemplate data={mockData} text={mockText} variant="romantic" />;
}
