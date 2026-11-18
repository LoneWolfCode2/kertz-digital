// Builds src/content/busy-season.json from the Google Trends exports in
// data/google-trends/. See data/google-trends/README.md.
//
// Method: Google Trends values drift with long-term growth, so each month is
// compared with a centered 12-month average around it (removes the trend).
// The median of those ratios for each calendar month is the seasonal index,
// scaled so the year averages 100. The current (partial) month is dropped.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "data/google-trends");

const SOURCES = [
  { file: "ac-repair.csv", term: "ac repair", trade: "HVAC" },
  { file: "plumber.csv", term: "plumber", trade: "Plumbing" },
  { file: "electrician.csv", term: "electrician", trade: "Electrical" },
  { file: "roof-repair.csv", term: "roof repair", trade: "Roofing" },
  { file: "landscaping.csv", term: "landscaping", trade: "Landscaping" },
  { file: "pest-control.csv", term: "pest control", trade: "Pest control" },
];

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function seasonalIndex(csv) {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [date, value] = line.split(",").map((c) => c.replace(/"/g, ""));
      return { month: Number(date.slice(5, 7)), date, value: Number(value) };
    })
    .filter((r) => Number.isFinite(r.value));
  rows.pop(); // current month is partial
  const ratios = Array.from({ length: 12 }, () => []);
  for (let i = 6; i < rows.length - 6; i++) {
    const w = rows.slice(i - 6, i + 7).map((r) => r.value);
    const avg =
      (w.slice(1, -1).reduce((a, b) => a + b, 0) + (w[0] + w[12]) / 2) / 12;
    if (avg > 0) ratios[rows[i].month - 1].push(rows[i].value / avg);
  }
  if (ratios.some((r) => r.length === 0)) {
    throw new Error("Need at least 2 full years of monthly data");
  }
  const idx = ratios.map(median);
  const mean = idx.reduce((a, b) => a + b, 0) / 12;
  return {
    index: idx.map((v) => Math.round((v / mean) * 100)),
    from: rows[0].date.slice(0, 7),
    to: rows.at(-1).date.slice(0, 7),
  };
}

const trades = [];
for (const s of SOURCES) {
  const file = path.join(dir, s.file);
  if (!existsSync(file)) {
    console.log(`skip ${s.trade}: ${s.file} not found`);
    continue;
  }
  const { index, from, to } = seasonalIndex(readFileSync(file, "utf8"));
  trades.push({ trade: s.trade, term: s.term, from, to, index });
  console.log(s.trade.padEnd(14), index.join(" "));
}

const out = path.join(root, "src/content/busy-season.json");
writeFileSync(
  out,
  `${JSON.stringify({ region: "Austin TX", trades }, null, 2)}\n`,
);
console.log(`wrote ${path.relative(root, out)}`);
