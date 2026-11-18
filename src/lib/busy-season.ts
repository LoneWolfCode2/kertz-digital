import data from "@/content/busy-season.json";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Level = "Peak" | "Busy" | "Steady" | "Slow";

/** Seasonal index (year average = 100) to a plain-English level. */
export function level(index: number): Level {
  if (index >= 125) return "Peak";
  if (index >= 108) return "Busy";
  if (index >= 92) return "Steady";
  return "Slow";
}

export const LEVELS: { level: Level; meaning: string }[] = [
  { level: "Peak", meaning: "25%+ above an average month" },
  { level: "Busy", meaning: "8–25% above average" },
  { level: "Steady", meaning: "Close to average" },
  { level: "Slow", meaning: "8%+ below average" },
];

/** The strongest run of Busy/Peak months, wrapping Dec→Jan. */
function busiestRun(index: number[]) {
  const busy = index.map((v) => v >= 108);
  if (busy.every(Boolean) || !busy.some(Boolean)) return null;
  const start0 = busy.findIndex((b, i) => b && !busy[(i + 11) % 12]);
  let best: number[] = [];
  let bestScore = -1;
  let run: number[] = [];
  for (let k = 0; k <= 12; k++) {
    const i = (start0 + k) % 12;
    if (k < 12 && busy[i]) run.push(i);
    else if (run.length) {
      const score = run.reduce((a, m) => a + index[m], 0);
      if (score > bestScore) [best, bestScore] = [run, score];
      run = [];
    }
  }
  return best;
}

export type TradeSeason = {
  trade: string;
  term: string;
  months: { month: string; index: number; level: Level }[];
  summary: string;
  prep?: string;
};

export function getSeasons(): {
  region: string;
  from: string;
  to: string;
  trades: TradeSeason[];
} {
  const trades = data.trades.map((t) => {
    const run = busiestRun(t.index);
    const span = run
      ? run.length === 1
        ? MONTH_NAMES[run[0]]
        : `${MONTH_NAMES[run[0]]} to ${MONTH_NAMES[run.at(-1) as number]}`
      : null;
    return {
      trade: t.trade,
      term: t.term,
      months: t.index.map((v, i) => ({
        month: MONTHS[i],
        index: v,
        level: level(v),
      })),
      summary: span ? `Busiest: ${span}.` : "Fairly steady all year.",
      prep: run
        ? `Line up reviews, offers, and staff in ${MONTH_NAMES[(run[0] + 11) % 12]}.`
        : undefined,
    };
  });
  return {
    region: data.region,
    from: data.trades[0]?.from ?? "",
    to: data.trades[0]?.to ?? "",
    trades,
  };
}
