import { URL } from 'url';

export function normalizeUrl(url: string): string {
  if (!url.startsWith('http') && !url.startsWith('https')) {
    url = `https://${url}`;
  }

  const parsedUrl = new URL(url);

  return parsedUrl.toString();
}
