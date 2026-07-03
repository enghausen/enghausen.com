import Link from "next/link";
import { cv } from "@/lib/cv";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-20 pt-16">
      <section>
        <p className="font-mono text-lg">
          <span className="text-brand-safe">enghausen ~ $</span>{" "}
          <span className="cursor-pipe">
            software engineering student; more than a decade in IT
            infrastructure and operations.
          </span>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-sm text-muted"># about</h2>
        <p className="max-w-prose leading-relaxed">{cv.summary}</p>
      </section>

      <section className="space-y-6">
        <h2 className="font-mono text-sm text-muted"># latest posts</h2>
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">First post coming soon.</p>
        )}
        <Link
          href="/blog"
          className="inline-block text-sm text-brand-safe hover:underline"
        >
          All posts
        </Link>
      </section>

      <section>
        <p className="max-w-prose text-sm text-muted">
          Open to selected engagements alongside my studies:{" "}
          <Link href="/contact" className="text-brand-safe hover:underline">
            get in touch
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
