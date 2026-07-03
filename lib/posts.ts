import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(source);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      draft: data.draft ?? false,
    },
    content,
  };
}

/** All publishable posts, newest first. Drafts are excluded in production. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPost(file).meta)
    .filter((meta) => process.env.NODE_ENV !== "production" || !meta.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const post = readPost(`${slug}.mdx`);
  if (process.env.NODE_ENV === "production" && post.meta.draft) return null;
  return post;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
