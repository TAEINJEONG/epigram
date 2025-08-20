import fs from 'node:fs/promises';
import path from 'node:path';

export async function i18nHealthCheck(locale = 'ko', nss = ['main', 'comment', 'emotion']) {
  const result: Record<string, { exists: boolean; size: number }> = {};
  for (const ns of nss) {
    const p = path.join(process.cwd(), 'public', 'locales', locale, `${ns}.json`);
    try {
      const raw = await fs.readFile(p, 'utf8');
      const json = JSON.parse(raw);
      result[`${locale}/${ns}`] = { exists: true, size: Object.keys(json ?? {}).length };
    } catch {
      result[`${locale}/${ns}`] = { exists: false, size: 0 };
    }
  }
  return result;
}
