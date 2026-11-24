// Two-Sentence Horror — make.fun bounty u-suroto-two-sentence-horror-acea9253
// Writes one horror story of exactly two sentences (<= 400 characters)
// to /output/entry.txt. Node 22+, no dependencies, no network, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "The grief counsellor said writing letters to my dead wife would help, so every Sunday I leave one on her grave. " +
  "This morning there was a reply — in my handwriting, dated next Sunday, apologising for what I am about to do.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1–400 characters,
// non-whitespace, and the judge brief requires exactly two sentences.
// Refuse to write anything invalid rather than shipping a doomed entry.
const charCount = [...STORY].length;
if (charCount < 1 || charCount > 400) {
  throw new Error(`story must be 1-400 characters, got ${charCount}`);
}
if (STORY.trim() !== STORY || STORY.trim().length === 0) {
  throw new Error("story must be non-whitespace with no leading/trailing space");
}
const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0);
if (sentences.length !== 2) {
  throw new Error(`story must be exactly two sentences, got ${sentences.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");
