# Homepage Styling TODO — Figma-Accurate Implementation

**Started:** 2026-02-25
**Last Updated:** 2026-03-08
**Figma Source:** `research/figma-homepage-css.md` (4,558 lines, 822 elements)
**Viewport:** 1728px

## Section Progress

| # | Section | Styling | Assets | Key Changes |
|---|---------|---------|--------|-------------|
| 1 | Hero | DONE | DONE | `hero-banner.png`, headline, arrow, discover link, carousel dots, Talk AI widget |
| 2 | Statement | DONE | DONE | `statement-video.mp4` + `main-slider.mp4` inline, "Why DDIP AI" label, 146px headline |
| 3 | About / Capabilities | DONE | N/A | "From Insight to Intelligence" + 4 capability cards (2x2) |
| 4 | Our AI Solutions | DONE | DONE | 4 cards: 2 video (`ai-content-gen.mp4`, `automation.mp4`) + 2 image (`solution-influencer.jpg`, `solution-geo.jpg`) |
| 5 | Selected Work | DONE | DONE | 4 video items: `vesta-global.mp4`, `cesi-design.mp4`, `mediterra.mp4`, `brother.mp4` |
| 6 | DDiP Approach | DONE | DONE | `main-slider.mp4` full-width video, gradient text heading |
| 7 | Future Face of Brands | DONE | DONE | 10 real influencer portraits (`influencer-01.png` through `influencer-10.png`) |
| 8 | Smarter Workflows | DONE | DONE | 3D purple/neon scene image, gradient headline |
| 9 | +45 AI Tools | DONE | DONE | 12 individual logos (OpenAI, Midjourney, Runway, etc.) scattered layout |
| 10 | Partners | DONE | PLACEHOLDER | 5 bordered boxes — needs individual logos from client |
| 11 | FAQ | DONE | DONE | Dark card, 2-column, 8 questions, accordion, Live FAQ CTA |
| 12 | CTA Bar | DONE | N/A | Gradient bar, "Begin Your Transformation" button |
| 13 | Footer | DONE | N/A | Full redesign — ddip.AI logo, 2-col links, social icons |

## Asset Migration Summary (2026-02-27)

### What Changed
- **Hero:** `hero-ai-influencer.png` -> `hero-banner.png` (man at desk with neon lights)
- **Statement video:** `statement-design-video.mp4` -> `statement-video.mp4` (woman pixel dissolve)
- **Solution cards:** `<img>` converted to conditional `<video>/<img>` based on `mediaType`
- **Selected Work:** All 4 items converted from `<img>` to `<video autoPlay muted loop playsInline>`
- **DDip Approach:** Static `approach-1.jpg` -> `<video>` with `main-slider.mp4`
- **Influencer portraits:** 10 placeholder `future-face-*.jpg` -> 10 real `influencer-*.png/jpg`
- **AI Tools:** Single `automation-tools.jpg` placeholder -> 12 individually positioned tool logos
- **Mega menu:** 3 real preview images copied

### Typography Accuracy
- Section headings: `font-heading` (Bricolage) 80px, medium weight
- Gradient headings: SF Pro, 80px, `background: linear-gradient(199deg, #063746, #00BCCF)`
- Card descriptions: SF Pro 500, ~27px
- Tag pills: 10-12px, bordered, rounded-full
- FAQ questions: SF Pro 400, 26px
- Footer: Bricolage 40px headings, SF Pro 28px links

### Color Accuracy
- `#002834` for dark sections (Future Face, FAQ card, Footer)
- `#1CE3F4` for CTA buttons and highlight text
- `#039EB7` for brand teal labels
- `#EBFFFF` for light text on dark sections
- `#90B2BD` for muted text
- `#6AADBE` for footer links
- Gradient: `linear-gradient(199deg, #063746 0%, #00BCCF 100%)` for headings
- Gradient: `linear-gradient(-90deg, #002834 0%, #129CAC 100%)` for CTA bar
- Gradient: `linear-gradient(196deg, #FFFFFF 0%, #77F3FF 100%)` for "Let's Connect" text

## Remaining Polish Items
- [ ] Individual partner logo images (need from client: AWS, Google Cloud, Google Partner, Microsoft, Salesforce)
- [ ] Selected Work subtitle text — currently "Lorem Ipsum is simply" (need real copy)
- [x] **MOBILE VERSION** — DONE. 9 mobile pages built under `app/m/` with middleware UA rewrites. MobileNavbar, MobileFooter, MobileSolutionPage shared template. All pages wired to CMS API with hardcoded fallbacks. 93 mobile assets in `public/images/mobile/`. See IMAGE-PROGRESS.md for full details.
- [ ] Hero headline 3-size split (184px / 161px SemiCondensed / 184px)
- [ ] Large videos need compression before deployment (144MB + 170MB)

## Verified (2026-02-27)
- All 55 network requests return 200/304 (zero 404s)
- All 24 key asset URLs verified via curl — all HTTP 200
- Visual screenshots confirmed: hero, statement, solutions, selected work, approach, influencers, AI tools, FAQ, footer
- TypeScript build: 0 errors
