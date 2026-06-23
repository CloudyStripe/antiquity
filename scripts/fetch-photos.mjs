// Sources openly-licensed photos from Wikimedia Commons for the shot list.
// AUTHORITATIVELY re-verifies each file's license via the Commons imageinfo API
// (hard gate: only PD / CC0 / CC BY / CC BY-SA pass), downloads a ~1600px copy,
// optimizes to webp (< 250 KB), and writes a manifest with verified credit data.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/images');
const MANIFEST = resolve(__dirname, '_photos-manifest.json');
const UA = 'AntiquityLearningApp/0.1 (educational PWA; savardskyler@gmail.com)';
const MAX_BYTES = 250 * 1024;

// outName -> exact Commons file title (verified candidates from the sourcing run)
const SHOTS = [
  ['hand-axe', 'File:Biface de St Acheul Muséum de Toulouse.jpg'],
  ['excavation-strata', 'File:Ausgrabung Harburger-Schloßstraße Profil.jpg'],
  ['tree-rings', 'File:Tree rings.jpg'],
  ['sphinx', 'File:Giza Plateau - Great Sphinx - front view.JPG'],
  ['sapiens-skull', 'File:Cro-Magnon.jpg'],
  ['cave-art', 'File:9 Bisonte Magdaleniense polícromo.jpg'],
  ['gobekli-tepe', 'File:Göbekli Tepe, Urfa.jpg'],
  ['catalhoyuk', 'File:CatalHoyukSouthArea.JPG'],
  ['stonehenge', 'File:Stonehenge2007_07_30.jpg'],
  ['clovis-point', 'File:Clovis point, 11500-9000 BC, Sevier County, Utah, chert - Natural History Museum of Utah - DSC07376.JPG'],
  ['white-sands-footprint', 'File:Human fossil tracks at White Sands New Mexico.jpg'],
  ['cuneiform-tablet', 'File:Cuneiform tablet- private letter MET DP110638.jpg'],
  ['narmer-palette', 'File:Narmer Palette.jpg'],
  ['caral', 'File:PeruCaral19.jpg'],
  ['bronze-sword', 'File:Bronze Age Sword 900-700 BC River Thames.JPG'],
];

const LICENSE_OK = /^(cc0|cc by(-sa)?(\s|\d|$)|public domain|pd)/i;

// Authors to use when the API's Artist field is empty/Unknown (attribution-required files).
const AUTHOR_OVERRIDE = {
  'hand-axe': 'Didier Descouens',
  'cuneiform-tablet': 'The Metropolitan Museum of Art',
  'sapiens-skull': '120 (Wikimedia Commons)',
  'catalhoyuk': 'Ziggurat (Wikimedia Commons)',
};

function cleanText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function api(title) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo' +
    '&iiprop=url|extmetadata|mime&iiurlwidth=1600&format=json&titles=' +
    encodeURIComponent(title);
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`API HTTP ${r.status}`);
  const j = await r.json();
  const pages = j.query.pages;
  const page = pages[Object.keys(pages)[0]];
  if (page.missing !== undefined || !page.imageinfo) throw new Error('file missing');
  return page.imageinfo[0];
}

async function optimize(buf) {
  // Try progressively smaller long edges + lower webp quality until < 250 KB.
  let smallest = null;
  for (const w of [1600, 1400, 1200]) {
    const base = sharp(buf).rotate().resize(w, w, { fit: 'inside', withoutEnlargement: true });
    for (const q of [80, 72, 64, 56, 48, 40, 34]) {
      const out = await base.clone().webp({ quality: q }).toBuffer({ resolveWithObject: true });
      const r = { data: out.data, width: out.info.width, height: out.info.height, quality: q, w };
      if (!smallest || out.data.length < smallest.data.length) smallest = r;
      if (out.data.length <= MAX_BYTES) return r;
    }
  }
  return smallest;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifest = [];
  const skipped = [];
  for (const [outName, title] of SHOTS) {
    try {
      const ii = await api(title);
      const license = cleanText(ii.extmetadata?.LicenseShortName?.value) || 'unknown';
      if (!LICENSE_OK.test(license)) {
        skipped.push({ outName, title, reason: `license "${license}" not allowed` });
        console.log(`✗ ${outName}: REJECT license "${license}"`);
        continue;
      }
      const apiAuthor = cleanText(ii.extmetadata?.Artist?.value);
      const author = apiAuthor || AUTHOR_OVERRIDE[outName] || 'Unknown';
      const downloadUrl = ii.thumburl || ii.url;
      const resp = await fetch(downloadUrl, { headers: { 'User-Agent': UA } });
      if (!resp.ok) throw new Error(`download HTTP ${resp.status}`);
      const buf = Buffer.from(await resp.arrayBuffer());
      const opt = await optimize(buf);
      await writeFile(resolve(OUT, `${outName}.webp`), opt.data);
      manifest.push({
        outName,
        file: `${outName}.webp`,
        license,
        author,
        sourceUrl: ii.descriptionurl,
        width: opt.width,
        height: opt.height,
        kb: Math.round(opt.data.length / 1024),
      });
      console.log(`✓ ${outName}: ${license} · ${author} · ${opt.width}x${opt.height} · ${Math.round(opt.data.length / 1024)}KB (q${opt.quality})`);
    } catch (e) {
      skipped.push({ outName, title, reason: e.message });
      console.log(`✗ ${outName}: ${e.message}`);
    }
  }
  await writeFile(MANIFEST, JSON.stringify({ manifest, skipped }, null, 2));
  console.log(`\nDone. ${manifest.length} ok, ${skipped.length} skipped. Manifest -> ${MANIFEST}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
