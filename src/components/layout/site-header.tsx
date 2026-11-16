import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="container-kd flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-3 whitespace-nowrap"
        >
          <span className="font-display text-lg leading-none">{site.name}</span>
          <span className="label-mono hidden text-muted-foreground 2xl:inline">
            / {site.location}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-sm font-medium underline-offset-8 decoration-2 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={site.phone.href}
            className="hidden whitespace-nowrap font-mono text-sm xl:inline"
          >
            {site.phone.display}
          </a>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <Link href={site.cta.href} className={buttonVariants({ size: "sm" })}>
            {site.cta.label}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
