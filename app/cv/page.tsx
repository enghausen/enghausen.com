import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { cv, formatPeriod, skillGroupLabels } from "@/lib/cv";

export const metadata: Metadata = {
  title: "cv",
  description:
    "CV of Morten Rode Enghausen: software engineering student, IT infrastructure and operations specialist.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-mono text-sm text-muted"># {children}</h2>;
}

export default function CvPage() {
  const [current, ...completed] = cv.education;

  return (
    <div className="space-y-16 pt-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">{cv.basics.name}</h1>
        <p className="text-muted">{cv.basics.label}</p>
        <p className="text-sm text-muted">{cv.basics.location}</p>
        <ul className="flex gap-5 text-sm">
          {cv.basics.profiles.map((profile) => (
            <li key={profile.network}>
              <a
                href={profile.url}
                className="text-brand-safe hover:underline"
              >
                {profile.network}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section className="space-y-4">
        <SectionHeading>summary</SectionHeading>
        <p className="max-w-prose leading-relaxed">{cv.summary}</p>
      </section>

      <section className="space-y-8">
        <SectionHeading>experience</SectionHeading>
        {cv.work.map((job) => (
          <article
            key={`${job.company}-${job.start}`}
            className="space-y-2 border-l border-muted/25 pl-5"
          >
            <h3 className="font-medium">
              {job.position}{" "}
              <span className="text-muted">· {job.company}</span>
            </h3>
            <p className="font-mono text-xs text-muted">
              {formatPeriod(job.start, job.end)} · {job.location}
            </p>
            <p className="max-w-prose text-sm">{job.summary}</p>
            {job.highlights && (
              <ul className="max-w-prose list-disc space-y-1 pl-5 text-sm text-muted">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading>education</SectionHeading>
        <article className="space-y-2 border-l border-muted/25 pl-5">
          <h3 className="font-medium">{current.degree}</h3>
          <p className="text-sm text-muted">{current.institution}</p>
          <p className="font-mono text-xs text-muted">
            {formatPeriod(current.start, current.end)} · {current.status}
          </p>
          <details className="group pt-1 text-sm">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-brand-safe [&::-webkit-details-marker]:hidden">
              <ChevronRight
                className="h-3.5 w-3.5 transition-transform group-open:rotate-90"
                aria-hidden
              />
              Semesters and courses
            </summary>
            <div className="mt-4 space-y-6">
              {current.semesters?.map((semester) => (
                <div key={semester.term} className="space-y-2">
                  <h4 className="text-sm font-medium">{semester.term}</h4>
                  <ul className="space-y-1 text-muted">
                    {semester.courses.map((course) => (
                      <li
                        key={course.code}
                        className="flex justify-between gap-4"
                      >
                        <span>{course.name}</span>
                        <span className="shrink-0 font-mono text-xs">
                          {course.ects} ECTS
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {current.merit && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Transferred credits</h4>
                  <ul className="space-y-1 text-muted">
                    {current.merit.map((item) => (
                      <li
                        key={item.course}
                        className="flex justify-between gap-4"
                      >
                        <span>
                          {item.course}
                          <span className="block text-xs">{item.basis}</span>
                        </span>
                        <span className="shrink-0 font-mono text-xs">
                          {item.ects} ECTS
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </article>
        {completed.map((degree) => (
          <article
            key={`${degree.institution}-${degree.start}`}
            className="space-y-1 border-l border-muted/25 pl-5"
          >
            <h3 className="font-medium">{degree.area}</h3>
            <p className="text-sm text-muted">
              {degree.degree} · {degree.institution}
            </p>
            <p className="font-mono text-xs text-muted">
              {formatPeriod(degree.start, degree.end)}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeading>skills</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(cv.skills).map(([group, items]) => (
            <div key={group} className="space-y-2">
              <h3 className="text-sm font-medium">
                {skillGroupLabels[group] ?? group}
              </h3>
              <ul className="space-y-1 text-sm text-muted">
                {items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading>certifications</SectionHeading>
        <ul className="space-y-2 text-sm">
          {cv.certifications.map((cert) => (
            <li key={cert.name} className="flex justify-between gap-4">
              <span>
                {cert.name}
                <span className="text-muted"> · {cert.issuer}</span>
                {cert.note && (
                  <span className="block text-xs text-muted">{cert.note}</span>
                )}
              </span>
              {cert.year && (
                <span className="shrink-0 font-mono text-xs text-muted">
                  {cert.year}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <SectionHeading>languages</SectionHeading>
        <ul className="space-y-1 text-sm">
          {cv.languages.map((item) => (
            <li key={item.language}>
              {item.language}
              <span className="text-muted"> · {item.fluency}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
