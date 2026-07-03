import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block space-y-1">
        <h3 className="font-medium transition-colors group-hover:text-brand-safe">
          {post.title}
        </h3>
        <time dateTime={post.date} className="block text-xs text-muted">
          {formatDate(post.date)}
        </time>
        <p className="text-sm text-muted">{post.description}</p>
      </Link>
    </article>
  );
}
