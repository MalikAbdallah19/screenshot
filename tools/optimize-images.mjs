import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const tierDir = path.join(root, "assets", "tierlists");

const imageBaseNames = ["tank", "dps", "support"];

async function optimizeImage(baseName) {
  const input = path.join(tierDir, `${baseName}.png`);
  const outputWebp = path.join(tierDir, `${baseName}.webp`);
  const outputAvif = path.join(tierDir, `${baseName}.avif`);

  await fs.access(input);

  await sharp(input)
    .webp({ quality: 82 })
    .toFile(outputWebp);

  await sharp(input)
    .avif({ quality: 52 })
    .toFile(outputAvif);

  console.log(`optimized: ${baseName}`);
}

async function run() {
  for (const baseName of imageBaseNames) {
    await optimizeImage(baseName);
  }

  console.log("image optimization finished");
}

run().catch((error) => {
  console.error("image optimization failed:", error);
  process.exitCode = 1;
});
