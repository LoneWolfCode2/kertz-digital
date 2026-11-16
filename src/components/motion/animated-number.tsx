"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

type AnimatedNumberProps = {
  value: number;
  format: (n: number) => string;
  className?: string;
};

/**
 * Rolls a number to its new value with a spring.
 * The rolling digits are hidden from screen readers; they get the final
 * value once, via the sr-only span, instead of every frame.
 */
export function AnimatedNumber({
  value,
  format,
  className,
}: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 140, damping: 24, mass: 0.6 });
  const display = useTransform(spring, (n) => format(n));

  useEffect(() => {
    if (reduce) spring.jump(value);
    else spring.set(value);
  }, [value, reduce, spring]);

  return (
    <span className={className}>
      <motion.span aria-hidden>{display}</motion.span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
