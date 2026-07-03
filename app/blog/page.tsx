import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "blog",
  description:
    "Technical notes on software engineering, infrastructure and operations.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12 pt-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="text-muted">
          Technical notes on software engineering, infrastructure and
          operations.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">First post coming soon.</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block space-y-1"
              >
                <h2 className="text-lg font-medium transition-colors group-hover:text-brand-safe">
                  {post.title}
                </h2>
                <time
                  dateTime={post.date}
                  className="block font-mono text-xs text-muted"
                >
                  {formatDate(post.date)}
                </time>
                <p className="max-w-prose text-sm text-muted">
                  {post.description}
                </p>
              </Link>
              {post.tags.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-xs text-brand-safe"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
