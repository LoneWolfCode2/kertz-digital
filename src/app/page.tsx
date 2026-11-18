import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LeakCalculator } from "@/components/sections/leak-calculator";
import { WhoItsFor } from "@/components/sections/who-its-for";
import { pageMetadata } from "@/lib/seo";

const faqs = [
  {
    question: "Who is Kertz Digital for?",
    answer:
      "Home service companies in the Austin area: HVAC, plumbing, electrical, roofing, landscaping, pest control, and similar trades that depend on the phone ringing.",
  },
  {
    question: "What does it cost?",
    answer:
      "Monthly plans start at $397/month, and the full Booked system is $797/month plus a one-time setup. A standalone website is $3,500. See the pricing page for details, or book a call and we'll tell you which piece would pay off first for your business.",
  },
  {
    question: "Am I locked into a long contract?",
    answer:
      "No. Monthly plans have no long-term contract. We keep clients by producing booked jobs, not paperwork.",
  },
  {
    question: "What happens on the free call?",
    answer:
      "Twenty minutes. We look at how leads reach you today, where they're slipping, and what we'd fix first. No pitch deck, and no obligation.",
  },
  {
    question: "Do you only work in Austin?",
    answer:
      "We focus on Austin and nearby cities like Round Rock, Cedar Park, Pflugerville, Georgetown, and Leander, because knowing the local market is part of what makes the work effective.",
  },
];

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
              Austin websites + lead systems for home services
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
      <FaqSection faqs={faqs} />
      <CtaBand />
    </main>
  );
}
