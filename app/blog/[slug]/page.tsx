import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

interface Params {
  params: Promise<{ slug: string }>;
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [
      rehypePrettyCode,
      { theme: { light: "github-light", dark: "github-dark-default" } },
    ],
    // Plugin tuple typing varies across the unified ecosystem; the runtime
    // shape is what MDX expects.
  ] as never[],
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">{post.meta.title}</h1>
        <time
          dateTime={post.meta.date}
          className="block font-mono text-xs text-muted"
        >
          {formatDate(post.meta.date)}
        </time>
        {post.meta.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-brand-safe">
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className="post-body mt-10">
        <MDXRemote source={post.content} options={{ mdxOptions }} />
      </div>
    </article>
  );
}
