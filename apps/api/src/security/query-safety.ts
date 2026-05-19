export function safeQuery(query: string, params: Array<string | number | boolean | null>): { text: string; values: Array<string | number | boolean | null> } {
  return { text: query, values: params };
}

export function sanitizeForHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
