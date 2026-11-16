"use client";

import { motion, stagger, type Variants } from "motion/react";

// Matches --ease-out-kd in globals.css.
const EASE_OUT_KD = [0.2, 0.8, 0.2, 1] as const;

const groupVariants = (delay: number, interval: number): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren: stagger(interval, { startDelay: delay }) },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_KD },
  },
};

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** "mount" animates on page load (hero); "view" when scrolled into view. */
  trigger?: "mount" | "view";
  /** Seconds before the first child starts. */
  delay?: number;
  /** Seconds between each child. */
  interval?: number;
};

/** Staggers its RevealItem children in, one after another. */
export function RevealGroup({
  children,
  className,
  trigger = "view",
  delay = 0,
  interval = 0.08,
}: RevealGroupProps) {
  const play =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <motion.div
      className={className}
      variants={groupVariants(delay, interval)}
      initial="hidden"
      {...play}
    >
      {children}
    </motion.div>
  );
}

// Same rise, no fade: for headlines, so the browser paints them at once
// (fading from opacity 0 delays Largest Contentful Paint).
const riseOnlyVariants: Variants = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.6, ease: EASE_OUT_KD } },
};

const tags = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
} as const;

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  /** Render as this element so wrapping doesn't add extra divs. */
  as?: keyof typeof tags;
  /** false = rise only, stay visible. Use on the page's H1. */
  fade?: boolean;
};

/** One fade-and-rise step inside a RevealGroup. */
export function RevealItem({
  children,
  className,
  as = "div",
  fade = true,
}: RevealItemProps) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      variants={fade ? itemVariants : riseOnlyVariants}
    >
      {children}
    </Tag>
  );
}
