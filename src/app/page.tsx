import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LeakCalculator } from "@/components/sections/leak-calculator";
import { WhoItsFor } from "@/components/sections/who-its-for";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Austin Home Service Websites & Lead Systems | Kertz Digital",
  description:
    "Kertz Digital builds websites and lead systems for Austin home service companies, so every call, form, and after-hours inquiry becomes a booked job.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-blueprint grid-fade" />
        <RevealGroup
          trigger="mount"
          className="relative container-kd py-12 lg:py-16 grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center"
        >
          <div className="lg:col-span-7">
            <RevealItem as="p" className="label-mono text-muted-foreground">
              01 / Never miss a call
            </RevealItem>
            <RevealItem
              as="h1"
              fade={false}
              className="font-display text-3xl mt-4 max-w-[18ch] text-balance"
            >
              Stop losing jobs to voicemail.
            </RevealItem>
            <RevealItem
              as="p"
              className="text-lg text-muted-foreground mt-6 max-w-[55ch] text-pretty"
            >
              Kertz Digital builds websites and lead systems for Austin home
              service companies, so every call, form, and after-hours inquiry
              becomes a booked job.
            </RevealItem>
          </div>

          <RevealItem className="lg:col-span-5">
            <LeakCalculator />
          </RevealItem>
        </RevealGroup>
      </section>

      <HowItWorks />
      <WhoItsFor />
      <CtaBand />
    </main>
  );
}
