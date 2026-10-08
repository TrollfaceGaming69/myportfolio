"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

/**
 * Pulling the viewport root in by 20% from the bottom means an element starts
 * animating once its top edge passes the 80% line of the screen, rather than
 * the instant it peeks into view.
 *
 * `once` keeps it from replaying when the reader scrolls back up.
 */
const viewport = { once: true, margin: "0px 0px -20% 0px" } as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Shared look for everything that scrolls into view: a short, soft rise. */
const solo: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: easeOut, delay },
  }),
};

/**
 * Same thing without a delay of its own, so a parent group's stagger is what
 * spaces the children out.
 */
const grouped: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

// Only the handful of tags the sections actually need, so the markup can stay
// semantic (a list item has to render as <li>, not a <div>).
const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
} as const;

type Tag = keyof typeof tags;

type CommonProps = {
  as?: Tag;
  className?: string;
  children: ReactNode;
};

/** A single block that fades and rises when it reaches the trigger line. */
export function Reveal({
  as = "div",
  className,
  delay = 0,
  children,
  ...rest
}: CommonProps & { delay?: number } & Record<string, unknown>) {
  const Tag = tags[as];

  return (
    <Tag
      className={className}
      variants={solo}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps a set of RevealItems and releases them one after another once the group
 * hits the trigger line.
 */
export function RevealGroup({
  as = "div",
  className,
  children,
  ...rest
}: CommonProps & Record<string, unknown>) {
  const Tag = tags[as];

  return (
    <Tag
      className={className}
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A child of RevealGroup. Takes its timing from the group. */
export function RevealItem({
  as = "div",
  className,
  children,
  ...rest
}: CommonProps & Record<string, unknown>) {
  const Tag = tags[as];

  return (
    <Tag className={className} variants={grouped} {...rest}>
      {children}
    </Tag>
  );
}
