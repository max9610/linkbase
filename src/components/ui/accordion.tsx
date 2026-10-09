"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export type AccordionItem = {
  q: string;
  a: string;
};

type AccordionProps = {
  items: AccordionItem[];
  tone?: "light" | "dark";
  defaultOpen?: number;
};

export function Accordion({
  items,
  tone = "light",
  defaultOpen = -1,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const toneClasses =
    tone === "dark"
      ? "bg-white/8 text-lb-white"
      : "bg-lb-white text-lb-ink shadow-inset";

  return (
    <div className="flex flex-col gap-2.5 font-sans">
      {items.map((item, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.q} className={`rounded-lg ${toneClasses}`}>
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-6 py-5 text-left text-md font-semibold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-lb-tangerine/35"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-6 pb-[22px] text-md leading-[1.6] opacity-82"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
