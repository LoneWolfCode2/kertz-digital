export type LeakInputs = {
  callsPerWeek: number;
  missedPct: number;
  bookRate: number;
  avgJob: number;
};
export const DEFAULT_INPUTS: LeakInputs = {
  callsPerWeek: 30,
  missedPct: 20,
  bookRate: 40,
  avgJob: 400,
};

export function calcLeak({
  callsPerWeek,
  missedPct,
  bookRate,
  avgJob,
}: LeakInputs) {
  const missedPerWeek = callsPerWeek * (missedPct / 100);
  const lostJobsPerWeek = missedPerWeek * (bookRate / 100);
  const lostPerWeek = lostJobsPerWeek * avgJob;
  return {
    missedPerWeek,
    lostJobsPerWeek,
    lostPerMonth: (lostPerWeek * 52) / 12,
    lostPerYear: lostPerWeek * 52,
  };
}

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
