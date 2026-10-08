"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import UserPersonaCard from "@/components/project/UserPersonaCard";
import type { ProjectDetail } from "@/components/project/projectDetails";

const sectionHeadingClass =
  "text-label text-[20px] leading-label font-bold tracking-body";
const leadCopyClass =
  "text-text mt-2.5 text-[16px] leading-[1.5] font-medium tracking-body";
const columnCopyClass =
  "text-text mt-2 text-[14px] leading-[1.5] font-medium tracking-body";
const dividerClass = "border-stroke/55 my-9 border-t";

const actionBaseClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[14px] leading-label font-medium whitespace-nowrap transition-colors duration-[160ms] focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-3 motion-reduce:transition-none";
const actionOutlineClass =
  "border-stroke text-label border bg-white hover:border-label hover:bg-container-fill";
const actionFilledClass = "bg-accent text-white hover:bg-[#0f4ed6]";

/** Brand marks for the footer links. Both assets are black-filled, so they sit on the outlined button. */
const brandIcons = {
  figma: { src: "/akar-icons_figma-fill.svg", size: 20 },
  github: { src: "/ant-design_github-filled.svg", size: 19 },
} as const;

function BrandIcon({ name }: { name: keyof typeof brandIcons }) {
  const { src, size } = brandIcons[name];

  return (
    <Image
      className="shrink-0"
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
    />
  );
}

/**
 * Footer pill. Renders as a link when the URL is filled in, and as a disabled
 * button while the project has no URL yet, so the layout stays intact.
 *
 * `cursorLabel` says where the link actually goes, which is more use under the
 * pointer than the button's own wording. The disabled variant deliberately
 * leaves it off: promising to open something that isn't there would mislead.
 */
function ActionButton({
  href,
  label,
  cursorLabel,
  icon,
  filled = false,
}: {
  href?: string;
  label: string;
  cursorLabel: string;
  icon: ReactNode;
  filled?: boolean;
}) {
  const className = `${actionBaseClass} ${filled ? actionFilledClass : actionOutlineClass}`;

  if (!href) {
    return (
      <button
        className={`${className} opacity-45`}
        type="button"
        disabled
        title={`${label} is not available yet`}
      >
        {label}
        {icon}
      </button>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="pill"
      data-cursor-label={cursorLabel}
    >
      {label}
      {icon}
    </a>
  );
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h3 className={sectionHeadingClass}>{title}</h3>
      {children}
    </section>
  );
}

