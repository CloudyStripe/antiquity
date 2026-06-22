// Generates the PWA raster icons from a single inline brand SVG.
// We cannot fetch external images, so every icon is derived from this one master.
// Run via `npm run gen-icons` (also runs automatically in `prebuild`).
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/icons');

const LAPIS = '#2E5A88';
const PARCH_TOP = '#F7F1E6';
const PARCH_BOT = '#EFE5D2';

// The serif "A" + stratigraphy baseline mark, parameterised by background treatment.
// `bleed` = full-bleed background (for maskable); otherwise a rounded "app tile".
function brandSvg({ size = 512, bleed = false } = {}) {
  const s = size;
  // For maskable, keep the mark inside the ~80% safe zone by scaling/translating it.
  const markScale = bleed ? 0.62 : 0.78;
  const inner = s * markScale;
  const offset = (s - inner) / 2;
  const radius = bleed ? 0 : s * 0.22;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PARCH_TOP}"/>
      <stop offset="1" stop-color="${PARCH_BOT}"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${s}" rx="${radius}" fill="url(#bg)"/>
  <g transform="translate(${offset} ${offset}) scale(${inner / 64})">
    <rect x="10" y="46" width="44" height="3" rx="1.5" fill="#C9B79A"/>
    <rect x="14" y="51" width="36" height="2.5" rx="1.25" fill="#D8C9B0"/>
    <path d="M32 13 L45 47 H38.6 L35.9 39 H28.1 L25.4 47 H19 L32 13 Z M30 33.2 H34 L32 26.6 Z" fill="${LAPIS}"/>
  </g>
</svg>`;
}

async function render(svg, size, file) {
  const buf = Buffer.from(svg);
  await sharp(buf, { density: 512 })
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT, file));
  console.log(`  ✓ ${file} (${size}×${size})`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log('Generating PWA icons →', OUT);
  await render(brandSvg({ size: 192 }), 192, 'icon-192.png');
  await render(brandSvg({ size: 512 }), 512, 'icon-512.png');
  await render(brandSvg({ size: 512, bleed: true }), 512, 'icon-maskable-512.png');
  await render(brandSvg({ size: 180 }), 180, 'apple-touch-icon-180.png');
  // Keep a copy of the master SVG for reference / future tweaks.
  await writeFile(resolve(OUT, 'icon-master.svg'), brandSvg({ size: 512 }), 'utf8');
  console.log('Done.');
}

main().catch((err) => {
  console.error('Icon generation failed:', err);
  process.exit(1);
});
