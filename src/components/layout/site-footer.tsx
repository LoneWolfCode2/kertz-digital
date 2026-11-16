import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground">
      <div className="container-kd grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="font-display text-lg">
            {site.name}
          </Link>
          <p className="mt-3 max-w-[36ch] text-sm text-muted-foreground text-pretty">
            {site.tagline}
          </p>
          {/* Name + area + phone, kept identical to the Google Business Profile */}
          <address className="mt-6 space-y-1 text-sm not-italic">
            <p>{site.location}</p>
            <p>
              <a href={site.phone.href} className="font-mono hover:underline">
                {site.phone.display}
              </a>
            </p>
            <p className="text-muted-foreground">{site.hours.display}</p>
          </address>
        </div>

        <nav aria-label="Services" className="lg:col-span-3">
          <p className="label-mono text-muted-foreground">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <p className="label-mono text-muted-foreground">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[...site.nav.filter((n) => n.href !== "/services"), site.cta].map(
              (n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:underline">
                    {n.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="label-mono text-muted-foreground">Serving</p>
          <p className="mt-4 text-sm text-muted-foreground text-pretty">
            {site.serviceArea.join(" · ")}
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="container-kd label-mono py-5 text-muted-foreground">
          © {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
