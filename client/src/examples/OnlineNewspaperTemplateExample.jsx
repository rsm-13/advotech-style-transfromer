import React from 'react';
import OnlineNewspaperTemplate from '../components/OnlineNewspaperTemplate';

const mockData = {
  tone: 'analytic',
  density: 'medium',
  section_breaks: true,
  pull_quote: 'A modern news article succeeds when clarity leads and design follows.',
  typography_mode: 'modern',
  layout_mode: 'narrow_centered',
  hero_style: 'balanced',
  title_variant: 'City Council Approves New Public Archive Initiative',
  dek: 'The five-year program expands access to municipal records and funds local preservation projects.',
  highlight_lines: [
    'Officials said the archive will launch with more than two million digitized pages.',
    'Independent historians will review indexing standards before public release.'
  ]
};

const mockText = `After months of committee hearings, the city council approved a new public archive initiative designed to preserve and organize historical municipal records.

The program, funded through a combination of public grants and institutional partnerships, will focus on digitization standards, long-term storage, and broad public access.

Supporters described the policy as a practical investment in civic literacy, noting that many key records remain difficult to locate despite formal disclosure requirements.

Project leads said the first release will include administrative documents, zoning records, and selected correspondence from the last three decades.`;

export default function OnlineNewspaperTemplateExample() {
  return <OnlineNewspaperTemplate data={mockData} text={mockText} />;
}
