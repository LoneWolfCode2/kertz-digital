import { RevealGroup, RevealItem } from "@/components/motion/reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
};

/** Gridded intro band at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="absolute inset-0 bg-blueprint grid-fade" />
      <RevealGroup
        trigger="mount"
        className="relative container-kd py-16 lg:py-24"
      >
        <RevealItem as="p" className="label-mono text-muted-foreground">
          {eyebrow}
        </RevealItem>
        <RevealItem
          as="h1"
          fade={false}
          className="font-display text-3xl mt-4 max-w-[20ch] text-balance"
        >
          {title}
        </RevealItem>
        {lead && (
          <RevealItem
            as="p"
            className="text-lg text-muted-foreground mt-6 max-w-[60ch] text-pretty"
          >
            {lead}
          </RevealItem>
        )}
        {children && <RevealItem className="mt-8">{children}</RevealItem>}
      </RevealGroup>
    </section>
  );
}
