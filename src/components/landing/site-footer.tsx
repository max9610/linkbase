import {
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

const FOOTER_LINKS = ["Pricing", "Help", "Privacy", "Terms"] as const;

const SOCIALS = [
  { label: "Instagram", icon: SiInstagram },
  { label: "TikTok", icon: SiTiktok },
  { label: "YouTube", icon: SiYoutube },
] as const;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-lb-tangerine/35";

export function SiteFooter() {
  return (
    <footer className="bg-lb-ink px-[clamp(16px,4vw,24px)] py-10 text-lb-stone-300">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <span className="font-display text-[22px] font-extrabold tracking-[-0.045em] text-lb-white">
          linkbase
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {/* placeholder hrefs until these pages exist */}
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className={`rounded-xs hover:underline ${focusRing}`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-lb-stone-400">© 2026 Linkbase</span>
          <div className="flex gap-2">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className={`flex size-11 items-center justify-center rounded-full bg-lb-ink-2 text-lb-white sm:size-9 ${focusRing}`}
              >
                <Icon size={16} color="currentColor" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
