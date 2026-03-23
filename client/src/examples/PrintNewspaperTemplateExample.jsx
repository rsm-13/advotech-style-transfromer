import React from 'react';
import PrintNewspaperTemplate from '../components/PrintNewspaperTemplate';

const mockData = {
  tone: 'analytic',
  density: 'dense',
  section_breaks: true,
  pull_quote: 'The city records itself in fragments: in testimony, in ink, in what survives the morning press run.',
  typography_mode: 'scholarly',
  layout_mode: 'wide_columns',
  hero_style: 'headline_heavy',
  title_variant: 'Public Memory and the Morning Edition',
  dek: 'How printed language structures civic attention, archives urgency, and stabilizes a common record.',
  highlight_lines: [
    'A newspaper does not merely report a day; it arranges a day into legible consequence.',
    'What appears in print enters the civic archive with a different kind of weight.'
  ]
};

const mockText = `By dawn the presses begin their measured labor, and with them comes a familiar promise: that the day can be sorted into columns, evidence, and sequence.

The newspaper page remains one of the most disciplined information surfaces in public life. Its conventions are not decorative. Headline, byline, lead, and continuation all participate in a contract with the reader.

Within narrow columns, facts compress and unfold at once. Reportage shares space with correction, obituary, weather, and culture review; each item is framed by rules that make density navigable.

Even in digital circulation, the grammar of print persists. We still search for the lead, the quote, the stated source, and the accountable line. The form teaches readers how to evaluate urgency.

A printed page is therefore both daily object and historical instrument: a temporary artifact that enters permanent memory.`;

export default function PrintNewspaperTemplateExample() {
  return <PrintNewspaperTemplate data={mockData} text={mockText} />;
}
