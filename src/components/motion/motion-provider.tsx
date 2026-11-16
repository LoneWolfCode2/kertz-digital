"use client";

import { MotionConfig } from "motion/react";

/**
 * Site-wide Motion defaults.
 * reducedMotion="user": when the OS asks for reduced motion, transform and
 * layout animations are skipped; opacity fades still run.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
