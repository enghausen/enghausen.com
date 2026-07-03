# SITE.md: enghausen.com architecture & guidelines

This document plus `design-tokens.css` and `data/cv.json` defines the site:
architecture, content rules and launch criteria.

## Purpose & audience

Personal site for Morten Rode Enghausen: CV, technical blog, quiet consulting
availability. Audience: recruiters, potential clients, fellow engineers, AI crawlers.
Language: **English**. Tone: **concrete over grandiose**: facts and numbers, no
self-praise, no explanations for job changes. Lowercase "enghausen" always. No emojis.

## Stack

Next.js (App Router, TypeScript) · Tailwind 4 (tokens in `design-tokens.css`) ·
MDX content in-repo · Fonts self-hosted via Fontsource (Outfit + JetBrains Mono) ·
Lucide icons · Vercel hosting · DNS on Cloudflare.

## Sitemap (v1)

| Route | Purpose |
|-------|---------|
| `/` | Home: terminal-styled hero, short bio, latest 3 posts, quiet consulting line |
| `/cv` | CV rendered from `data/cv.json` |
| `/blog` | Post index, newest first |
| `/blog/[slug]` | Individual post (MDX) |
| `/contact` | Contact info + social links |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Feeds & crawling |

Later (not v1): `/lab` (experiments), `/terminal` (interactive easter egg), `/uses`.

## Page outlines

### Home `/`
1. Hero: prompt-style line in JetBrains Mono, e.g. `enghausen ~ $` followed by a
   one-sentence intro, with a blinking pipe cursor (`.cursor-pipe`). Static, not interactive.
2. Short bio (2-3 sentences, from cv.json summary).
3. Latest posts (3 cards: title, date, description).
4. Quiet consulting line: "Open to selected engagements alongside my studies: get in touch."
5. Footer (global): combined logo, GitHub source link, RSS, license line.

### CV `/cv`
Rendered entirely from `data/cv.json` (single source of truth: no CV prose in components).
1. Header: name, headline, location, profile links.
2. Summary.
3. Experience timeline (company, position, period, highlights). No gap explanations.
4. Education: in-progress degree shown with semesters/courses (collapsible detail);
   completed degrees title-only. **Never show grades.**
5. Skills grouped by category. Certifications. Languages.

### Blog `/blog`
- Index: list of posts (title, date, description, tags). No pagination until needed.
- Post page: MDX rendered with Shiki syntax highlighting (JetBrains Mono), heading
  anchors, published date. Components in content must be simple placeholders
  (name + props, no logic/state): see content rules.

### Contact `/contact`
Email (placeholder until migration: link to LinkedIn), GitHub, LinkedIn. The quiet
consulting line repeated. No contact form in v1 (Server Actions + Resend is a later phase).

## Navigation

Header: wordmark (logo-dark/light SVG) left; nav right: `cv · blog · contact`.
Active item in `--color-brand`. Mobile: same row, no hamburger needed at 4 items.

## Content model

- Posts: `content/posts/<slug>.mdx`
- Frontmatter: `title`, `description`, `date` (ISO), `tags` (array), `draft` (bool, excluded from prod)
- CV data: `data/cv.json` (v0.6, final for launch)
- Rule: MDX components are neutral placeholders only: name + simple props, no logic.

## Brand

Identity: the e|h mark and the "enghausen." wordmark, set in JetBrains Mono.
Lowercase always. Orange `#d47830` is the identity color; "eng" and the trailing
dot are always orange, "hausen" follows the theme text color. The mark never
changes with theme (it carries its own dark container). Tokens: `design-tokens.css`.

## Assets

All site assets live in `public/`:

- Favicons: `favicon.ico` (16/32/48), `favicon.svg`, `apple-touch-icon.png`,
  `favicon-192.png`, `favicon-512.png`, `site.webmanifest`
- Social: `og-image.png` (1200x630)
- Logos: `logo-dark.svg`, `logo-light.svg`, `wordmark-dark.svg`, `wordmark-light.svg`, `mark.svg`

Head tags: SVG favicon after ICO (modern browsers pick SVG, legacy falls back),
apple-touch-icon, manifest, og:image + twitter:card meta.

## Domains & canonical

Canonical: **apex** `https://enghausen.com`. 301 to it: `www.enghausen.com`,
`enghausen.dk`, `.net`, `.org` (Cloudflare redirect rules). One canonical host only.

## SEO / AEO (phase 5, listed for completeness)

`sitemap.xml`, `rss.xml`, JSON-LD (`Person` sitewide, `BlogPosting` per post),
`robots.txt` allowing AI crawlers, correct `og:`/`twitter:` meta per page,
self-hosted Umami analytics (no cookie banner).

## Definition of done (v1 launch)

- [ ] All v1 routes implemented and populated (cv.json rendered, >= 1 real blog post)
- [ ] Lighthouse: performance and accessibility >= 95 on home, cv, one post
- [ ] Favicon chain + og-image wired; social share preview verified
- [ ] Apex canonical live, all redirects in place
- [ ] README documents stack, local dev, and the license split: code is MIT; content (posts, CV data) and brand assets (logos, icons) are all rights reserved
