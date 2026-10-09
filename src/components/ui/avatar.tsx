import Image from "next/image";
import { UserRound } from "lucide-react";

const TINTS = [
  "bg-lb-butter",
  "bg-lb-sky",
  "bg-lb-rose",
  "bg-lb-pine-100",
  "bg-lb-tangerine-100",
] as const;

type AvatarProps = {
  name?: string;
  src?: string;
  size?: number;
};

function getInitials(name: string) {
  return name
    .replace(/[^a-zA-Z ]/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, src, size = 56 }: AvatarProps) {
  const initials = name ? getInitials(name) : "";
  const background = src
    ? "bg-lb-stone-100"
    : initials
      ? TINTS[(name?.length ?? 0) % TINTS.length]
      : "bg-lb-stone-300";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-bold text-lb-ink ${background}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
    >
      {src ? (
        <Image
          src={src}
          alt={name ?? ""}
          width={size}
          height={size}
          className="size-full object-cover"
        />
      ) : initials ? (
        initials
      ) : (
        <UserRound
          size={Math.round(size * 0.55)}
          className="text-lb-white"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
