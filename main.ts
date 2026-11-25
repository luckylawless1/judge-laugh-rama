// Make the AI Judge Laugh — make.fun bounty u-rama-melon-make-the-ai-judge-laugh-302d0825
//
// Writes ONE office-life joke, one line, under 200 characters, to /output/entry.txt.
// The judge weighs, in order: truth of the office observation, surprise of the
// twist, tightness of the line, freshness. Candidates are scored on those four
// axes and the best one wins. Output is fully deterministic.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

interface Candidate {
  text: string;
  // Scores out of 10, in the judge's own priority order.
  truth: number; // how true the office observation is
  surprise: number; // how surprising the twist is
  tightness: number; // how tight the line is, no wasted setup
  freshness: number; // how original it feels
}

const CANDIDATES: Candidate[] = [
  {
    text: "We get unlimited paid time off, which is great — nobody takes any, because the real limit was guilt all along.",
    truth: 10,
    surprise: 9,
    tightness: 8,
    freshness: 9,
  },
  {
    text: "I told my boss I was burned out, so he promoted me — same job, fancier title, no raise.",
    truth: 9,
    surprise: 7,
    tightness: 9,
    freshness: 7,
  },
  {
    text: "The office printer finally works, and now nobody trusts it — we spent years bonding over hating it.",
    truth: 8,
    surprise: 7,
    tightness: 8,
    freshness: 6,
  },
  {
    text: "HR said my job title doesn't define me, which is comforting, because my salary certainly doesn't either.",
    truth: 8,
    surprise: 6,
    tightness: 7,
    freshness: 6,
  },
  {
    text: "My calendar is so full that lunch needs a meeting invite now — and even lunch gets rescheduled.",
    truth: 9,
    surprise: 6,
    tightness: 8,
    freshness: 5,
  },
];

function score(c: Candidate): number {
  // Weighted in the judge's priority order: truth first, then surprise,
  // tightness, freshness.
  return c.truth * 4 + c.surprise * 3 + c.tightness * 2 + c.freshness * 1;
}

function pickBest(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates.slice(1)) {
    if (score(c) > score(best)) best = c;
  }
  return best;
}

function main(): void {
  const entry = pickBest(CANDIDATES).text;

  // Gate: 1–200 characters, not only whitespace, single line, no trailing
  // whitespace (a trailing newline or space would waste the judge's one
  // breath and could trip the gate's "not only whitespace" reading).
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry is ${entry.length} characters, must be 1–200`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (/[\r\n]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }

  // Prepare /output: create it if missing, clear ONLY its contents,
  // never the directory itself (the grader mounts it).
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
  }

  writeFileSync(OUTPUT_FILE, entry, "utf8");

  // Read-back verification: the bytes on disk must be exactly the intended
  // entry, valid UTF-8, and still inside the 1–200 character gate.
  const roundTrip = readFileSync(OUTPUT_FILE, "utf8");
  if (roundTrip !== entry) {
    throw new Error("read-back mismatch: file contents differ from the entry");
  }
  if (roundTrip.length < 1 || roundTrip.length > 200) {
    throw new Error(`written entry is ${roundTrip.length} characters, must be 1–200`);
  }
  console.log(`wrote ${entry.length} chars to ${OUTPUT_FILE}`);
}

main();
