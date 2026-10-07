"use client"

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"

/** Takes the edge off the raw scroll value without lagging behind the page. */
const progressSpring = { stiffness: 260, damping: 40, restDelta: 0.0005 }

/**
 * Accent rail tracking how far down the page the reader is. Render it straight
 * after <Nav />: it pins itself directly below the navbar using the shared
 * --spacing-nav height, so the two stay joined if the bar is ever resized.
 */
const ScrollProgress = () => {
  // scrollYProgress runs 0 -> 1 over the length of the page, which maps straight
  // onto scaleX. Scaling rather than animating width keeps it off the main thread.
  const { scrollYProgress } = useScroll()
  const smoothedProgress = useSpring(scrollYProgress, progressSpring)
  const shouldReduceMotion = useReducedMotion()
  const progress = shouldReduceMotion ? scrollYProgress : smoothedProgress

  return (
    <motion.div
      className="bg-accent fixed inset-x-0 top-nav z-40 h-[6px] origin-left rounded-none"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  )
}

export default ScrollProgress
