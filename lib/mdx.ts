import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type MdxFrontmatter = {
  title: string;
  slug: string;
  date: string;
  categorie: string;
  excerpt: string;
  image: string;
  readTime: string;
};

export type MdxPost = {
  frontmatter: MdxFrontmatter;
  content: string;
};

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function listMdxSlugs(): Promise<string[]> {
  if (!(await exists(CONTENT_DIR))) return [];
  const files = await fs.readdir(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getMdxPost(slug: string): Promise<MdxPost | null> {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!(await exists(file))) return null;
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as MdxFrontmatter,
    content,
  };
}

export async function listMdxPosts(): Promise<MdxPost[]> {
  const slugs = await listMdxSlugs();
  const posts = await Promise.all(slugs.map((s) => getMdxPost(s)));
  return posts.filter((p): p is MdxPost => p !== null);
}
