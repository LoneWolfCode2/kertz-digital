import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Sticky Call / Book bar on phones. Most home-service buyers browse on
 * mobile, so the two conversion actions stay one thumb-tap away on every
 * page. A spacer keeps the bar from covering the footer.
 */
export function MobileActionBar() {
  return (
    <>
      <div aria-hidden className="h-20 lg:hidden" />
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-foreground bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden"
      >
        <a
          href={site.phone.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full",
          )}
        >
          Call now
        </a>
        <Link
          href={site.cta.href}
          className={cn(buttonVariants({ size: "sm" }), "w-full")}
        >
          {site.cta.label}
        </Link>
      </nav>
    </>
  );
}
