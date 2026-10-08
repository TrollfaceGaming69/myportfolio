"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { socialProfiles } from "@/constant/personaldata"
import arrow from "@/public/ep_arrow-down-bold.svg"
import github from "@/public/ant-design_github-filled.svg"
import linkedin from "@/public/ant-design_linkedin-filled.svg"
import dribble from "@/public/icon-park-outline_dribble.svg"

// `as const` keeps each label a literal so it can index socialProfiles.
const socialIcons = [
  { icon: github, label: "GitHub" },
  { icon: linkedin, label: "LinkedIn" },
  { icon: dribble, label: "Dribbble" },
] as const

/** How far the page has to move before the bar flips to its dark state. */
const SCROLL_THRESHOLD = 8

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true })

  return () => window.removeEventListener("scroll", onStoreChange)
}

const readScrolled = () => window.scrollY > SCROLL_THRESHOLD

/** The server has no scroll position, so it always renders the light bar. */
const serverScrolled = () => false

const transitionClass = "transition duration-300 motion-reduce:transition-none"

/**
 * The asset points up on its own, so 180deg is the resting state and 0 is the
 * hover flip. Rotation is driven here rather than with a Tailwind class because
 * Tailwind writes the `rotate` property while motion writes `transform`, and
 * having both on one element compounds them.
 */
const ARROW_AT_REST = 180
const ARROW_HOVERED = 0

/**
 * Omitting `behavior` leaves the choice to the CSS `scroll-behavior` on <html>,
 * which is gated behind motion-safe. Passing "smooth" explicitly would force an
 * animated scroll on readers who asked for reduced motion.
 */
const scrollToTop = () => window.scrollTo({ top: 0 })

const Nav = () => {
  // Reading the scroll position as an external store keeps the server markup in
  // step with hydration, and only re-renders when the threshold is crossed.
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    readScrolled,
    serverScrolled,
  )

  const shouldReduceMotion = useReducedMotion()

  // Every icon asset is solid black with a transparent background, so inverting
  // turns them solid white. They can't inherit a text colour through next/image.
  const iconClass = `${transitionClass} ${scrolled ? "invert" : ""}`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 ${transitionClass} ${
        scrolled ? "bg-dark" : "bg-transparent"
      }`}
      // Only invert the cursor once the bar is actually dark.
      data-cursor-theme={scrolled ? "invert" : undefined}
    >
      <div className="mx-auto flex h-nav w-[min(100%,88.5rem)] items-center justify-between px-8 max-mobile:px-5">
        <span
          className={`text-sm font-semibold ${transitionClass} ${
            scrolled ? "text-white" : "text-label"
          }`}
        >
          AlFatih
        </span>

        <div className="flex items-center gap-5">
          {/* Inert until the bar is dark: at the top of the page there is
              nowhere to scroll back to. Disabled also keeps it out of the tab
              order, and the cursor falls back to its plain dot. */}
          <button
            className="focus-visible:outline-accent inline-flex cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default"
            type="button"
            onClick={scrollToTop}
            disabled={!scrolled}
            aria-label="Scroll back to top"
            data-cursor={scrolled ? "pill" : undefined}
            data-cursor-label={scrolled ? "Scroll back to top" : undefined}
          >
            <motion.span
              className="inline-flex"
              animate={{ rotate: ARROW_AT_REST }}
              whileHover={
                scrolled && !shouldReduceMotion
                  ? { rotate: ARROW_HOVERED }
                  : undefined
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image className={`size-5 ${iconClass}`} src={arrow} alt="" />
            </motion.span>
          </button>

          <ul className="flex items-center gap-1" aria-label="Social links">
            {socialIcons.map(({ icon, label }) => (
              <li key={label}>
                <a
                  className="focus-visible:outline-accent inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                  href={socialProfiles[label]}
                  target="_blank"
                  rel="noreferrer"
                  // The link carries the name, so the image stays decorative.
                  aria-label={label}
                  data-cursor="pill"
                  data-cursor-label={`Visit ${label}`}
                >
                  <Image
                    className={`size-6 ${iconClass}`}
                    src={icon}
                    alt=""
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Nav
