export function setMeta(title: string, description?: string) {
  if (title) document.title = title;
  if (description) {
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', description);
  }
}

