"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/**
 * How far the bubble's centre sits from the real pointer, in px. Positive X is
 * right, negative Y is up, so this parks it off the arrow's top-right corner.
 * Shrink both toward 0 to tuck it closer to the pointer tip.
 */
const OFFSET_X = 7;
const OFFSET_Y = -7;

const DEFAULT_LABEL = "View more";

/** Anything interactive gets the round badge unless it says otherwise. */
const CLICKABLE = 'a[href], button:not([disabled]), [role="button"]';

type CursorShape = "dot" | "circle" | "pill";

/**
 * Every size the bubble can take, in px. `dot` is the idle dot's diameter and
 * `circle` the "View more" badge's: keep width and height equal in both so they
 * stay perfectly round. The pill's `auto` width lets it measure its own label,
 * so a longer title simply makes a longer pill.
 */
const shapes: Record<CursorShape, { width: number | "auto"; height: number }> = {
  dot: { width: 8, height: 8 },
  circle: { width: 76, height: 76 },
  pill: { width: "auto", height: 36 },
};

type CursorState = {
  shape: CursorShape;
  label: string;
  invert: boolean;
};

const IDLE: CursorState = { shape: "dot", label: "", invert: false };

/**
 * Works out what the cursor should look like from whatever sits under the
 * pointer. Targets opt in with data attributes, so new ones can be added
 * without touching this file:
 *
 *   data-cursor="pill"   + data-cursor-label="Visit GitHub"   label pill
 *   data-cursor="circle" + data-cursor-label="View more"      round badge
 *   data-cursor="none"                                        plain dot
 *   data-cursor-theme="invert"   on any ancestor              white on dark
 */
function readCursorState(target: Element | null): CursorState {
  if (!target) {
    return IDLE;
  }

  // Read the theme from the nearest marked ancestor so one attribute on a dark
  // <footer> or <header> covers everything inside it.
  const themeHost = target.closest<HTMLElement>("[data-cursor-theme]");
  const invert = themeHost?.dataset.cursorTheme === "invert";
  const host = target.closest<HTMLElement>("[data-cursor]");

  if (host) {
    const mode = host.dataset.cursor;
    const label = host.dataset.cursorLabel ?? "";

    if (mode === "none") {
      return { ...IDLE, invert };
    }

    if (mode === "pill") {
      return { shape: "pill", label, invert };
    }

    return { shape: "circle", label: label || DEFAULT_LABEL, invert };
  }

  if (target.closest(CLICKABLE)) {
    return { shape: "circle", label: DEFAULT_LABEL, invert };
  }

  return { ...IDLE, invert };
}

const trail = { stiffness: 700, damping: 42, mass: 0.45 };
const morph = { type: "spring", stiffness: 420, damping: 34, mass: 0.6 } as const;

export default function Cursor() {
  const [{ shape, label, invert }, setState] = useState<CursorState>(IDLE);
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Position lives in motion values rather than state: the pointer moves far too
  // often to re-render on, and these drive the transform directly.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const trailedX = useSpring(x, trail);
  const trailedY = useSpring(y, trail);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      // Touch has no hover, so the custom cursor never appears there.
      if (event.pointerType === "touch") {
        return;
      }

      x.set(event.clientX + OFFSET_X);
      y.set(event.clientY + OFFSET_Y);
      setVisible(true);

      const next = readCursorState(event.target as Element | null);

      // Bail out when nothing changed, otherwise every pointer move would
      // re-render the tree.
      setState((current) =>
        current.shape === next.shape &&
        current.label === next.label &&
        current.invert === next.invert
          ? current
          : next,
      );
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-100"
      style={{
        x: shouldReduceMotion ? x : trailedX,
        y: shouldReduceMotion ? y : trailedY,
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    >
      {/* The -50% translate uses the CSS `translate` property, which composes
          with the `transform` motion writes above instead of fighting it. */}
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full transition-colors duration-200 ${
          invert ? "text-label bg-white" : "bg-label text-white"
        }`}
        animate={shapes[shape]}
        transition={shouldReduceMotion ? { duration: 0 } : morph}
      >
        {shape !== "dot" && (
          <motion.span
            className={`text-center text-[11px] leading-[1.15] font-semibold tracking-body ${
              shape === "pill" ? "px-4 whitespace-nowrap" : "px-3"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, delay: 0.05 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
