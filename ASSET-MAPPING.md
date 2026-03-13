# DDip AI — Asset Mapping Guide

**Source:** `DDOP_AI_Assets/DDOP AI/` (173 files from client)
**Destination:** `implementation/frontend/public/`
**Existing public assets:** 137 files (many are placeholders from earlier scaffolding)
**Date:** 2026-02-27

---

## Asset Inventory Summary

| Folder | Files | Types | Maps To |
|--------|-------|-------|---------|
| `Main page/` | 43 | mp4, png, jpg | Homepage (all sections) |
| `AI INFLUENCER/` | 18 | png, svg | AI Influencer inner page |
| `AI commercial production/` | 25 | png, svg, mp4 | AI Commercial Production inner page |
| `AI content generation/` | 24 | png, svg, mp4 | AI Content Generation inner page |
| `Automation with a Creative Touch/` | 3 | png, mp4 | Automation inner page |
| `Ddip Geo Optimization/` | 28 | png, svg | GEO Optimization inner page |
| `OUR PROCESS/` | 17 | png, mp4 | Our Process inner page |
| `The Mind Behind/` | 14 | png, svg, mp4 | The Mind Behind inner page |
| `untitled folder/` | 0 | — | Empty, ignore |

---

## HOMEPAGE — Section-by-Section Asset Mapping

### Section 1: Hero
**Figma:** Full-bleed bg image (1920x990) + WhatsApp-style chat widget

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/banner.png` | `public/images/homepage/hero-banner.png` | **Hero background** — man at desk with neon lights (replaces current `hero-ai-influencer.png` which is a woman's face close-up) |

**Status:** Current `hero-ai-influencer.png` is a placeholder. The `banner.png` is the real Figma hero image.
**Note:** The hero also needs the close-up face image from Figma (`freepik__a-closeup-of-a-young-womans-face...`). This appears in the Figma design as the mask group behind the hero text. The banner.png seems to be for a different hero slide or the "DDip Approach" section banner. **Need to verify which is the primary hero bg.**

### Section 2: Statement — "WE DON'T JUST USE AI WE DESIGN WITH IT."
**Figma:** Large centered video (1182x525), then text below

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/001.mp4` | `public/videos/statement-video.mp4` | **Statement section large video** — the wide cinematic video above the headline |
| `Main page/main slayder.mp4` | `public/videos/main-slider.mp4` | **Main slider/carousel video** — possibly the inline video within the "WE DESIGN [video] WITH IT" headline or the hero carousel |

**Status:** Currently using `statement-design-video.mp4` for both the large video and the inline video. Need to test `001.mp4` and `main slayder.mp4` to determine which goes where.

### Section 4: Our AI Solutions (4 horizontal scroll cards)
**Figma:** 4 cards with image headers — each solution has a cover image/video

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/our solition/AI Content Generation.mp4` | `public/videos/solutions/ai-content-gen.mp4` | Card 1: AI Content Generation — **VIDEO not image** |
| `Main page/our solition/Create Your Influencer with AI.jpg` | `public/images/homepage/solution-influencer.jpg` | Card 2: AI Influencer — woman drinking coffee on balcony with Istanbul mosque |
| `Main page/our solition/Automation with a Creative Touch.mp4` | `public/videos/solutions/automation.mp4` | Card 3: Automation — **VIDEO not image** |
| `Main page/our solition/GEO Solutions.jpg` | `public/images/homepage/solution-geo.jpg` | Card 4: GEO Solutions — orange glass stairs abstract |
| `Main page/our solition/brother.jpg` | `public/images/homepage/solution-brother.jpg` | **Selected Work section** — Brother brand project (3 students with scooter) |

**Status:** Current code uses placeholder `card-content-gen.jpg`, `card-influencer.jpg`, `card-automation.jpg`. Cards 1 and 3 are VIDEOS not images — code needs `<video>` elements instead of `<img>`.

### Section 5: Selected Work (2x2 grid)
**Figma:** 4 portfolio items, each is a video with overlay text

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/our work/Sandscape_main_video_V01.mp4` | `public/videos/works/vesta-global.mp4` | Work grid item 1: Vesta Global (Sandscape real estate) |
| `Main page/our work/cesi-1. Yıl-v2.mp4` | `public/videos/works/cesi-design.mp4` | Work grid item 2: Cesi Design (interior design anniversary) |
| `Main page/our work/Güncel_2 (1).mp4` | `public/videos/works/mediterra.mp4` | Work grid item 3: Mediterra Group |
| `Main page/our work/27-Mayıs (1).mp4` | `public/videos/works/brother.mp4` | Work grid item 4: Brother |
| Additional work videos: | | |
| `Main page/our work/10 Ocak (1).mp4` | `public/videos/works/work-5.mp4` | Extra work item (carousel slide 2?) |
| `Main page/our work/31 Aralık (1).mp4` | `public/videos/works/work-6.mp4` | Extra work item |
| `Main page/our work/Müzikli (1).mp4` | `public/videos/works/work-7.mp4` | Extra work item |
| `Main page/our work/Optimum Reklam Filmi_final-dikey (1).mp4` | `public/videos/works/optimum.mp4` | Extra work item |
| `Main page/our work/Vesta Halkidiki_final (1).mp4` | `public/videos/works/vesta-halkidiki.mp4` | Extra work item |
| `Main page/our work/Yunanistan AIÇ.mp4` | `public/videos/works/yunanistan-ai.mp4` | Extra work item |

