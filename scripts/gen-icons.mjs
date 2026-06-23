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
const BAND_1 = '#E3CFA2';
const BAND_2 = '#D2B582';
const BAND_3 = '#BD9A63';
// Serif "A" outlined to a path (no font dependency), in 64-unit favicon coords.
const A_PATH = 'M32 13 L45 47 H38.6 L35.9 39 H28.1 L25.4 47 H19 L32 13 Z M30 33.2 H34 L32 26.6 Z';

// "Monument": a lapis serif A standing on bold stratigraphic earth bands, on a
// warm parchment field — matches public/favicon.svg. `bleed` = full-bleed square
// (maskable); otherwise a rounded "app tile". The earth bands always span the
// full width; for the maskable variant the A is shrunk toward its feet so it
// stays inside the ~80% safe zone while still standing on the bands.
function brandSvg({ size = 512, bleed = false } = {}) {
  const s = size;
  const k = s / 64; // scale the 64-unit composition up to the icon size
  const radius = bleed ? 0 : s * 0.22;
  const aScale = bleed ? 0.82 : 1; // shrink the letter for the maskable safe zone
  const cid = `tile-${s}-${bleed ? 'b' : 'r'}`;
  const sky = `sky-${s}-${bleed ? 'b' : 'r'}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="${sky}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PARCH_TOP}"/>
      <stop offset="1" stop-color="${PARCH_BOT}"/>
    </linearGradient>
    <clipPath id="${cid}"><rect width="${s}" height="${s}" rx="${radius}"/></clipPath>
  </defs>
  <g clip-path="url(#${cid})">
    <rect width="${s}" height="${s}" fill="url(#${sky})"/>
    <g transform="scale(${k})">
      <rect x="0" y="47" width="64" height="6" fill="${BAND_1}"/>
      <rect x="0" y="53" width="64" height="5" fill="${BAND_2}"/>
      <rect x="0" y="58" width="64" height="6" fill="${BAND_3}"/>
      <g transform="translate(32 47) scale(${aScale}) translate(-32 -47)">
        <path d="${A_PATH}" fill="${LAPIS}"/>
      </g>
    </g>
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
