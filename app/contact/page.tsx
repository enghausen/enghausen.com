import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { cv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "contact",
  description: "Contact Morten Rode Enghausen.",
};

export default function ContactPage() {
  return (
    <div className="space-y-12 pt-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Contact</h1>
        {/* Email lands here after the mail migration; LinkedIn is the
            reliable channel until then. */}
        <p className="max-w-prose text-muted">
          The fastest way to reach me is a message on LinkedIn.
        </p>
      </header>

      <ul className="space-y-4">
        {cv.basics.profiles.map((profile) => (
          <li key={profile.network}>
            <a
              href={profile.url}
              className="inline-flex items-center gap-2 text-brand-safe hover:underline"
            >
              {profile.network}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </li>
        ))}
      </ul>

      <p className="max-w-prose text-sm text-muted">
        Open to selected engagements alongside my studies: get in touch.
      </p>
    </div>
  );
}
