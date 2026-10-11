"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Matches the skill pills in the hero. */
const roles = [
  "UI/UX",
  "Web Design",
  "Web Development",
  "Software Engineering",
];

/** Per-character delay while typing a role out. */
const TYPE_MS = 58;
/** Backspacing reads as a correction, so it runs faster than typing. */
const DELETE_MS = 26;
/** How long a finished role sits before it gets erased. */
const HOLD_MS = 1500;
/** Beat on the empty line before the next role starts. */
const BLANK_MS = 320;

/**
 * Cycles the role line under the name, typed a character at a time and then
 * backspaced before the next one starts.
 *
 * Inherits its type styles from the <p> it sits in.
 */
export default function RoleCycle() {
  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const role = roles[index];
  const isComplete = !isDeleting && charCount === role.length;

  useEffect(() => {
    // A permanently moving label is the sort of thing reduced motion is for, so
    // it settles on the first role instead of cycling.
    if (shouldReduceMotion) {
      return;
    }

    // One timer per frame of the cycle: the effect re-runs on every count change,
    // so each step only has to schedule the one after it.
    const delay = isDeleting
      ? charCount > 0
        ? DELETE_MS
        : BLANK_MS
      : charCount < role.length
        ? TYPE_MS
        : HOLD_MS;

    const timer = window.setTimeout(() => {
      if (isDeleting) {
        if (charCount > 0) {
          setCharCount(charCount - 1);
          return;
        }

        setIsDeleting(false);
        setIndex((current) => (current + 1) % roles.length);
        return;
      }

      if (charCount < role.length) {
        setCharCount(charCount + 1);
        return;
      }

      setIsDeleting(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, isDeleting, role, shouldReduceMotion]);

  return (
    <>
      {/* Only a slice of one role is on screen at a time, so assistive tech gets
          the whole list once rather than a half-typed word. */}
      <span className="sr-only">{roles.join(", ")}</span>

      {/* Block rather than hugging the text, so the line holds its own row and
          nothing around it reflows as the roles change length. */}
      <span className="block whitespace-nowrap" aria-hidden="true">
        {shouldReduceMotion ? roles[0] : role.slice(0, charCount)}

        {/* The caret only blinks once a role is finished; while characters are
            moving it stays lit, the way a real one does mid-keystroke. */}
        <motion.span
          className="ml-[0.09em] inline-block h-[1em] w-[1.5px] translate-y-[0.14em] bg-current"
          animate={
            shouldReduceMotion || !isComplete
              ? { opacity: 1 }
              : { opacity: [1, 1, 0, 0] }
          }
          transition={
            shouldReduceMotion || !isComplete
              ? { duration: 0 }
              : { duration: 0.9, times: [0, 0.5, 0.5, 1], repeat: Infinity }
          }
        />
      </span>
    </>
  );
}
