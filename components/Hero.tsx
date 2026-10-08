"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const skills = [
  { label: "UI/UX", tilt: "" },
  { label: "Web Design", tilt: "rotate-11" },
  { label: "Web Development", tilt: "-rotate-6" },
  { label: "Software Engineering", tilt: "rotate-10" },
];

// Placement keeps the tilt as a class so it stays on the outer, non-moving
// element: motion drives `transform` on the inner card, and the two would
// compound if both lived on the same node.
const previews = [
  {
    src: "/guardify.png",
    title: "Guardify",
    alt: "Guardify mobile security app screens",
    width: 1943,
    height: 1292,
    placement: "top-0 left-[16%] rotate-17",
    depth: 1,
  },
  {
    src: "/erusea.png",
    title: "Erusea",
    alt: "Erusea store management dashboard screens",
    width: 1933,
    height: 1223,
    placement: "top-[9%] left-0 -rotate-4",
    depth: 2,
  },
  {
    src: "/chimatcha.png",
    title: "Chi Matcha",
    alt: "Chi Matcha mobile ordering app screens",
    width: 1913,
    height: 1220,
    placement: "top-[5%] left-[5%] rotate-5",
    depth: 3,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const copyGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const pillGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const pillItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

/** How far a hovered card rises out of the stack. */
const LIFT = -38;

export default function Hero() {
  // Which card is lifted. Tracked in state because the card also has to jump
  // the z-order, and z-index can't be interpolated.
  const [liftedCard, setLiftedCard] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <main
      className="flex min-h-svh items-center justify-center overflow-hidden px-8 py-12 max-tablet:min-h-auto max-tablet:pt-20 max-tablet:pb-16 max-mobile:px-5 max-mobile:pt-14 max-mobile:pb-10"
      id="hero"
    >
      <section
        className="grid w-[min(100%,81rem)] grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-[clamp(2.5rem,5vw,5rem)] max-tablet:grid-cols-1 max-tablet:gap-12 max-mobile:gap-10"
        aria-labelledby="hero-title"
      >
        <motion.div
          className="relative z-1 max-tablet:max-w-[38rem]"
          variants={shouldReduceMotion ? undefined : copyGroup}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.ul
            className="mb-[1.45rem] flex flex-wrap items-center gap-x-[0.55rem] gap-y-[0.65rem] max-mobile:mb-5 max-mobile:gap-x-[0.45rem] max-mobile:gap-y-[0.6rem]"
            variants={shouldReduceMotion ? undefined : pillGroup}
            aria-label="Areas of expertise"
          >
            {skills.map(({ label, tilt }) => (
              <motion.li
                className={`bg-accent rounded-full px-4 py-[0.62rem] text-sm leading-[1.1] font-semibold whitespace-nowrap text-white max-mobile:px-[0.8rem] max-mobile:py-[0.55rem] ${tilt}`}
                key={label}
                variants={shouldReduceMotion ? undefined : pillItem}
              >
                {label}
              </motion.li>
            ))}
          </motion.ul>

          <motion.h1
            className="text-label font-serif text-5xl leading-[0.99] font-normal tracking-display"
            id="hero-title"
            variants={shouldReduceMotion ? undefined : copyItem}
          >
            Building polished <span className="text-accent">digital</span>
            <br />
            <span className="text-accent">products</span> for modern teams.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[31rem] text-base leading-copy font-medium"
            variants={shouldReduceMotion ? undefined : copyItem}
          >
            I design and build user-centered experiences across web, mobile, and
            enterprise software. My work combines systems thinking, visual
            clarity, and technical execution to help teams ship faster and ship
            better.
          </motion.p>

          <motion.a
            className="border-stroke text-label hover:border-label hover:bg-container-fill focus-visible:outline-accent mt-13 inline-flex min-h-12 items-center gap-[0.8rem] rounded-full border py-[0.55rem] pr-[1.15rem] pl-[1.35rem] text-sm font-medium no-underline transition-colors duration-[160ms] focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none max-mobile:mt-8"
            href="#about"
            variants={shouldReduceMotion ? undefined : copyItem}
          >
            <span>Scroll to see more</span>
            <ArrowDown aria-hidden="true" size={19} strokeWidth={2} />
          </motion.a>
        </motion.div>

        <div
          className="relative aspect-[1.35] w-full max-tablet:mx-auto max-tablet:w-[min(100%,43rem)]"
          aria-label="Selected project previews"
        >
          {previews.map(
            ({ src, title, alt, width, height, placement, depth }, index) => {
            const isLifted = liftedCard === src;

            return (
              /* The outer node owns the tilt, the stacking order and the hover
                 target, and never moves. Hovering near the bottom edge would
                 otherwise lift the card out from under the cursor, drop it as
                 hover ended, and flicker. */
              <motion.div
                className={`absolute w-[84%] ${placement}`}
                key={src}
                style={{ zIndex: isLifted ? previews.length + 1 : depth }}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.94 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: easeOut,
                  delay: 0.28 + index * 0.1,
                }}
                onHoverStart={() => setLiftedCard(src)}
                onHoverEnd={() =>
                  setLiftedCard((current) => (current === src ? null : current))
                }
                data-cursor="pill"
                data-cursor-label={title}
              >
                <motion.div
                  className="aspect-[1.56] overflow-hidden rounded-2xl max-mobile:rounded-[0.65rem]"
                  animate={{
                    y: isLifted && !shouldReduceMotion ? LIFT : 0,
                    scale: isLifted && !shouldReduceMotion ? 1.04 : 1,
                    boxShadow: isLifted
                      ? "0 26px 60px -20px rgba(0,0,0,0.45)"
                      : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.42, ease: easeOut }}
                >
                  <Image
                    className="h-full w-full object-cover"
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading="eager"
                    sizes="(max-width: 900px) 75vw, 42vw"
                  />
                </motion.div>
              </motion.div>
              );
            },
          )}
        </div>
      </section>
    </main>
  );
}
