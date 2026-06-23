// Structural validation of content/curriculum.json, run in `predev` and CI so
// malformed content never starts the dev server or ships. This is a plain-JS
// safety net; the app also runs the full zod schema at load time (fail-loud).
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, '../content/curriculum.json');

const BLOCK_TYPES = ['text', 'term', 'evidence', 'debate', 'figure', 'image', 'quiz'];
const CONFIDENCE = ['established', 'contested', 'open'];
const DIFFICULTY = ['easy', 'medium', 'hard'];
const QTYPE = ['single', 'truefalse'];

const problems = [];
const fail = (msg) => problems.push(msg);

function checkQuestion(q, where) {
  if (!q.id) fail(`${where}: question missing id`);
  if (!q.stem) fail(`${where} (${q.id}): missing stem`);
  if (!QTYPE.includes(q.type)) fail(`${where} (${q.id}): bad type "${q.type}"`);
  if (!Array.isArray(q.choices) || q.choices.length < 2)
    fail(`${where} (${q.id}): needs ≥2 choices`);
  if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= (q.choices?.length ?? 0))
    fail(`${where} (${q.id}): answer index out of range`);
  if (q.type === 'truefalse' && q.choices?.length !== 2)
    fail(`${where} (${q.id}): truefalse needs exactly 2 choices`);
  if (!q.explanation) fail(`${where} (${q.id}): missing explanation`);
  if (!DIFFICULTY.includes(q.difficulty)) fail(`${where} (${q.id}): bad difficulty`);
}

function checkBlock(b, where) {
  if (!BLOCK_TYPES.includes(b.type)) {
    fail(`${where}: unknown block type "${b.type}"`);
    return;
  }
  if (b.type === 'evidence' || b.type === 'debate') {
    if (!CONFIDENCE.includes(b.confidence))
      fail(`${where}: ${b.type} block has bad confidence "${b.confidence}"`);
  }
  if (b.type === 'debate') {
    if (!Array.isArray(b.positions) || b.positions.length < 2)
      fail(`${where}: debate needs ≥2 positions`);
  }
  if (b.type === 'quiz') {
    if (!Array.isArray(b.questions) || b.questions.length < 1)
      fail(`${where}: quiz needs ≥1 question`);
    else b.questions.forEach((q) => checkQuestion(q, `${where} quiz`));
  }
}

async function main() {
  let data;
  try {
    data = JSON.parse(await readFile(FILE, 'utf8'));
  } catch (e) {
    console.error(`✗ Could not read/parse ${FILE}:\n  ${e.message}`);
    process.exit(1);
  }

  if (!data.meta || !data.meta.title) fail('meta.title missing');
  if (!Array.isArray(data.eras) || data.eras.length === 0) fail('eras[] missing/empty');
  if (!Array.isArray(data.units) || data.units.length === 0) fail('units[] missing/empty');

  const eraIds = new Set((data.eras ?? []).map((e) => e.id));
  const coreIds = new Set(
    (data.units ?? []).filter((u) => u.kind === 'core').map((u) => u.id),
  );
  const unitIds = new Set();
  const questionIds = new Set();

  for (const u of data.units ?? []) {
    const where = `unit ${u.id}`;
    if (!u.id) fail('a unit is missing id');
    if (unitIds.has(u.id)) fail(`duplicate unit id: ${u.id}`);
    unitIds.add(u.id);
    if (!eraIds.has(u.eraId)) fail(`${where}: unknown eraId "${u.eraId}"`);
    if (!['core', 'deepdive'].includes(u.kind)) fail(`${where}: bad kind`);
    if (!['available', 'planned'].includes(u.status)) fail(`${where}: bad status`);
    if (u.kind === 'deepdive' && (typeof u.extends !== 'string' || !coreIds.has(u.extends)))
      fail(`${where}: deepdive must extend an existing core unit (got "${u.extends}")`);
    if (u.status === 'available' && (!Array.isArray(u.screens) || u.screens.length === 0))
      fail(`${where}: available unit has no screens`);

    for (const b of u.screens ?? []) {
      checkBlock(b, where);
      if (b.type === 'quiz') {
        for (const q of b.questions ?? []) {
          if (questionIds.has(q.id)) fail(`duplicate question id: ${q.id}`);
          questionIds.add(q.id);
        }
      }
    }
  }

  if (problems.length) {
    console.error(`✗ content/curriculum.json has ${problems.length} problem(s):`);
    for (const p of problems) console.error(`  • ${p}`);
    process.exit(1);
  }
  console.log(
    `✓ content valid — ${data.eras.length} eras, ${data.units.length} units, ${questionIds.size} questions.`,
  );
}

main();
