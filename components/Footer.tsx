import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { socialProfiles } from "@/constant/personaldata";

// White marks for the dark footer. URLs come from the shared list so the navbar
// and the footer can never drift apart.
const socialLinks = [
  { label: "LinkedIn", icon: "/linkedin.svg" },
  { label: "GitHub", icon: "/github.svg" },
  { label: "Dribbble", icon: "/dribble.svg" },
] as const;

export default function Footer() {
  return (
    <footer
      className="bg-dark px-[clamp(1.25rem,5.7vw,6.25rem)] pt-24 pb-16 text-white max-tablet:pt-20 max-tablet:pb-12 max-mobile:pt-14 max-mobile:pb-8"
      id="contact"
      aria-labelledby="footer-title"
      // One attribute here flips the cursor to white for the whole dark section.
      data-cursor-theme="invert"
    >
      <div className="w-full">
        <Reveal>
          <h2
            className="text-[clamp(3.5rem,7.3vw,8rem)] leading-[0.95] font-bold tracking-[-0.065em]"
            id="footer-title"
          >
            Stay Connected
          </h2>
        </Reveal>

        <div className="mt-28 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-12 max-tablet:mt-20 max-tablet:grid-cols-1 max-tablet:items-start max-tablet:gap-10 max-mobile:mt-14 max-mobile:gap-9">
          <Reveal>
            <h3 className="max-w-xl text-[40px] leading-[1.02] font-bold tracking-[-0.04em] max-mobile:text-[clamp(1.75rem,7vw,2.5rem)]">
              Let&apos;s <span className="text-accent">create</span> incredible
              work <span className="text-accent">together</span>
            </h3>
            <p className="text-stroke mt-3 text-base leading-copy font-normal">
              Ready to collaborate on your next project or discuss new
              opportunities?
            </p>

            <div className="mt-8">
              <p className="text-stroke text-sm leading-label font-semibold">
                Email
              </p>
              <a
                className="mt-1 inline-block text-base leading-label font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                href="mailto:Alfatihmiftahul.mz@gmail.com"
                data-cursor="pill"
                data-cursor-label="Email me"
              >
                Alfatihmiftahul.mz@gmail.com
              </a>
            </div>
          </Reveal>

          <Reveal className="min-w-40" delay={0.1}>
            <h3 className="text-xl leading-label font-bold">Get in touch</h3>
            <ul className="mt-3 flex items-center gap-3" aria-label="Social links">
              {socialLinks.map(({ label, icon }) => (
                <li key={label}>
                  <a
                    className="inline-flex rounded-sm focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={socialProfiles[label]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    data-cursor="pill"
                    data-cursor-label={`Visit ${label}`}
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={42}
                      height={42}
                      className="size-10"
                    />
                  </a>
                </li>
              ))}
            </ul>

          </Reveal>
        </div>

        {/* Deliberately not revealed: it sits in the last 20% of the page, which
            is below the trigger line even at maximum scroll, so it would stay
            invisible forever. */}
        <div className="border-stroke/40 mt-10 border-t pt-5">
          <p className="text-stroke text-xs leading-label font-normal">
            Alfatih Miftahul 
          </p>
        </div>
      </div>
    </footer>
  );
}
