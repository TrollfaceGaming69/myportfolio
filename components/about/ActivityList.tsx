"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Activity = {
  picture: StaticImageData;
  name: string;
  date: string;
  desc: string;
};

// How many activities are visible before "Show all" is clicked.
const VISIBLE_COUNT = 2;

const easeOut = [0.22, 1, 0.36, 1] as const;

// Height carries the reveal; opacity trails slightly behind it so the content
// isn't visible while it's still squashed, and leads on the way out so it has
// faded before the row finishes closing.
const expand = {
  height: { duration: 0.34, ease: easeOut },
  opacity: { duration: 0.26, ease: easeOut, delay: 0.08 },
};

const collapse = {
  height: { duration: 0.28, ease: easeOut },
  opacity: { duration: 0.14, ease: easeOut },
};

/** The visible part of a row. Split out so both the static and animated rows share it. */
function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div className="border-stroke flex items-center gap-6 border-b py-[0.8125rem] max-mobile:gap-4">
      <div className="min-w-0 flex-1">
        <h4 className="text-label text-sm leading-label font-semibold tracking-body">
          {activity.name}
        </h4>
        <p className="text-label mt-[0.1875rem] text-sm leading-label font-normal tracking-body">
          {activity.date}
        </p>
        <p className="text-smalldesc mt-1 text-sm leading-[1.4] font-normal tracking-body">
          {activity.desc}
        </p>
      </div>
      <Image
        className="aspect-[14/9] h-auto w-42 flex-none rounded-lg object-cover max-mobile:w-28"
        src={activity.picture}
        alt={`${activity.name} documentation`}
        sizes="(max-width: 560px) 112px, 168px"
      />
    </div>
  );
}

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  const [showAll, setShowAll] = useState(false);
  const listId = useId();
  const shouldReduceMotion = useReducedMotion();

  // The first rows are always mounted; only the rest come and go, so only they
  // need to animate.
  const alwaysOn = activities.slice(0, VISIBLE_COUNT);
  const extras = activities.slice(VISIBLE_COUNT);

  return (
    // Padding instead of margin so it doesn't collapse into the heading's.
    <div className="max-w-[33rem] pt-1.5 max-tablet:max-w-none">
      <ul className="border-stroke border-t" id={listId}>
        {alwaysOn.map((activity) => (
          <li key={activity.name}>
            <ActivityRow activity={activity} />
          </li>
        ))}

        {/* AnimatePresence renders no element of its own, so these stay direct
            children of the <ul>. The rows collapse their own height, which also
            slides the "Show all" button along with them. */}
        <AnimatePresence initial={false}>
          {showAll &&
            extras.map((activity) => (
              <motion.li
                className="overflow-hidden"
                key={activity.name}
                initial={
                  shouldReduceMotion ? false : { height: 0, opacity: 0 }
                }
                animate={{ height: "auto", opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? undefined
                    : { height: 0, opacity: 0, transition: collapse }
                }
                transition={shouldReduceMotion ? { duration: 0 } : expand}
              >
                <ActivityRow activity={activity} />
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>

      {extras.length > 0 && (
        <button
          type="button"
          className="text-accent focus-visible:outline-accent mx-auto mt-2.5 flex w-fit cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm leading-label font-normal tracking-body underline-offset-[3px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-controls={listId}
          aria-expanded={showAll}
          onClick={() => setShowAll((current) => !current)}
        >
          {showAll ? "Show less" : "Show all"}
          <ArrowDown
            className={`transition-transform duration-200 motion-reduce:transition-none ${
              showAll ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            size={14}
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
}
