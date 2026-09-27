/** Section anchors, in page order. */
export const NAV = [
  { id: 'projects', label: 'Projects' },
  { id: 'live', label: 'Live' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/** Opens the assistant drawer, optionally asking `question` straight away. */
export const openAssistant = (question?: string) =>
  window.dispatchEvent(new CustomEvent('open-assistant', { detail: question }));

