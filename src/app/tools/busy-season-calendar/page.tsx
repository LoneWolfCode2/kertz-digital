import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { SeasonCell } from "@/components/season-cell";
import { CtaBand } from "@/components/sections/cta-band";
import { getSeasons, LEVELS, MONTHS } from "@/lib/busy-season";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Austin Busy-Season Calendar for Home Service Trades",
  description:
    "Month-by-month busy seasons for Austin HVAC, plumbing, electrical, roofing, landscaping, and pest control, from Google search data. Free.",
  path: "/tools/busy-season-calendar",
});

const monthYear = (ym: string) =>
  new Date(`${ym}-01T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default function BusySeasonPage() {
  const { region, from, to, trades } = getSeasons();
  const terms = trades.map((t) => `“${t.term}”`).join(", ");

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Free tools", path: "/tools" },
          {
            name: "Busy-season calendar",
            path: "/tools/busy-season-calendar",
          },
        ])}
      />
      <PageHeader
        eyebrow="Free tools / Busy-season calendar"
        title="When does your phone ring most?"
        lead="Month by month, when Austin homeowners search for each trade. Use it to line up reviews, offers, and crews before the rush, not during it."
      />

      <section className="container-kd section-y">
        <ul aria-label="Legend" className="flex flex-wrap gap-x-6 gap-y-3">
          {LEVELS.map((l) => (
            <li key={l.level} className="flex items-center gap-3 text-sm">
              <SeasonCell level={l.level} className="w-16" />
              <span className="text-muted-foreground">{l.meaning}</span>
            </li>
          ))}
        </ul>

        {/* Table on larger screens */}
        <div className="mt-10 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] border-collapse">
            <caption className="sr-only">
              Busy season by trade and month in {region}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="label-mono w-36 pb-3 text-left text-muted-foreground"
                >
                  Trade
                </th>
                {MONTHS.map((m) => (
                  <th
                    key={m}
                    scope="col"
                    className="label-mono pb-3 text-muted-foreground"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => (
                <tr key={t.trade}>
                  <th scope="row" className="py-1 pr-4 text-left font-semibold">
                    {t.trade}
                  </th>
                  {t.months.map((m) => (
                    <td key={m.month} className="p-0.5">
                      <SeasonCell level={m.level} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid border-t border-l border-border md:grid-cols-2 lg:grid-cols-3">
          {trades.map((t) => (
            <article
              key={t.trade}
              className="border-r border-b border-border bg-card p-6"
            >
              <h2 className="font-display text-lg">{t.trade}</h2>
              <p className="mt-2 font-semibold">{t.summary}</p>
              {t.prep && (
                <p className="mt-1 text-sm text-muted-foreground">{t.prep}</p>
              )}
              {/* Month grid on phones */}
              <div className="mt-4 grid grid-cols-6 gap-1 md:hidden">
                {t.months.map((m) => (
                  <SeasonCell key={m.month} level={m.level} month={m.month} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 max-w-[70ch] space-y-3 text-sm text-muted-foreground text-pretty">
          <p>
            <span className="font-semibold text-foreground">
              Where this comes from:
            </span>{" "}
            Google search interest in the {region} area for {terms}, from{" "}
            {monthYear(from)} to {monthYear(to)}. Long-term growth is removed so
            only the seasonal pattern is left. It shows when people search, not
            exact call counts for any one business.
          </p>
        </div>
      </section>

      <CtaBand
        title="Get ready before your busy season."
        lead="A free 20-minute lead audit: we'll make sure every call during the rush turns into a booked job."
      />
    </main>
  );
}
