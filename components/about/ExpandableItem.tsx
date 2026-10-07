"use client";

import { useId, useState, type ReactNode } from "react";

type ExpandableItemProps = {
  /** Class for the <li>; picks the visual variant (education row, experience card). */
  className: string;
  /** Extra classes applied only when the card can actually be opened (hover cues). */
  interactiveClassName?: string;
  /** Always-visible part of the card. Rendered inside a <button>, so keep it non-interactive. */
  header: ReactNode;
  /** Content revealed when the card is open. When empty, the card renders as static content. */
  children?: ReactNode;
};

export default function ExpandableItem({
  className,
  interactiveClassName = "",
  header,
  children,
}: ExpandableItemProps) {
  // Every card starts closed; the user opens the ones they care about.
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Nothing to reveal yet, so there's nothing to toggle.
  if (!children) {
    return (
      <li className={className}>
        <h4>{header}</h4>
      </li>
    );
  }

  return (
    <li
      className={`group relative ${className} ${interactiveClassName}`}
      data-open={open}
    >
      <h4 className="rounded-[inherit]">
        <button
          type="button"
          // The ::after stretches the click target over the whole card,
          // description included, and carries the focus ring.
          className="focus-visible:after:outline-accent block w-full cursor-pointer rounded-[inherit] text-left after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[3px]"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          {header}
        </button>
      </h4>
      <div
        className={`grid transition-[grid-template-rows,visibility] duration-[220ms] ease-[ease] motion-reduce:transition-none ${
          open
            ? "visible grid-rows-[1fr] delay-0"
            : "invisible grid-rows-[0fr] [transition-delay:0s,220ms]"
        }`}
        id={panelId}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </li>
  );
}
