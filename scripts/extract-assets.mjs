/**
 * Extract individual image assets from Figma full-page exports.
 * Coordinates mapped from debug strip analysis.
 * Source images are 3456px wide (1728px design at 2x).
 */

import sharp from "sharp";
import { mkdir, copyFile, rm } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DL = "C:/Users/bilaa/Downloads/DDip AI_00";
const OUT = join(__dirname, "..", "public", "images");

async function dir(d) { await mkdir(d, { recursive: true }); }

async function crop(src, out, left, top, width, height, fmt = "jpg") {
  const dest = join(OUT, out);
  await dir(dirname(dest));
  try {
    let pipeline = sharp(join(DL, src)).extract({ left, top, width, height });
    if (fmt === "jpg") pipeline = pipeline.jpeg({ quality: 85 });
    else pipeline = pipeline.png();
    await pipeline.toFile(dest);
    console.log(`  ✓ ${out}`);
  } catch (e) { console.error(`  ✗ ${out}: ${e.message}`); }
}

async function copy(src, out) {
  const dest = join(OUT, out);
  await dir(dirname(dest));
  try {
    await copyFile(join(DL, src), dest);
    console.log(`  ✓ ${out} (copy)`);
  } catch (e) { console.error(`  ✗ ${out}: ${e.message}`); }
}

