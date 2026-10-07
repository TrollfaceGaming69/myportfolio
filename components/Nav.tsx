"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import arrow from "@/public/ep_arrow-down-bold.svg"
import github from "@/public/ant-design_github-filled.svg"
import linkedin from "@/public/ant-design_linkedin-filled.svg"
import dribble from "@/public/icon-park-outline_dribble.svg"

const socialIcons = [
  { icon: github, label: "GitHub" },
  { icon: linkedin, label: "LinkedIn" },
  { icon: dribble, label: "Dribbble" },
]

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

const Nav = () => {
  // Reading the scroll position as an external store keeps the server markup in
  // step with hydration, and only re-renders when the threshold is crossed.
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    readScrolled,
    serverScrolled,
  )

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
          <Image
            className={`size-5 rotate-180 ${iconClass}`}
            src={arrow}
            alt=""
            aria-hidden="true"
          />

          <div className="flex items-center gap-1">
            {socialIcons.map(({ icon, label }) => (
              <Image
                className={`size-6 ${iconClass}`}
                key={label}
                src={icon}
                alt={label}
                data-cursor="pill"
                data-cursor-label={`Visit ${label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav
