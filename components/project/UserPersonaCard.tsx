import Image from "next/image";
import type { UserPersona } from "@/constant/projectdata";

const traitLabelClass =
  "text-label text-[14px] leading-label font-bold tracking-body";
const traitCopyClass =
  "text-text mt-1 text-[13px] leading-[1.5] font-medium tracking-body";

/**
 * Split card from the UI/UX variant of the design: the three persona traits on
 * the left, the portrait with name and one-liner on the right, a hairline rule
 * between them. Exclusive to UI/UX projects.
 */
export default function UserPersonaCard({
  persona,
}: {
  persona: UserPersona;
}) {
  return (
    <article className="border-stroke grid w-full max-w-[47rem] grid-cols-2 overflow-hidden rounded-[14px] border max-tablet:max-w-none max-mobile:grid-cols-1">
      <div className="flex flex-col gap-4 px-7 py-7 max-mobile:px-5 max-mobile:py-6">
        <div>
          <h5 className={traitLabelClass}>Goals</h5>
          <p className={traitCopyClass}>{persona.goal}</p>
        </div>
        <div>
          <h5 className={traitLabelClass}>Pain Points</h5>
          <p className={traitCopyClass}>{persona.painPoint}</p>
        </div>
        <div>
          <h5 className={traitLabelClass}>Motivation</h5>
          <p className={traitCopyClass}>{persona.motivation}</p>
        </div>
      </div>

      <div className="border-stroke border-l p-3 max-mobile:border-t max-mobile:border-l-0">
        <div className="bg-placeholder relative aspect-[4/3] w-full overflow-hidden rounded-[8px]">
          <Image
            className="object-cover"
            src={persona.photo}
            alt={`Portrait of ${persona.name}`}
            fill
            sizes="(max-width: 561px) 85vw, 360px"
          />
        </div>
        <div className="px-1 pt-2.5">
          <h5 className="text-label text-[15px] leading-label font-bold tracking-body">
            {persona.name}
          </h5>
          <p className="text-text mt-1 text-[13px] leading-[1.5] font-medium tracking-body">
            {persona.personDesc}
          </p>
        </div>
      </div>
    </article>
  );
}
