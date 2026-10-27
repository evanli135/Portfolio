// Posts are Markdown files in src/posts with a small frontmatter block.
// Drafts show only in dev builds.

export type Post = { slug: string; title: string; date: string; draft: boolean; body: string };

const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parse(path: string, raw: string): Post {
  const slug = path.replace('./posts/', '').replace('.md', '');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  for (const line of (m?.[1] ?? '').split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { slug, title: meta.title ?? slug, date: meta.date ?? '', draft: meta.draft === 'true', body: m?.[2] ?? raw };
}

export const posts: Post[] = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .filter((p) => import.meta.env.DEV || !p.draft);
