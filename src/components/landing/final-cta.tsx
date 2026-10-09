import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-lb-butter px-[clamp(16px,4vw,24px)] py-[clamp(64px,10vw,120px)] text-lb-pine">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
        <h2 className="m-0 font-display text-[clamp(40px,7vw,80px)] leading-none font-extrabold tracking-[-0.035em] text-balance">
          Your link is waiting.
        </h2>
        <p className="m-0 max-w-[480px] text-[clamp(17px,2vw,20px)] leading-[1.5]">
          Claim your username before someone else does. It takes less than a
          minute.
        </p>
        <ButtonLink href="#claim" size="lg" iconRight={ArrowRight}>
          Get started for free
        </ButtonLink>
      </div>
    </section>
  );
}
