import { Paintbrush, Sparkles, Zap, type LucideIcon } from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
  body: string;
  tint: string;
};

const REASONS: Reason[] = [
  {
    icon: Zap,
    title: "Live in a minute",
    body: "Pick a username, add a few links and share. No setup, no code.",
    tint: "bg-lb-tangerine-100 text-lb-tangerine-600",
  },
  {
    icon: Paintbrush,
    title: "Looks like you",
    body: "Choose colors, button shapes and fonts that match the rest of your work.",
    tint: "bg-lb-pine-100 text-lb-pine",
  },
  {
    icon: Sparkles,
    title: "See what works",
    body: "Clicks for every link, so you know what your audience actually opens.",
    tint: "bg-lb-plum-100 text-lb-plum",
  },
];

export function Reasons() {
  return (
    <section className="bg-lb-white px-[clamp(16px,4vw,24px)] py-[clamp(56px,8vw,96px)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(28px,4vw,48px)]">
        {REASONS.map(({ icon: Icon, title, body, tint }) => (
          <div key={title} className="flex flex-col gap-3.5">
            <div
              className={`flex size-[52px] items-center justify-center rounded-full ${tint}`}
            >
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3 className="m-0 font-display text-[26px] leading-[1.1] font-bold tracking-[-0.03em]">
              {title}
            </h3>
            <p className="m-0 max-w-[340px] text-[17px] leading-[1.5] text-pretty text-lb-stone-600">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
