import { ButtonLink } from "@/components/ui/button";

export function SiteNav() {
  return (
    <nav
      aria-label="Main"
      className="flex items-center justify-between gap-4 rounded-pill bg-lb-white py-2.5 pr-2.5 pl-6 shadow-md max-sm:pl-4"
    >
      <span className="font-display text-2xl font-extrabold tracking-[-0.045em] max-sm:text-xl">
        linkbase
      </span>
      <div className="flex gap-2">
        <ButtonLink
          href="/sign-in"
          variant="secondary"
          className="max-sm:h-9 max-sm:px-4 max-sm:text-sm"
        >
          Log in
        </ButtonLink>
        <ButtonLink
          href="/sign-in"
          className="max-sm:h-9 max-sm:px-4 max-sm:text-sm"
        >
          Sign up free
        </ButtonLink>
      </div>
    </nav>
  );
}
