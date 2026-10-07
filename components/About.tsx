import Image from "next/image";
import { Plus } from "lucide-react";
import pfp from "@/public/pfp.jpeg";
import { Reveal } from "@/components/Reveal";
import ActivityList from "@/components/about/ActivityList";
import ExpandableItem from "@/components/about/ExpandableItem";
import {
  education,
  organizationalActivities,
  organizationalExperiences,
} from "@/constant/personaldata";

// Both card headers share this two-column grid: label on the left, year on the
// right, with a second row for the subtitle.
const cardHeadClass =
  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1";
const itemTitleClass =
  "text-label text-sm leading-label font-semibold tracking-body";
const yearClass =
  "text-label justify-self-end text-sm leading-label font-normal tracking-body whitespace-nowrap";
// Education / experience / activity descriptions.
const descriptionClass =
  "text-smalldesc text-sm leading-[1.4] font-normal tracking-body";
// Section labels: Education, Organizational Experience, Organizational Activities.
const sectionLabelClass =
  "text-label mb-4 text-xl leading-label font-bold tracking-body";

export default function About() {
  return (
    <section
      className="px-8 py-18 max-tablet:py-16 max-mobile:px-5 max-mobile:py-14"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-[min(100%,67rem)]">
        <Reveal>
          <h2
            className="text-label mb-[1.125rem] text-[32px] leading-[1.2] font-bold tracking-body"
            id="about-title"
          >
            Get to know me
          </h2>
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1.39fr)_minmax(0,1fr)] items-start gap-x-[clamp(2.5rem,7vw,5.625rem)] gap-y-12 max-tablet:grid-cols-1">
          <div className="flex flex-col gap-16 max-tablet:gap-12">
            {/* Desktop: photo beside the bio, name and role underneath.
                Mobile: name and role beside the photo, bio underneath. */}
            <Reveal
              className="grid grid-cols-[7.875rem_minmax(0,1fr)] items-start gap-x-6 max-mobile:grid-cols-[4.5rem_minmax(0,1fr)] max-mobile:gap-x-4"
              delay={0.08}
            >
              {/* Stretching to the row rather than carrying its own aspect ratio
                  lets the bio paragraph set the height, so photo and copy line up
                  top and bottom. Mobile keeps a square: there the photo sits beside
                  the name and role, which are far shorter than the bio. */}
              <div className="bg-placeholder relative col-start-1 row-start-1 w-full self-stretch overflow-hidden max-mobile:row-span-2 max-mobile:aspect-square max-mobile:self-start">
                <Image
                  className="object-cover"
                  src={pfp}
                  alt="Al Fatih Miftahul Bilad"
                  fill
                  // Wider than the 126px column on purpose: the frame is taller
                  // than it is wide, so object-cover scales the near-square source
                  // up until it covers the height, and asking for the column width
                  // alone would serve too few pixels.
                  sizes="(max-width: 561px) 96px, 192px"
                />
              </div>
              <p className="text-label col-span-2 row-start-2 mt-3.5 text-xl leading-label font-bold tracking-body max-mobile:col-span-1 max-mobile:col-start-2 max-mobile:row-start-1 max-mobile:mt-0 max-mobile:self-end">
                Al Fatih Miftahul Bilad
              </p>
              <p className="col-span-2 row-start-3 mt-1.5 text-xs leading-label font-semibold tracking-body max-mobile:col-span-1 max-mobile:col-start-2 max-mobile:row-start-2 max-mobile:mt-1 max-mobile:self-start">
                UI/UX Design
              </p>
              <p className="text-text col-start-2 row-start-1 text-base leading-copy font-medium tracking-body max-mobile:col-span-2 max-mobile:col-start-1 max-mobile:row-start-3 max-mobile:mt-4">
                A Computer Science student with a strong passion for UI/UX, web
                development and software engineering. From designing interfaces
                to building behind-the-scenes systems, I combine design
                creativity with programming logic to build responsive,
                intuitive, and efficient web applications. Throughout the
                various projects I&apos;ve worked on, my primary focus is on
                delivering scalable, clean software that solves real-world
                problems.
              </p>
            </Reveal>

            <Reveal as="section">
              <h3 className={sectionLabelClass}>Organizational Activities</h3>
              <ActivityList activities={organizationalActivities} />
            </Reveal>
          </div>

          <div className="flex flex-col gap-7 max-tablet:gap-12">
            <Reveal as="section">
              <h3 className={sectionLabelClass}>Education</h3>
              <ul>
                {education.map((item, index) => (
                  <ExpandableItem
                    className={`border-stroke border-b pb-5 ${index > 0 ? "pt-7" : ""}`}
                    key={item.school}
                    header={
                      <span className={cardHeadClass}>
                        <span className={itemTitleClass}>{item.school}</span>
                        <span className={yearClass}>{item.year}</span>
                        <span className="text-accent text-sm leading-label font-normal tracking-body">
                          {item.major}
                        </span>
                        {item.desc && (
                          // The "+" turns into an "x" while the card is open.
                          <Plus
                            className="group-hover:text-label group-data-[open=true]:rotate-45 justify-self-end transition-[color,transform] duration-200 motion-reduce:transition-none"
                            aria-hidden="true"
                            size={18}
                            strokeWidth={1.5}
                          />
                        )}
                      </span>
                    }
                  >
                    {item.desc && (
                      // Right padding keeps the text clear of the year column.
                      <p
                        className={`${descriptionClass} pt-[1.125rem] pr-16 max-mobile:pr-0`}
                      >
                        {item.desc}
                      </p>
                    )}
                  </ExpandableItem>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section" delay={0.08}>
              <h3 className={sectionLabelClass}>Organizational Experience</h3>
              <ul className="flex max-w-[23.75rem] flex-col gap-5 max-tablet:max-w-none">
                {organizationalExperiences.map((item) => (
                  <ExpandableItem
                    className="border-stroke rounded-xl border p-4 transition-colors duration-[160ms] motion-reduce:transition-none"
                    interactiveClassName="hover:border-text hover:bg-container-fill"
                    key={`${item.title}-${item.orgName}`}
                    header={
                      <span className={cardHeadClass}>
                        <span className={`${itemTitleClass} col-span-full`}>
                          {item.title}
                        </span>
                        <span className="text-smalldesc text-sm leading-label font-semibold tracking-body">
                          {item.orgName}
                        </span>
                        <span className={yearClass}>{item.year}</span>
                      </span>
                    }
                  >
                    {item.desc && (
                      <p className={`${descriptionClass} pt-1.5 pb-2`}>
                        {item.desc}
                      </p>
                    )}
                  </ExpandableItem>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
