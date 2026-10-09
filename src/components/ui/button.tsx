import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant =
  "primary" | "accent" | "secondary" | "outline" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonContentProps = {
  icon?: LucideIcon;
  iconRight?: LucideIcon;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lb-ink text-lb-white hover:bg-lb-ink-2",
  accent: "bg-lb-tangerine text-lb-ink hover:bg-lb-tangerine-600",
  secondary: "bg-lb-stone-100 text-lb-ink hover:bg-lb-stone-200",
  outline: "border-lb-stone-300 bg-lb-white text-lb-ink hover:bg-lb-stone-50",
  ghost: "bg-transparent text-lb-ink hover:bg-lb-stone-100",
  inverse: "bg-lb-white text-lb-ink hover:bg-lb-stone-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-12 gap-2 px-[22px] text-md",
  lg: "h-14 gap-2.5 px-7 text-lg",
};

const iconSizes: Record<ButtonSize, number> = { sm: 16, md: 20, lg: 22 };

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonStyleProps) {
  return [
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-pill border border-transparent font-sans font-semibold tracking-[-0.005em]",
    "transition duration-[120ms] ease-out active:scale-[.97] motion-reduce:active:scale-100",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-lb-tangerine/35",
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");
}

function ButtonContent({
  icon: Icon,
  iconRight: IconRight,
  size = "md",
  children,
}: ButtonContentProps & { size?: ButtonSize; children: ReactNode }) {
  const iconSize = iconSizes[size];
  return (
    <>
      {Icon ? <Icon size={iconSize} aria-hidden="true" /> : null}
      {children}
      {IconRight ? <IconRight size={iconSize} aria-hidden="true" /> : null}
    </>
  );
}

type ButtonProps = ComponentProps<"button"> &
  ButtonStyleProps &
  ButtonContentProps;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  icon,
  iconRight,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    >
      <ButtonContent icon={icon} iconRight={iconRight} size={size}>
        {children}
      </ButtonContent>
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> &
  ButtonStyleProps &
  ButtonContentProps;

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  icon,
  iconRight,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    >
      <ButtonContent icon={icon} iconRight={iconRight} size={size}>
        {children}
      </ButtonContent>
    </Link>
  );
}