function OverlayPanel({
  project,
  onClose,
}: {
  project: ProjectDetail;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Move focus into the dialog, then hand it back to whatever opened it.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => previouslyFocused?.focus?.();
  }, []);

  // Freeze the page behind the overlay. The padding keeps the layout from
  // jumping by the width of the scrollbar we just removed.
  useEffect(() => {
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  // Escape closes; Tab stays inside the dialog.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-mobile:p-3">
      <motion.div
        className="absolute inset-0 bg-black/55"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="bg-background relative flex max-h-[92dvh] w-[min(100%,62.5rem)] flex-col overflow-hidden rounded-[18px] shadow-[0_24px_70px_-16px_rgba(0,0,0,0.45)]"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={
          shouldReduceMotion ? false : { opacity: 0, scale: 0.975, y: 14 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={
          shouldReduceMotion ? undefined : { opacity: 0, scale: 0.985, y: 8 }
        }
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className="border-stroke/60 text-label bg-background/85 hover:bg-container-fill focus-visible:outline-accent absolute top-5 right-5 z-10 grid size-9 cursor-pointer place-items-center rounded-full border backdrop-blur-sm transition-colors duration-[160ms] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          // "View more" would make no sense on a close button.
          data-cursor="none"
        >
          <X aria-hidden="true" size={18} strokeWidth={2} />
        </button>

        {/* min-h-0 lets this flex child shrink so it scrolls instead of
            stretching the panel past its max height. */}
        <div className="no-scrollbar min-h-0 overflow-y-auto overscroll-contain px-6 pt-6 pb-7 max-mobile:px-4 max-mobile:pt-5">
          <header className="pr-12">
            <h2
              className="text-label text-[26px] leading-label font-bold tracking-body max-mobile:text-[21px]"
              id={titleId}
            >
              {project.title}
            </h2>
            <p className="text-smalldesc mt-0.5 text-[14px] leading-label font-medium tracking-body">
              {project.category}
            </p>
          </header>

          <div className="bg-container-fill relative mt-7 aspect-[1.6] w-full overflow-hidden rounded-[10px] max-mobile:mt-5">
            <Image
              className="object-cover"
              src={project.imageSrc}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 1040px) 100vw, 952px"
            />
          </div>

          <Section className="mt-10 max-mobile:mt-8" title="Project Overview">
            <p className={leadCopyClass}>{project.overview}</p>
          </Section>

          <hr className={dividerClass} />

          <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-x-12 gap-y-9 max-tablet:gap-x-8 max-mobile:grid-cols-1 max-mobile:gap-y-7">
            {project.variant === "uiux" ? (
              <>
                <Section title="Problem Statement">
                  <p className={columnCopyClass}>
                    &ldquo;{project.problem}&rdquo;
                  </p>
                </Section>

                <Section title="Goal">
                  <p className={columnCopyClass}>{project.goal}</p>
                </Section>

                {project.targetUsers.length > 0 && (
                  <Section title="Target User">
                    <ul className="mt-3 flex flex-col gap-4">
                      {project.targetUsers.map(({ label, quote }) => (
                        <li
                          className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-x-2.5"
                          key={label}
                        >
                          <span
                            className="bg-label mt-[0.45rem] size-1.5 rounded-full"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-label text-[14px] leading-label font-bold tracking-body">
                              {label}
                            </p>
                            <p className="text-text mt-1 text-[13px] leading-[1.5] font-medium tracking-body">
                              &ldquo;{quote}&rdquo;
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                <Section title="My Role">
                  <p className={columnCopyClass}>{project.role}</p>
                </Section>
              </>
            ) : (
              <>
                <Section title="Problem">
                  <p className={columnCopyClass}>{project.problem}</p>
                </Section>

                <Section title="Goal">
                  <p className={columnCopyClass}>{project.goal}</p>
                </Section>

                <Section title="My Role">
                  <p className={columnCopyClass}>{project.role}</p>
                </Section>
              </>
            )}
          </div>

          {/* Persona cards only exist on the UI/UX variant. */}
          {project.variant === "uiux" && project.personas.length > 0 && (
            <Section className="mt-12 max-mobile:mt-9" title="User Persona">
              <div className="mt-3 flex flex-col gap-4">
                {project.personas.map((persona) => (
                  <UserPersonaCard key={persona.name} persona={persona} />
                ))}
              </div>
            </Section>
          )}

          {project.variant === "code" && project.technologies.length > 0 && (
            <Section className="mt-11 max-mobile:mt-9" title="Technologies Used">
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li
                    className="bg-accent flex min-w-[7rem] items-center justify-center rounded-full px-5 py-2.5 text-[14px] leading-[1.1] font-semibold whitespace-nowrap text-white"
                    key={technology}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <hr className={dividerClass} />

          <div className="flex flex-wrap items-center gap-2">
            {project.variant === "uiux" ? (
              <>
                <ActionButton
                  href={project.figmaUrl}
                  label="Figma dev view"
                  cursorLabel="Open Figma dev"
                  icon={<BrandIcon name="figma" />}
                />
                <ActionButton
                  href={project.prototypeUrl}
                  label="Prototype view"
                  cursorLabel="Open Figma prototype"
                  icon={
                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={2}
                    />
                  }
                  filled
                />
              </>
            ) : (
              <>
                <ActionButton
                  href={project.sourceUrl}
                  label="View source code"
                  cursorLabel="Open GitHub repo"
                  icon={<BrandIcon name="github" />}
                />
                <ActionButton
                  href={project.demoUrl}
                  label="Live Demo"
                  cursorLabel="Open live website"
                  icon={
                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={2}
                    />
                  }
                  filled
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** The hydration flag below never changes after mount, so there is nothing to watch. */
const subscribeToNothing = () => () => {};

/**
 * Modal case study for a project card. Portalled to <body> because the project
 * grid animates with a transform, which would otherwise contain `position: fixed`.
 */
export default function ProjectOverlay({
  project,
  onClose,
}: {
  project: ProjectDetail | null;
  onClose: () => void;
}) {
  // There is no <body> to portal into on the server, and the first client
  // render has to match that HTML, so the portal waits for hydration.
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  if (!hydrated) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {project && (
        <OverlayPanel key={project.id} project={project} onClose={onClose} />
      )}
    </AnimatePresence>,
    document.body,
  );
}
