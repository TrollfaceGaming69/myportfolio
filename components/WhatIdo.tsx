import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const services = [
  {
    title: "UI/UX Design",
    description:
      "Thoughtful digital products shaped around strong structure, refined visuals, and intuitive user experiences.",
  },
  {
    title: "Frontend Development",
    description:
      "Engaging interfaces built with thoughtful design systems, crisp motion, and accessible interactions.",
  },
  {
    title: "Fullstack Development",
    description:
      "Cohesive web applications connected by seamless integrations, robust APIs, and fluid interfaces.",
  },
  {
    title: "Software Engineering",
    description:
      "Resilient systems grounded in clean architecture, clear logic, and reliable end-to-end functionality.",
  },
];

const capabilities = [
  {
    title: "I do",
    items: [
      "Problem solving",
      "Concept & Wireframing",
      "Design mockups",
      "Design implementation",
    ],
  },
  {
    title: "I create",
    items: ["Web & app designs", "Frontend websites", "Fullstack websites"],
  },
  {
    title: "I use",
    items: [
      "Figma, Miro",
      "React, Vue, Next.js",
      "Node.js, Express, Laravel, MongoDB, MySQL",
      "Git, Docker, Postman, Vercel",
    ],
  },
];

export default function WhatIdo() {
  return (
    <section
      className="px-8 py-18 max-tablet:py-16 max-mobile:px-5 max-mobile:py-14"
      id="what-i-do"
      aria-labelledby="what-i-do-title"
    >
      <div className="mx-auto w-[min(100%,67rem)]">
        <Reveal>
          <h2
            className="text-label mb-8 text-[32px] leading-label font-bold tracking-body"
            id="what-i-do-title"
          >
            What I do
          </h2>
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start gap-x-[clamp(3rem,9vw,7rem)] max-tablet:grid-cols-1 max-tablet:gap-y-12">
          <RevealGroup className="flex flex-col" as="ol">
            {services.map(({ title, description }, index) => (
              <RevealItem
                className="border-stroke/50 grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2 border-b py-6 first:pt-0"
                as="li"
                key={title}
              >
                <span className="text-smalldesc pt-0.5 text-[12px] leading-label font-normal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-label text-[20px] leading-label font-bold tracking-body">
                    {title}
                  </h3>
                  <p                   className="text-smalldesc mt-2 text-[16px] leading-[1.4] font-medium tracking-body">
                    {description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="flex flex-col gap-7">
            {capabilities.map(({ title, items }) => (
              <RevealItem as="section" key={title} aria-label={title}>
                <h3                 className="text-accent mb-3 text-[20px] leading-label font-bold tracking-body">
                  {title}
                </h3>
                <ul>
                  {items.map((item) => (
                    <li
                      className="border-stroke flex min-h-10 items-center gap-3 border-b border-dashed py-2"
                      key={item}
                    >
                      <ArrowRight
                        className="text-accent shrink-0"
                        aria-hidden="true"
                        size={16}
                        strokeWidth={1.8}
                      />
                      <span className="text-label text-sm leading-label font-bold tracking-body">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
