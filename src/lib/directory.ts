// Austin trades directory: listings come from src/content/directory.csv.
//
// To add a business, add one row to that file (Excel or Google Sheets work;
// download as CSV). Columns, in order:
//   name, trade, phone, website, google_url, cities, description, services, hours
// - trade: one of the industry labels in src/content/industries.ts
// - cities, services: separate items with semicolons
// Every row is checked at build time. A bad row stops the build with the row
// number and the problem, so a typo never ships as a broken listing.

import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { z } from "zod";
import { industries } from "@/content/industries";

const CSV_PATH = path.join(process.cwd(), "src/content/directory.csv");

export const COLUMNS = [
  "name",
  "trade",
  "phone",
  "website",
  "google_url",
  "cities",
  "description",
  "services",
  "hours",
] as const;

export type Listing = {
  slug: string;
  name: string;
  trade: string;
  tradeSlug: string;
  phone: string;
  phoneHref: string;
  website?: string;
  googleUrl?: string;
  cities: string[];
  description?: string;
  services: string[];
  hours?: string;
};

/** Minimal RFC 4180 parser: quoted fields, "" escapes, CRLF, Excel's BOM. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const s = text.replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quoted) {
      if (c === '"' && s[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}

const list = (v: string) =>
  v
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

const optionalUrl = (column: string) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || /^https:\/\/\S+\.\S+/.test(v), {
      message: `${column} must start with https://`,
    });

const rowSchema = z.object({
  name: z.string().trim().min(2, "name is missing").max(100),
  trade: z
    .string()
    .trim()
    .refine((v) => industries.some((i) => i.label === v), {
      message: `trade must be one of: ${industries.map((i) => i.label).join(", ")}`,
    }),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length === 10,
      {
        message: "phone must have 10 digits, like 512-555-0123",
      },
    ),
  website: optionalUrl("website"),
  google_url: optionalUrl("google_url"),
  cities: z
    .string()
    .refine((v) => list(v).length > 0, { message: "cities is missing" }),
  description: z
    .string()
    .trim()
    .max(160, "description must be 160 characters or fewer"),
  services: z
    .string()
    .refine((v) => list(v).length <= 6, { message: "6 services at most" }),
  hours: z.string().trim().max(80),
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(-10);
  return {
    phone: `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`,
    phoneHref: `tel:+1${d}`,
  };
}

/** Parse and check the whole file. Throws on the first bad row. */
export function toListings(text: string): Listing[] {
  const [header, ...rows] = parseCsv(text);
  const cols = (header ?? []).map((h) => h.trim().toLowerCase());
  if (cols.join(",") !== COLUMNS.join(",")) {
    throw new Error(
      `directory.csv: the first row must be exactly\n${COLUMNS.join(",")}\nbut it is\n${cols.join(",")}`,
    );
  }
  const seen = new Set<string>();
  return rows.map((cells, i) => {
    const line = i + 2;
    const raw = Object.fromEntries(COLUMNS.map((c, j) => [c, cells[j] ?? ""]));
    const parsed = rowSchema.safeParse(raw);
    if (!parsed.success) {
      const problems = parsed.error.issues.map((x) => x.message).join("; ");
      throw new Error(
        `directory.csv row ${line} (${raw.name || "no name"}): ${problems}`,
      );
    }
    const r = parsed.data;
    const slug = slugify(r.name);
    if (seen.has(slug)) {
      throw new Error(`directory.csv row ${line}: "${r.name}" is listed twice`);
    }
    seen.add(slug);
    const industry = industries.find((x) => x.label === r.trade);
    return {
      slug,
      name: r.name,
      trade: r.trade,
      tradeSlug: industry?.slug ?? slugify(r.trade),
      ...formatPhone(r.phone),
      website: r.website || undefined,
      googleUrl: r.google_url || undefined,
      cities: list(r.cities),
      description: r.description || undefined,
      services: list(r.services),
      hours: r.hours || undefined,
    };
  });
}

export async function getListings(): Promise<Listing[]> {
  "use cache";
  cacheLife("max");
  const listings = toListings(await readFile(CSV_PATH, "utf8"));
  return listings.sort(
    (a, b) => a.trade.localeCompare(b.trade) || a.name.localeCompare(b.name),
  );
}
