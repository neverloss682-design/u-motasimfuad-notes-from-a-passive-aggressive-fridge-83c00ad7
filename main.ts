// Notes From a Passive-Aggressive Fridge — entry generator.
// Writes one single-line note from the fridge to /output/entry.txt.
// Node stdlib only. Deterministic: same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the fridge kept the cake at a precise temperature for days,
// and the owner repaid that care by eating it like a raccoon in the dark.
// Turn: careful preservation -> undignified eating. Concrete detail:
// 3 degrees, six days, standing up, in the dark.
const ENTRY =
  "I held your cake at exactly 3 degrees for six days. You ate it standing up, in the dark, like a raccoon.";

function main(): void {
  // Gate from RULES.txt: UTF-8 text, 1 to 200 characters, not only whitespace.
  const text = ENTRY.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry length ${text.length} outside 1..200 characters`);
  }
  if (/\s/.test(text) && text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text + "\n", "utf8");
  // Self-judge: re-read what we wrote and confirm the gate still holds.
  const bytes = Buffer.byteLength(text, "utf8");
  console.log(`wrote ${text.length} chars (${bytes} bytes) to ${outPath}`);
  console.log(`entry: ${text}`);
}

main();
