import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { services } from "@/content/services";

/** Homepage section 02: the three services as three steps. */
export function HowItWorks() {
  return (
    <section className="container-kd section-y">
      <RevealGroup>
        <RevealItem as="p" className="label-mono text-muted-foreground">
          02 / How it works
        </RevealItem>
        <RevealItem
          as="h2"
          className="font-display text-2xl mt-4 max-w-[20ch] text-balance"
        >
          Get found. Look credible. Never miss a call.
        </RevealItem>
        <RevealItem
          as="p"
          className="text-muted-foreground mt-6 max-w-[55ch] text-pretty"
        >
          Three pieces that work as one system. Each one plugs the leak the step
          before it would otherwise create.
        </RevealItem>
      </RevealGroup>

      <RevealGroup
        className="mt-12 grid border-t border-foreground md:grid-cols-3"
        interval={0.12}
      >
        {services.map((s, i) => (
          <RevealItem
            key={s.slug}
            className="flex flex-col border-b border-border py-8 md:border-b-0 md:px-6 md:border-l md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <p className="label-mono text-muted-foreground">
              Step {String(i + 1).padStart(2, "0")} / {s.label}
            </p>
            <h3 className="font-display text-xl mt-3">{s.step}</h3>
            <p className="text-sm text-muted-foreground mt-3 text-pretty">
              {s.intro}
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {s.includes.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 bg-foreground"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={s.href}
              className="label-mono mt-auto pt-6 underline-offset-4 decoration-2 hover:underline"
            >
              {s.label} details →
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
