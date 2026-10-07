"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";
import { ArrowDown } from "lucide-react";

type Activity = {
  picture: StaticImageData;
  name: string;
  date: string;
  desc: string;
};

// How many activities are visible before "Show all" is clicked.
const VISIBLE_COUNT = 2;

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  const [showAll, setShowAll] = useState(false);
  const listId = useId();
  const visibleActivities = showAll
    ? activities
    : activities.slice(0, VISIBLE_COUNT);

  return (
    // Padding instead of margin so it doesn't collapse into the heading's.
    <div className="max-w-[33rem] pt-1.5 max-tablet:max-w-none">
      <ul className="border-stroke border-t" id={listId}>
        {visibleActivities.map((activity) => (
          <li
            className="border-stroke flex items-center gap-6 border-b py-[0.8125rem] max-mobile:gap-4"
            key={activity.name}
          >
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
          </li>
        ))}
      </ul>

      {activities.length > VISIBLE_COUNT && (
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
