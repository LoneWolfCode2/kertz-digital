import { foundingOffer } from "@/content/plans";

/** Founding-client banner for /pricing. Renders nothing once the offer is off. */
export function FoundingBanner() {
  if (!foundingOffer.enabled) return null;
  return (
    <aside
      aria-labelledby="founding-offer"
      className="mb-10 border-2 border-foreground bg-caution p-6 text-caution-foreground sm:p-8"
    >
      <p className="label-mono">Limited offer</p>
      <h2
        id="founding-offer"
        className="font-display text-xl mt-2 text-balance"
      >
        {foundingOffer.headline}
      </h2>
      <p className="mt-3 max-w-[65ch] text-pretty">{foundingOffer.body}</p>
    </aside>
  );
}
