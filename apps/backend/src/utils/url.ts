export function buildFileUrl(path: string) {
  // If already an absolute URL, return as-is
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.BASE_URL || "http://localhost:3000";
  // ensure no double slashes (e.g. https://site.com//uploads)
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
