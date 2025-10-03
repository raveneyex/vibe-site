export default function formatTemplate(template: string, replacements: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = replacements[key];
    return value !== undefined ? String(value) : `{${key}}`;
  });
}
