import Image, { type ImageProps } from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CardProps {
  imageSrc: ImageProps["src"];
  imageAlt: string;
  title: string;
  subtitle: string;
  /** Opens the project overlay. */
  onClick: () => void;
}

export default function Card({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  onClick,
}: CardProps) {
  return (
    <article className="bg-container-fill relative flex h-full flex-col rounded-[10px] p-[11px] transition-colors duration-[160ms] hover:bg-[#e2e2e2] motion-reduce:transition-none">
      <div className="relative aspect-[1.56] w-full overflow-hidden rounded-[7px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 540px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col pt-7.5 pb-1">
        <h3 className="text-label text-xl leading-label font-bold tracking-body">
          {title}
        </h3>
        <p className="text-smalldesc mt-1 text-[16px] leading-[1.4] font-medium tracking-body">
          {subtitle}
        </p>

        {/* The ::after stretches the hit area over the whole card and carries
            the focus ring, so the heading keeps its semantics. */}
        <button
          className="text-accent focus-visible:after:outline-accent mt-3 inline-flex cursor-pointer items-center gap-1 self-end text-sm leading-label font-medium after:absolute after:inset-0 after:rounded-[10px] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[3px]"
          type="button"
          onClick={onClick}
          aria-label={`See more about ${title}`}
        >
          Click to see more
          <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}
