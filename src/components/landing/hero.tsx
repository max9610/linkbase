import { Star } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";

import { ClaimForm } from "./claim-form";
import { SiteNav } from "./site-nav";

export function Hero() {
  return (
    <section className="bg-lb-butter px-[clamp(16px,4vw,24px)] pt-5 pb-[clamp(64px,10vw,120px)] text-lb-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(48px,8vw,96px)]">
        <SiteNav />

        <div className="flex flex-wrap items-end gap-[clamp(40px,6vw,80px)]">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <h1 className="m-0 font-display text-[clamp(44px,8vw,96px)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance">
              One link for everything you make.
            </h1>
            <p className="m-0 max-w-[520px] text-[clamp(18px,2vw,21px)] leading-[1.5] text-pretty">
              Put your videos, shop, newsletter and socials behind a single
              link. Share it in your bio and update it any time.
            </p>
            <ClaimForm />
            <span className="text-sm font-medium">
              Free for your first month · You can change it later.
            </span>
          </div>

          <figure className="m-0 flex min-w-0 flex-[0_1_360px] -rotate-[1.5deg] flex-col gap-3.5 rounded-xl bg-lb-white p-6 shadow-lg motion-reduce:rotate-0">
            <div
              role="img"
              aria-label="5 out of 5 stars"
              className="flex gap-0.5 text-lb-tangerine-600"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="m-0 text-[17px] leading-[1.45] font-medium text-pretty">
              “I moved my whole bio to Linkbase in ten minutes. My shop clicks
              doubled the first week.”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <Avatar name="Maya Ortiz" size={40} />
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold">Maya Ortiz</span>
                <span className="text-[13px] text-lb-stone-600">
                  Ceramicist · maya.studio
                </span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
