# CLAUDE.md

Project instructions for Claude Code. Read `SITE.md` before making changes: it
defines the architecture, content rules and launch criteria.

## Project

Personal site for Morten Rode Enghausen (enghausen.com): CV, technical blog,
quiet consulting availability. Next.js (App Router, TypeScript), Tailwind 4,
MDX content in-repo, deployed on Vercel.

## Rules

- **Self-contained repo**: committed files never reference personal paths,
  private notes or machine-specific locations. Machine-specific context lives
  in `CLAUDE.local.md` (gitignored).
- **Design**: all colors and fonts come from `design-tokens.css`. Never hardcode
  hex values in components. "enghausen" is always lowercase. No emojis anywhere.
- **Copy tone**: concrete over grandiose. Facts and numbers, no self-praise.
  All site copy in English.
- **CV**: rendered exclusively from `data/cv.json`; no CV prose in components.
  Grades are never shown anywhere. The transcripts used when updating cv.json
  include them; always leave them out.
- **Content**: posts are MDX in `content/posts/`. Components inside MDX must be
  neutral placeholders (name + simple props, no logic or state).
- **Comments**: professional register, explain why not what. No meta-commentary
  about AI, briefs or decisions.
- **Commits**: small, focused, imperative mood ("Add blog index route").
- **Secrets**: only in `.env.local` and Vercel env vars. Never in the repo.

## Verify before done

`npm run build` must pass. For UI changes, check both light and dark
(theme follows the system via `light-dark()`).