**IMPORTANT:** All "Selected Work" items in the Figma are **VIDEOS, not images**. The current code uses static `<img>` tags. The 2x2 grid should use `<video>` elements with autoplay/muted/loop to match the design.

### Section 6: The DDip Approach
**Figma:** Full-width image/video (1920x1091)

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/main slayder.mp4` | `public/videos/approach-video.mp4` | **Approach section full-width video** — "Screen Recording" of AI workflow tools in action |

**Status:** Currently using `approach-1.jpg` placeholder image. Should be a video.

### Section 7: The Future Face of Brands (AI Influencer cards)
**Figma:** 2 rows of 5 influencer portrait cards

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/our influencer/001.png` | `public/images/homepage/influencer-01.png` | **Mina Ozdemir** — businesswoman, grey suit, Istanbul skyline |
| `Main page/our influencer/002.jpg` | `public/images/homepage/influencer-02.jpg` | **Mina Sen** — woman with blue scarves, sunset, cat |
| `Main page/our influencer/003.png` | `public/images/homepage/influencer-03.png` | Elif Dogan — food/kitchen context |
| `Main page/our influencer/004.png` | `public/images/homepage/influencer-04.png` | Yasin El Fassi — fashion/heritage |
| `Main page/our influencer/005.png` | `public/images/homepage/influencer-05.png` | Aylin Demir — lifestyle |
| `Main page/our influencer/006.png` | `public/images/homepage/influencer-06.png` | Laila Haddad — HR/people |
| `Main page/our influencer/007.png` | `public/images/homepage/influencer-07.png` | Deniz Akar — tech |
| `Main page/our influencer/008.png` | `public/images/homepage/influencer-08.png` | Selin Kara — wellness |
| `Main page/our influencer/009.png` | `public/images/homepage/influencer-09.png` | Ece Yilmaz — fashion |
| `Main page/our influencer/freepik__candid...49064 1.png` | `public/images/homepage/influencer-10.png` | Extra influencer portrait (duplicate of one above or alternate) |

**Status:** Currently using `future-face-1.jpg` through `future-face-5.jpg` as placeholders. We have 10 real influencer portraits — enough for both rows of 5.

