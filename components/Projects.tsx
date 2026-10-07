"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Reveal } from "@/components/Reveal";
import Card from "@/components/project/Card";
import ProjectOverlay from "@/components/project/ProjectOverlay";
import {
  projectCategories,
  projectGroups,
  type ProjectDetail,
} from "@/components/project/projectDetails";

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Cards settle in place rather than sliding in from the side: they rise a
 * little and ease up to full size, staggered by position. Leaving is quicker
 * than arriving and drops downward, so the two directions read as a swap
 * instead of a queue.
 */
const projectCardVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut, delay: 0.06 + index * 0.07 },
  }),
  exit: {
    opacity: 0,
    y: 14,
    scale: 0.97,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(projectCategories[0]);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(
    null,
  );
  const shouldReduceMotion = useReducedMotion();
  const projects = projectGroups[activeCategory];

  return (
    <section
      className="px-8 py-18 max-tablet:py-16 max-mobile:px-5 max-mobile:py-14"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto w-[min(100%,70rem)]">
        <Reveal>
          <h2
            className="text-label mb-5 text-[32px] leading-label font-bold tracking-body"
            id="projects-title"
          >
            Selected projects
          </h2>
        </Reveal>

        <Reveal
          className="mb-7 flex flex-wrap items-center gap-1"
          delay={0.08}
          role="group"
          aria-label="Filter projects by type"
        >
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                className={`focus-visible:outline-accent relative rounded-full border border-transparent px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isActive ? "text-label" : "text-label hover:bg-container-fill"
                }`}
                type="button"
                key={category}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
              >
                {isActive && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-full border border-[#797979]"
                    layoutId="projects-active-category"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                    aria-hidden="true"
                  />
                )}
                {category}
              </button>
            );
          })}
        </Reveal>

        {/* Cards are keyed per project rather than per category, so switching
            filters animates the individual cards that actually changed instead
            of tearing down and rebuilding the whole grid. `popLayout` lifts the
            outgoing ones out of flow so the survivors reflow underneath them. */}
        <motion.div
          className="relative grid grid-cols-2 items-stretch gap-x-9 gap-y-9 max-tablet:gap-x-6 max-mobile:grid-cols-1 max-mobile:gap-y-6"
          layout
          transition={
            shouldReduceMotion
              ? { layout: { duration: 0 } }
              : { layout: { type: "spring", stiffness: 240, damping: 30 } }
          }
          aria-live="polite"
          aria-relevant="additions"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={shouldReduceMotion ? undefined : projectCardVariants}
                custom={index}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                exit={shouldReduceMotion ? undefined : "exit"}
              >
                <Card
                  imageSrc={project.imageSrc}
                  imageAlt={project.title}
                  title={project.title}
                  subtitle={project.subtitle}
                  onClick={() => setActiveProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectOverlay
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
