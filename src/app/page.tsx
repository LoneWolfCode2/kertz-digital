import { LeakCalculator } from "@/components/sections/leak-calculator";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-blueprint grid-fade" />
        <div className="relative container-kd py-12 lg:py-16 grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div className="lg:col-span-7">
            <p className="label-mono text-muted-foreground">
              01 / Never miss a call
            </p>
            <h1 className="font-display text-3xl mt-4 max-w-[18ch] text-balance">
              Stop losing jobs to voicemail.
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-[55ch] text-pretty">
              Kertz Digital builds websites and lead systems for Austin home
              service companies, so every call, form, and after-hours inquiry
              becomes a booked job.
            </p>
          </div>

          {/* calculator placeholder */}
          <div className="lg:col-span-5">
            <LeakCalculator />
          </div>
        </div>
      </section>

      {/* PLAIN SECTION, to see the contrast with the gridded hero */}
      <section className="container-kd section-y">
        <p className="label-mono text-muted-foreground">02 / How it works</p>
        <h2 className="font-display text-2xl mt-4 max-w-[20ch] text-balance">
          Get found. Look credible. Never miss a call.
        </h2>
      </section>
    </main>
  );
}