### Section 9: +45 AI Tools
**Figma:** Scattered AI tool logos around center text "+45 Ai Tools"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/ai icons/Flux.png` | `public/images/ai-tools/flux.png` | Flux AI logo |
| `Main page/ai icons/Freepik.png` | `public/images/ai-tools/freepik.png` | Freepik logo |
| `Main page/ai icons/Gimini.png` | `public/images/ai-tools/gemini.png` | Google Gemini logo |
| `Main page/ai icons/heygen 1.png` | `public/images/ai-tools/heygen.png` | HeyGen logo |
| `Main page/ai icons/kling.png` | `public/images/ai-tools/kling.png` | Kling AI logo |
| `Main page/ai icons/mid journey.png` | `public/images/ai-tools/midjourney.png` | Midjourney logo |
| `Main page/ai icons/minimax.png` | `public/images/ai-tools/minimax.png` | Minimax logo |
| `Main page/ai icons/mystic.png` | `public/images/ai-tools/mystic.png` | Mystic AI logo |
| `Main page/ai icons/open ai.png` | `public/images/ai-tools/openai.png` | OpenAI logo |
| `Main page/ai icons/runway.png` | `public/images/ai-tools/runway.png` | Runway logo |
| `Main page/ai icons/seedream.png` | `public/images/ai-tools/seedream.png` | Seedream logo |
| `Main page/ai icons/veo.png` | `public/images/ai-tools/veo.png` | Google Veo logo |

**Status:** Currently using a single `automation-tools.jpg` placeholder. Should be 12 individual positioned logos around center text — matching the scattered layout in Figma.

### Section 10: Partners
**Figma:** 5 bordered logo boxes (AWS, Google Cloud, Google Partner, Microsoft, Salesforce)

**Status:** No individual partner logos in the client assets. Current code uses a single `partners-row.jpg` placeholder for all 5 boxes. **NEED from client:** Individual high-res partner logos (AWS, Google Cloud, Google Partner, Microsoft, Salesforce).

### Section 11: FAQ
**Figma:** Dark card with background image in CTA area

**Status:** FAQ background image `faq-image-1.jpg` already exists in public. No new assets needed.

### Section 12: CTA Bar
**Figma:** Gradient bar, no images needed.

**Status:** Complete — no assets required.

### Header / Navigation
**Figma:** Mega menu with 3 preview images

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Main page/mega menu/3.jpg` | `public/images/common/mega-menu-1.jpg` | Mega menu preview — food influencer (blonde woman, apron, spoon) |
| `Main page/mega menu/4.jpg` | `public/images/common/mega-menu-2.jpg` | Mega menu preview |
| `Main page/mega menu/6.jpg` | `public/images/common/mega-menu-3.jpg` | Mega menu preview |

---

## INNER PAGES — Asset Mapping

### AI Influencer Page (`/ai-solutions/ai-influencer`)
**Figma page:** "AI INFLUENCER" and "AI Influencer / Mascot / Ambassador / Blogger"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `AI INFLUENCER/001.png` - `010.png` | `public/images/ai-influencer/portrait-01.png` - `portrait-10.png` | 10 AI influencer portraits for the showcase grid |
| `AI INFLUENCER/icons/001.svg` - `003.svg` | `public/images/ai-influencer/icon-01.svg` - `icon-03.svg` | Section icons (feature/benefit icons) |
| `AI INFLUENCER/logos/011.png` | `public/images/ai-influencer/logo-tiktok.png` | Platform logo |
| `AI INFLUENCER/logos/012.png` | `public/images/ai-influencer/logo-instagram.png` | Platform logo |
| `AI INFLUENCER/logos/1_CtxrKuklGah626b1x07C-g.png` | `public/images/ai-influencer/logo-medium.png` | Medium logo |
| `AI INFLUENCER/logos/Amazon_Web_Services_Logo.svg.png` | `public/images/partners/aws.png` | AWS partner logo (shared) |
| `AI INFLUENCER/logos/Google_Favicon_2025.svg.png` | `public/images/partners/google.png` | Google partner logo (shared) |

### AI Commercial Production Page (`/ai-solutions/ai-commercial`)
**Figma page:** "AI commercial production"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `AI commercial production/main slayder.png` | `public/images/ai-commercial/hero-slider.png` | Hero slider image (6.5MB — needs optimization) |
| `AI commercial production/photo.png` | `public/images/ai-commercial/photo.png` | Secondary photo (3.5MB — needs optimization) |
| `AI commercial production/video.mp4` | `public/videos/ai-commercial/main.mp4` | Hero/showcase video (144MB — **needs compression**) |
| `AI commercial production/001/Frame 427322049.png` - `054.png` | `public/images/ai-commercial/frame-01.png` - `frame-06.png` | 6 portfolio frames/screenshots |
| `AI commercial production/icons/001.svg` - `004.svg` | `public/images/ai-commercial/icon-01.svg` - `icon-04.svg` | 4 SVG service icons |
| `AI commercial production/icons/Layer-*.png` | `public/images/ai-commercial/layer-icon-01.png` - `04.png` | 4 PNG layer icons |
| `AI commercial production/Use Cases/*.mp4` (3 files) | `public/videos/ai-commercial/usecase-*.mp4` | 3 use case demo videos |
| `AI commercial production/What We Produce/*.mp4` (5 files) | `public/videos/ai-commercial/produce-*.mp4` | 5 production showcase videos |