async function main() {
  console.log("=== DDip AI Asset Extraction v2 ===\n");

  // Clean previous debug files
  try {
    const allFiles = readdirSync(OUT);
    for (const f of allFiles) {
      if (f.startsWith("_debug_")) await rm(join(OUT, f));
    }
    console.log("Cleaned debug files\n");
  } catch { console.log("No debug files to clean\n"); }

  // ═══════════════════════════════════════════════════════
  // HOMEPAGE (DDip AI.jpg) — 3456 x 31418
  // Y-map from debug strips:
  //   y0-2000:     Hero section (dark bg, big text)
  //   y2000-3500:  "WE DON'T JUST USE AI" statement
  //   y3500-5000:  "From insights to intelligence" about
  //   y5000-6000:  "OUR AI SOLUTIONS" heading
  //   y6300-8000:  3 AI Solution cards (images)
  //   y8000-8500:  "SELECTED WORK" heading
  //   y8500-10200: Selected Work grid row 1 (4 images)
  //   y10200-11200: Selected Work grid row 2 (4 images)
  //   y11200-12500: Selected Work text + tags
  //   y12500-13000: "The DDIP Approach" heading
  //   y13000-15500: Approach images (book, etc)
  //   y15500-16500: blank + approach end
  //   y16500-17000: "THE FUTURE FACE OF BRANDS" heading (dark bg)
  //   y17000-18000: Future face filter tabs
  //   y18000-19500: Future face showcase images (5 women)
  //   y19500-20000: blank transition
  //   y20000-20500: "SMARTER WORKFLOWS" heading
  //   y21500-22500: Purple 3D blocks image
  //   y22500-24500: More workflow content
  //   y24500-25500: PARTNERS logos
  //   y25500-28500: FAQ section
  //   y28500-31418: LET'S CONNECT footer
  // ═══════════════════════════════════════════════════════

  console.log("--- Homepage ---");

  // Hero background (standalone file)
  await copy("Untitled-1 1.jpg", "homepage/hero-bg.jpg");

  // Statement section inline video/image placeholder (~y2600)
  await crop("DDip AI.jpg", "homepage/statement-video.jpg", 1050, 2700, 700, 500);

  // AI Solutions — 3 tall cards starting ~y6400
  // Card 1: AI Content Generation (golden/orange woman)
  await crop("DDip AI.jpg", "ai-solutions/card-content-gen.jpg", 60, 6400, 1080, 1500);
  // Card 2: Create Your Influencer (woman with Istanbul bg)
  await crop("DDip AI.jpg", "ai-solutions/card-influencer.jpg", 1180, 6400, 1080, 1500);
  // Card 3: Automation (blue circuits/network)
  await crop("DDip AI.jpg", "ai-solutions/card-automation.jpg", 2320, 6400, 1080, 1500);

  // Selected Work — Row 1 (4 images) starting ~y8700
  await crop("DDip AI.jpg", "works/hotel-croydon.jpg", 60, 8700, 800, 850);
  await crop("DDip AI.jpg", "works/amore.jpg", 880, 8700, 800, 850);
  await crop("DDip AI.jpg", "works/branding.jpg", 1700, 8700, 800, 850);
  await crop("DDip AI.jpg", "works/interior-design.jpg", 2540, 8700, 870, 850);

  // Selected Work — Row 2 (4 images) starting ~y10600
  await crop("DDip AI.jpg", "works/project-five.jpg", 60, 10600, 800, 850);
  await crop("DDip AI.jpg", "works/project-six.jpg", 880, 10600, 800, 850);
  await crop("DDip AI.jpg", "works/project-seven.jpg", 1700, 10600, 800, 850);
  await crop("DDip AI.jpg", "works/ephesus.jpg", 2540, 10600, 870, 850);

  // Approach section images (~y13500-15500)
  await crop("DDip AI.jpg", "homepage/approach-left.jpg", 60, 13500, 1100, 1600);
  await crop("DDip AI.jpg", "homepage/approach-right.jpg", 2200, 13500, 1200, 1600);

  // Future Face of Brands — showcase strip of women (~y18000-19500)
  await crop("DDip AI.jpg", "homepage/future-face-strip.jpg", 0, 18400, 3456, 900);
  // Individual faces
  await crop("DDip AI.jpg", "homepage/future-face-1.jpg", 30, 18400, 680, 900);
  await crop("DDip AI.jpg", "homepage/future-face-2.jpg", 720, 18400, 680, 900);
  await crop("DDip AI.jpg", "homepage/future-face-3.jpg", 1410, 18400, 680, 900);
  await crop("DDip AI.jpg", "homepage/future-face-4.jpg", 2100, 18400, 680, 900);
  await crop("DDip AI.jpg", "homepage/future-face-5.jpg", 2780, 18400, 676, 900);

  // Smarter Workflows — purple 3D blocks (~y21500)
  await crop("DDip AI.jpg", "homepage/smarter-workflows-3d.jpg", 0, 21400, 3456, 1200);

  // Partners logos row (~y24600)
  await crop("DDip AI.jpg", "partners/partners-row.jpg", 0, 24600, 3456, 600);

  // FAQ section images (right column) (~y26000, y27000)
  await crop("DDip AI.jpg", "homepage/faq-image-1.svg", 1800, 26200, 1600, 800);
  await crop("DDip AI.jpg", "homepage/faq-image-2.jpg", 1800, 27100, 1600, 800);

  // Footer lava/fire image
  await crop("DDip AI.jpg", "common/footer-lava.jpg", 2200, 29800, 1200, 600);

  // ═══════════════════════════════════════════════════════
  // AI INFLUENCER PAGE (3456 x 28810)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- AI Influencer ---");

  // Hero strip of faces
  await crop("AI INFLUENCER.jpg", "ai-solutions/influencer-hero.jpg", 0, 0, 3456, 1600);

  // Partner logos row
  await crop("AI INFLUENCER.jpg", "ai-solutions/influencer-partners.jpg", 0, 1700, 3456, 300);

  // "Meet the new era" — 3 profile cards (~y2800)
  await crop("AI INFLUENCER.jpg", "ai-solutions/influencer-card-1.jpg", 60, 2900, 1060, 1000);
  await crop("AI INFLUENCER.jpg", "ai-solutions/influencer-card-2.jpg", 1180, 2900, 1060, 1000);
  await crop("AI INFLUENCER.jpg", "ai-solutions/influencer-card-3.jpg", 2320, 2900, 1060, 1000);

  // "Every Industry" section images (~y6600)
  await crop("AI INFLUENCER.jpg", "ai-solutions/industry-row.jpg", 0, 6400, 3456, 1000);

  // "DEFINE DESIGN DEVELOP" text marquee section
  await crop("AI INFLUENCER.jpg", "ai-solutions/define-marquee.jpg", 0, 7800, 3456, 600);

  // "From Idea to Identity" — large woman image on left (~y8500)
  await crop("AI INFLUENCER.jpg", "ai-solutions/idea-identity-woman.jpg", 60, 8500, 1500, 2200);

  // "How it Works" — 4D method images (~y13000)
  await crop("AI INFLUENCER.jpg", "ai-solutions/how-it-works.jpg", 0, 12800, 3456, 2000);

  // "Use Cases" gallery (~y15800)
  await crop("AI INFLUENCER.jpg", "ai-solutions/usecase-row-1.jpg", 0, 16000, 3456, 800);
  await crop("AI INFLUENCER.jpg", "ai-solutions/usecase-row-2.jpg", 0, 16900, 3456, 800);

  // ═══════════════════════════════════════════════════════
  // AI COMMERCIAL PRODUCTION (3456 x 20398)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- AI Commercial ---");

  await crop("AI commercial production.jpg", "ai-solutions/commercial-hero.jpg", 0, 0, 3456, 1800);

  // Woman presenter / what it means section (~y2000)
  await crop("AI commercial production.jpg", "ai-solutions/commercial-woman.jpg", 60, 2200, 1600, 2400);

  // Blue document/brochure images (~y3000)
  await crop("AI commercial production.jpg", "ai-solutions/commercial-brochure.jpg", 1700, 2600, 1700, 1200);

  // "Our Method" / showreel area
  await crop("AI commercial production.jpg", "ai-solutions/commercial-showreel.jpg", 0, 5000, 3456, 1500);

  // Bottom production gallery
  await crop("AI commercial production.jpg", "ai-solutions/commercial-gallery.jpg", 0, 7000, 3456, 1200);

  // ═══════════════════════════════════════════════════════
  // AI CONTENT GENERATION (3456 x 19888)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- AI Content ---");

  await crop("AI content generation.jpg", "ai-solutions/content-hero.jpg", 0, 0, 3456, 1800);

  // "What We Generate" grid (~y5000)
  await crop("AI content generation.jpg", "ai-solutions/content-grid-row1.jpg", 0, 5000, 3456, 800);
  await crop("AI content generation.jpg", "ai-solutions/content-grid-row2.jpg", 0, 5850, 3456, 800);

  // Use Cases section images (~y12000)
  await crop("AI content generation.jpg", "ai-solutions/content-usecases.jpg", 0, 12000, 3456, 1500);

  // ═══════════════════════════════════════════════════════
  // AUTOMATION (3456 x 19386)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- Automation ---");

  await crop("Automation with a Creative Touch.jpg", "ai-solutions/automation-hero.jpg", 0, 0, 3456, 1800);

  // "Tailored Workflows" image (~y7000)
  await crop("Automation with a Creative Touch.jpg", "ai-solutions/automation-workflow.jpg", 0, 7200, 3456, 1600);

  // 4D Method section
  await crop("Automation with a Creative Touch.jpg", "ai-solutions/automation-4d.jpg", 0, 10600, 3456, 1800);

  // Tech logos (Zapier, HubSpot, n8n, Claude)
  await crop("Automation with a Creative Touch.jpg", "partners/automation-tools.jpg", 0, 12600, 3456, 500);

  // ═══════════════════════════════════════════════════════
  // GEO OPTIMIZATION (3456 x 23780)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- GEO Optimization ---");

  await crop("Ddip Geo Optimization.jpg", "ai-solutions/geo-hero.jpg", 0, 0, 3456, 1800);
  // "What We Optimize" images (~y8000)
  await crop("Ddip Geo Optimization.jpg", "ai-solutions/geo-optimize-grid.jpg", 0, 8200, 3456, 800);

  // ═══════════════════════════════════════════════════════
  // WORKS PAGE (3456 x 11274)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- Works ---");

  await crop("Work.jpg", "works/works-hero.jpg", 0, 0, 3456, 800);

  // Works grid — 3 rows x 4 cols
  // Row 1 starts ~y900
  await crop("Work.jpg", "works/grid-r1-c1.jpg", 60, 900, 820, 1100);
  await crop("Work.jpg", "works/grid-r1-c2.jpg", 900, 900, 820, 1100);
  await crop("Work.jpg", "works/grid-r1-c3.jpg", 1740, 900, 820, 1100);
  await crop("Work.jpg", "works/grid-r1-c4.jpg", 2580, 900, 830, 1100);

  // Row 2 starts ~y2200
  await crop("Work.jpg", "works/grid-r2-c1.jpg", 60, 2200, 820, 1100);
  await crop("Work.jpg", "works/grid-r2-c2.jpg", 900, 2200, 820, 1100);
  await crop("Work.jpg", "works/grid-r2-c3.jpg", 1740, 2200, 820, 1100);
  await crop("Work.jpg", "works/grid-r2-c4.jpg", 2580, 2200, 830, 1100);

  // Row 3 starts ~y3500
  await crop("Work.jpg", "works/grid-r3-c1.jpg", 60, 3500, 820, 1100);
  await crop("Work.jpg", "works/grid-r3-c2.jpg", 900, 3500, 820, 1100);
  await crop("Work.jpg", "works/grid-r3-c3.jpg", 1740, 3500, 820, 1100);
  await crop("Work.jpg", "works/grid-r3-c4.jpg", 2580, 3500, 830, 1100);

  // ═══════════════════════════════════════════════════════
  // THE MIND BEHIND (3456 x 20632)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- The Mind Behind ---");

  await crop("The Mind Behind.jpg", "team/mind-hero.jpg", 0, 0, 3456, 1500);

  // Abstract 3D images used in various sections
  await crop("The Mind Behind.jpg", "team/abstract-brain-1.jpg", 60, 3600, 1600, 1200);
  await crop("The Mind Behind.jpg", "team/abstract-brain-2.jpg", 1800, 3600, 1600, 1200);

  // "Human + AI By Design" section images (~y5000)
  await crop("The Mind Behind.jpg", "team/human-ai-cards.jpg", 1800, 5200, 1600, 1200);

  // "A System Not a Shortcut" image (~y7500)
  await crop("The Mind Behind.jpg", "team/system-image.jpg", 1800, 7800, 1600, 1200);

  // "Trends change" decorative C icon (~y10500)
  await crop("The Mind Behind.jpg", "team/trends-icon.jpg", 60, 11000, 800, 800);

  // "The Future We Believe In" dark section (~y14000)
  await crop("The Mind Behind.jpg", "team/future-believe.jpg", 0, 14200, 3456, 1800);

  // ═══════════════════════════════════════════════════════
  // INSIGHTS (3456 x 9628)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- Insights ---");

  await crop("Insights.jpg", "insights/insights-hero.jpg", 0, 0, 3456, 600);

  // Article thumbnails — 2 rows of 3
  // Row 1 starts ~y1200
  await crop("Insights.jpg", "insights/thumb-1.jpg", 60, 1200, 1080, 750);
  await crop("Insights.jpg", "insights/thumb-2.jpg", 1180, 1200, 1080, 750);
  await crop("Insights.jpg", "insights/thumb-3.jpg", 2300, 1200, 1100, 750);

  // Row 2 starts ~y2200
  await crop("Insights.jpg", "insights/thumb-4.jpg", 60, 2200, 1080, 750);
  await crop("Insights.jpg", "insights/thumb-5.jpg", 1180, 2200, 1080, 750);
  await crop("Insights.jpg", "insights/thumb-6.jpg", 2300, 2200, 1100, 750);

  // ═══════════════════════════════════════════════════════
  // INSIGHTS DETAIL (3456 x 17400)
  // ═══════════════════════════════════════════════════════
  console.log("\n--- Insights Detail ---");

  await crop("Insights detail.jpg", "insights/detail-hero.jpg", 0, 0, 3456, 2400);
  // Article body images
  await crop("Insights detail.jpg", "insights/detail-body-1.jpg", 400, 4500, 2600, 1500);
  await crop("Insights detail.jpg", "insights/detail-body-2.jpg", 400, 7000, 2600, 1500);

  // ═══════════════════════════════════════════════════════
  // STANDALONE ASSETS
  // ═══════════════════════════════════════════════════════
  console.log("\n--- Standalone ---");

  await copy("Layer-4 1.png", "icons/play-button-3d.png");
  await copy("influencer-pop-up.png", "homepage/influencer-popup.png");
  await copy("freepik__i-also-need-to-promote-my-sublimation-printer-with__6957 2.png", "common/woman-printer.png");

  // DDip AI-1.jpg = Navbar mega-menu screenshot
  await copy("DDip AI-1.jpg", "common/mega-menu-ref.jpg");

  // Work-1.jpg = Works list view
  await copy("Work-1.jpg", "common/works-list-ref.jpg");

  console.log("\n=== Extraction Complete ===");
}

main().catch(console.error);
