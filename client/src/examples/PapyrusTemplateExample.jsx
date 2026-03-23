import React from 'react';
import PapyrusTemplate from '../components/PapyrusTemplate';

const mockData = {
  tone: 'lyrical',
  density: 'medium',
  section_breaks: true,
  pull_quote: 'In the silence of the library, time becomes a breath held between centuries.',
  typography_mode: 'editorial',
  layout_mode: 'narrow_centered',
  hero_style: 'minimal',
  title_variant: 'On the Margins of Memory',
  dek: 'A meditation on history, handwriting, and the artifacts we leave behind.',
  highlight_lines: [
    'The ink fades but the words remain.',
    'We are all engaged in the act of becoming a manuscript.'
  ]
};

const mockText = `The oldest libraries are not built of stone and mortar alone. They are temples of dust, of the accumulated breathing of readers long departed.

I have spent hours in these spaces, watching light move across ancient bindings, touching pages that held the careful handwriting of scribes whose names we will never know.

There is a kind of prayer in preservation. Each artifact—each letter, each margin note, each pressed flower—becomes a conversation across time.

We are writing into darkness, hoping someone will read the light we leave behind.`;

export default function PapyrusTemplateExample() {
  return <PapyrusTemplate data={mockData} text={mockText} />;
}