### AI Content Generation Page (`/ai-solutions/ai-content`)
**Figma page:** "AI content generation" / "AI Production / AI Content Generation"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `AI content generation/001.png` - `004.png` | `public/images/ai-content/showcase-01.png` - `04.png` | 4 content generation showcase images |
| `AI content generation/mail slayder.png` | `public/images/ai-content/hero-slider.png` | Hero/main slider image |
| `AI content generation/icons/001.svg` - `009.svg` | `public/images/ai-content/icon-01.svg` - `09.svg` | 9 SVG feature/tool icons |
| `AI content generation/Create it/001.png` - `004.png` | `public/images/ai-content/create-01.png` - `04.png` | 4 "Create it" step images |
| `AI content generation/Animate it/001.mp4` - `005.mp4` | `public/videos/ai-content/animate-01.mp4` - `05.mp4` | 5 "Animate it" demo videos |
| `AI content generation/Finish it/Vesta AI Infv3.mp4` | `public/videos/ai-content/finish-vesta.mp4` | "Finish it" final result video (170MB — **needs compression**) |

### Automation with a Creative Touch Page (`/ai-solutions/automation`)
**Figma page:** "Automation with a Creative Touch"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Automation with a Creative Touch/main slayder.png` | `public/images/automation/hero-slider.png` | Hero image |
| `Automation with a Creative Touch/Content Automation.png` | `public/images/automation/content-automation.png` | Content automation diagram/screenshot |
| `Automation with a Creative Touch/workflow.mp4` | `public/videos/automation/workflow.mp4` | Workflow demo video |

### GEO Optimization Page (`/ai-solutions/geo`)
**Figma page:** "Ddip Geo Optimization"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `Ddip Geo Optimization/main slayder.png` | `public/images/geo/hero-slider.png` | Hero image |
| `Ddip Geo Optimization/aset_01.png` | `public/images/geo/asset-01.png` | Section asset |
| `Ddip Geo Optimization/pgoto_02.png` | `public/images/geo/photo-02.png` | Section photo |
| `Ddip Geo Optimization/icons/001.svg` - `006.svg` | `public/images/geo/icon-01.svg` - `06.svg` | 6 feature icons |
| `Ddip Geo Optimization/Use Cases/001.png` - `005.png` | `public/images/geo/usecase-01.png` - `05.png` | 5 use case screenshots |
| `Ddip Geo Optimization/What GEO Optimization/001.png` - `006.png` | `public/images/geo/what-geo-01.png` - `06.png` | 6 "What is GEO" images |
| `Ddip Geo Optimization/What We Optimize/001.png` - `004.png` | `public/images/geo/optimize-01.png` - `04.png` | 4 optimization area images |
| `Ddip Geo Optimization/Why GEO Matters Now/*.png` (5 files) | `public/images/geo/why-geo-*.png` | 5 "Why GEO" section images |

### Our Process Page (`/process`)
**Figma page:** Based on folder structure — "OUR PROCESS"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `OUR PROCESS/001.png` | `public/images/process/hero.png` | Hero/intro image |
| `OUR PROCESS/main video.mp4` | `public/videos/process/main.mp4` | Main process video |
| `OUR PROCESS/From First Contact to Long-Term Partnership.png` | `public/images/process/partnership-overview.png` | Overview diagram |
| `OUR PROCESS/From First Contact.../001.png` - `005.png` | `public/images/process/step-01.png` - `05.png` | 5 process step images |
| `OUR PROCESS/From Insight to Intelligent Impact/Group 641.png` | `public/images/process/insight-641.png` | Insight diagram 1 |
| `OUR PROCESS/From Insight to Intelligent Impact/Group 642.png` | `public/images/process/insight-642.png` | Insight diagram 2 |
| `OUR PROCESS/How We Work/001 3.png`, `004 1.png`, `006 1.png` | `public/images/process/how-01.png` - `03.png` | 3 "How We Work" images |
| `OUR PROCESS/What This Process Delivers/001.png` - `004.png` | `public/images/process/delivers-01.png` - `04.png` | 4 deliverable images |

### The Mind Behind Page (`/the-mind-behind`)
**Figma page:** "The Mind Behind"

| Asset File | Copy To | Used For |
|-----------|---------|----------|
| `The Mind Behind/main video.mp4` | `public/videos/mind-behind/main.mp4` | Hero video |
| `The Mind Behind/Every project.../A_01 1.png` - `a_03 1.png` | `public/images/mind-behind/project-01.png` - `03.png` | 3 "Every project" section images |
| `The Mind Behind/Human + AI, By Design/001.png` | `public/images/mind-behind/human-ai-hero.png` | Human+AI section hero |
| `The Mind Behind/Human + AI.../photo_02.png`, `photo_03.png` | `public/images/mind-behind/photo-02.png`, `photo-03.png` | Section photos |
| `The Mind Behind/Human + AI.../icons/001.svg` - `003.svg` | `public/images/mind-behind/icon-01.svg` - `03.svg` | 3 feature icons |
| `The Mind Behind/.../A System Not a Shortcut/003.png` | `public/images/mind-behind/system-03.png` | System section image |
| `The Mind Behind/.../A System Not a Shortcut/BB_*.png` (3) | `public/images/mind-behind/bb-01.png` - `03.png` | 3 system detail images |

---

## EXECUTION STATUS (Updated 2026-02-27)

### 1. Videos Replace Images — DONE
All homepage sections converted from `<img>` to `<video>` where Figma uses video:
- [x] **Section 4 (Our AI Solutions):** Cards 1 & 3 now use `<video>` with `mediaType` conditional
- [x] **Section 5 (Selected Work):** ALL 4 grid items now `<video autoPlay muted loop playsInline>`
- [x] **Section 6 (DDip Approach):** Full-width `<video>` with `main-slider.mp4`
- [x] **AI Commercial inner page:** Showreel converted to `<video>`
- [ ] **Other inner pages:** Videos copied but page code not yet updated

### 2. Large Files Need Compression — PENDING
| File | Size | Status |
|------|------|--------|
| `AI content generation/Finish it/Vesta AI Infv3.mp4` | 170MB | **Skipped** — needs compression |
| `AI commercial production/video.mp4` | 144MB | **Skipped** — needs compression |
| `AI commercial production/What We Produce/*.mp4` | 24-69MB each | Copied as-is |
| `AI commercial production/main slayder.png` | 6.5MB | Copied as-is |
| `AI content generation/mail slayder.png` | 4.1MB | Copied as-is |

### 3. Missing Assets (Need from Client) — PARTIALLY RESOLVED
- [ ] **Partner logos (individual):** Still needed — AWS, Google Cloud, Google Partner, Microsoft, Salesforce
- [x] **Hero image:** Resolved — using `banner.png` as hero background
- [x] **DDip AI logo:** Already in codebase as text/SVG component
- [ ] **WhatsApp/Chat widget assets:** Still using placeholder avatar
- [ ] **Work portfolio thumbnails:** No poster frames for video loading states
- [ ] **Selected Work subtitles:** Still "Lorem Ipsum is simply" placeholder

### 4. Placeholder Replacements — ALL DONE
| Current Placeholder | Replaced With | Status |
|-------------------|-------------|--------|
| `homepage/hero-ai-influencer.png` | `homepage/hero-banner.png` | **Done** |
| `homepage/future-face-1.jpg` - `5.jpg` | `homepage/influencer-01.png` - `influencer-10.png` | **Done** (10 portraits) |
| `ai-solutions/card-content-gen.jpg` | Video: `videos/solutions/ai-content-gen.mp4` | **Done** |
| `ai-solutions/card-influencer.jpg` | `homepage/solution-influencer.jpg` | **Done** |
| `ai-solutions/card-automation.jpg` | Video: `videos/solutions/automation.mp4` | **Done** |
| `homepage/approach-1.jpg` | Video: `videos/main-slider.mp4` | **Done** |
| `partners/automation-tools.jpg` | 12 individual logos in `images/ai-tools/` | **Done** |

### 5. Copy Script — EXECUTED
All assets were copied on 2026-02-27. Turkish characters in filenames required wildcard workarounds.

### 6. File Naming Convention
All destination files follow:
- **Lowercase, kebab-case**: `influencer-01.png`, not `001.png`
- **Descriptive prefixes**: `hero-`, `icon-`, `portrait-`, `usecase-`, `frame-`
- **Videos in `/videos/` subfolder**, images in `/images/` subfolder
- **Page-scoped directories**: `images/homepage/`, `images/ai-influencer/`, `images/ai-commercial/`, etc.

### 7. Verification Results (2026-02-27)
- **55 network requests** — all returned 200/304 (zero 404s)
- **24 key asset URLs** — all verified HTTP 200 via curl
- **Visual screenshots** — all sections confirmed rendering real assets
- **TypeScript build** — 0 errors
