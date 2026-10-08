# Linkbase Design System: Foundations

The source of truth is `styles.css` → `tokens/*.css` in the design-system project. Values marked **TBD** are not defined by the system yet. Don't fill them in without design sign-off.

## Tailwind setup

The examples use Tailwind v4 (`@theme` in CSS). Each `--color-*`, `--radius-*`, `--shadow-*` and `--text-*` variable generates the matching utilities (`bg-lb-ink`, `rounded-pill`, `shadow-md`, `text-3xl`). The radius, shadow and font-size names **intentionally override** Tailwind's defaults so that the standard class names map to Linkbase values.

On Tailwind v3, put the same keys under `theme.extend.colors`, `borderRadius`, `boxShadow` and `fontSize` in `tailwind.config.ts`.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* neutrals */
  --color-lb-ink: #16130F;
  --color-lb-ink-2: #2B2722;
  --color-lb-stone-700: #4A443C;
  --color-lb-stone-600: #6E675D;
  --color-lb-stone-400: #A39B8F;
  --color-lb-stone-300: #CFC8BC;
  --color-lb-stone-200: #E4DFD6;
  --color-lb-stone-100: #EFEBE4;
  --color-lb-stone-50: #F7F4EE;
  --color-lb-white: #FFFFFF;
  /* brand */
  --color-lb-tangerine: #FF5B2E;
  --color-lb-tangerine-600: #E5441A;
  --color-lb-tangerine-100: #FFE3D8;
  --color-lb-pine: #0E3B3A;
  --color-lb-pine-600: #0A2C2B;
  --color-lb-pine-100: #D5E6E2;
  --color-lb-butter: #F6D743;
  --color-lb-butter-100: #FBF1BF;
  --color-lb-sky: #A8D8FF;
  --color-lb-sky-100: #E1F1FF;
  --color-lb-plum: #2E1A47;
  --color-lb-plum-100: #E4DCEF;
  --color-lb-rose: #FFB8C9;
  /* semantic */
  --color-lb-success: #1F9D55;
  --color-lb-success-100: #DDF3E6;
  --color-lb-warning: #C98A00;
  --color-lb-warning-100: #FCEFCB;
  --color-lb-danger: #D93A2B;
  --color-lb-danger-100: #FBE1DE;
  --color-lb-info: #2F6FEB;
  --color-lb-info-100: #DFE9FD;

  /* fonts (load via next/font, see Typography) */
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-instrument), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;

  /* type scale */
  --text-xs: 12px;  --text-sm: 14px;  --text-md: 16px;  --text-lg: 18px;
  --text-xl: 22px;  --text-2xl: 28px; --text-3xl: 40px; --text-4xl: 56px; --text-5xl: 80px;

  /* radius */
  --radius-xs: 6px; --radius-sm: 10px; --radius-md: 14px; --radius-lg: 20px;
  --radius-xl: 28px; --radius-2xl: 40px; --radius-pill: 999px;

  /* shadows */
  --shadow-xs: 0 1px 2px rgba(22,19,15,.06);
  --shadow-sm: 0 1px 2px rgba(22,19,15,.05), 0 2px 8px rgba(22,19,15,.06);
  --shadow-md: 0 2px 4px rgba(22,19,15,.04), 0 8px 24px rgba(22,19,15,.08);
  --shadow-lg: 0 4px 8px rgba(22,19,15,.05), 0 24px 56px rgba(22,19,15,.14);
  --shadow-inset: inset 0 0 0 1px #E4DFD6;

  /* motion */
  --ease-out: cubic-bezier(.2,.8,.2,1);
  --ease-spring: cubic-bezier(.34,1.56,.64,1);
}
```

## Colors

### Neutrals (warm stone)

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `lb-ink` | `#16130F` | `bg-lb-ink` / `text-lb-ink` | Primary text, primary button, inverse surfaces |
| `lb-ink-2` | `#2B2722` | `bg-lb-ink-2` | Primary button hover |
| `lb-stone-700` | `#4A443C` | `text-lb-stone-700` | Not assigned to a role |
| `lb-stone-600` | `#6E675D` | `text-lb-stone-600` | Secondary text |
| `lb-stone-400` | `#A39B8F` | `text-lb-stone-400` | Muted text, inactive tabs, drag handles |
| `lb-stone-300` | `#CFC8BC` | `bg-lb-stone-300` / `border-lb-stone-300` | Strong border, switch off, public-page backdrop |
| `lb-stone-200` | `#E4DFD6` | `bg-lb-stone-200` / `border-lb-stone-200` | Subtle border, hover fill |
| `lb-stone-100` | `#EFEBE4` | `bg-lb-stone-100` | Sunken fill (inputs, secondary button), profile background |
| `lb-stone-50` | `#F7F4EE` | `bg-lb-stone-50` | App background |
| `lb-white` | `#FFFFFF` | `bg-lb-white` | Page and card surface |

### Brand

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `lb-tangerine` | `#FF5B2E` | `bg-lb-tangerine` | Accent CTA, hero, switch on, focus glow |
| `lb-tangerine-600` | `#E5441A` | `bg-lb-tangerine-600` / `text-lb-tangerine-600` | Accent hover, accent text, link hover |
| `lb-tangerine-100` | `#FFE3D8` | `bg-lb-tangerine-100` | Tint fill, avatar tint |
| `lb-pine` | `#0E3B3A` | `bg-lb-pine` | Marketing block, themed profile |
| `lb-pine-600` | `#0A2C2B` | `bg-lb-pine-600` | Not assigned to a role |
| `lb-pine-100` | `#D5E6E2` | `bg-lb-pine-100` | Tint fill, avatar tint |
| `lb-butter` | `#F6D743` | `bg-lb-butter` | Marketing block, "Pro" badge, text selection |
| `lb-butter-100` | `#FBF1BF` | `bg-lb-butter-100` | Tint fill |
| `lb-sky` | `#A8D8FF` | `bg-lb-sky` | Marketing block, avatar tint |
| `lb-sky-100` | `#E1F1FF` | `bg-lb-sky-100` | Tint fill |
| `lb-plum` | `#2E1A47` | `bg-lb-plum` | Marketing block (FAQ) |
| `lb-plum-100` | `#E4DCEF` | `bg-lb-plum-100` | Tint fill |
| `lb-rose` | `#FFB8C9` | `bg-lb-rose` / `text-lb-rose` | Text on plum, avatar tint |

**Marketing section pairs** (background / foreground). Use only these:

| Background | Foreground | Classes |
|---|---|---|
| Tangerine | Ink | `bg-lb-tangerine text-lb-ink` |
| Pine | Butter | `bg-lb-pine text-lb-butter` |
| Sky | Plum | `bg-lb-sky text-lb-plum` |
| Plum | Rose (headings) / White (body) | `bg-lb-plum text-lb-white` |
| Stone 100 | Ink | `bg-lb-stone-100 text-lb-ink` |

### Semantic

| Token | Hex | Tailwind |
|---|---|---|
| `lb-success` | `#1F9D55` | `text-lb-success` / `bg-lb-success` |
| `lb-success-100` | `#DDF3E6` | `bg-lb-success-100` |
| `lb-warning` | `#C98A00` | `text-lb-warning` |
| `lb-warning-100` | `#FCEFCB` | `bg-lb-warning-100` |
| `lb-danger` | `#D93A2B` | `text-lb-danger` / `ring-lb-danger` |
| `lb-danger-100` | `#FBE1DE` | `bg-lb-danger-100` |
| `lb-info` | `#2F6FEB` | `text-lb-info` |
| `lb-info-100` | `#DFE9FD` | `bg-lb-info-100` |

Only `lb-danger` is used by components (input error). Usage rules for success, warning and info (toasts, banners) are **TBD**.

### Semantic aliases

Use these roles in components rather than raw palette names. In Tailwind, either reference the palette class shown or add the aliases to `@theme` as `--color-surface-card` and so on.

| Role | Maps to | Tailwind |
|---|---|---|
| bg-page | white | `bg-lb-white` |
| bg-app | stone-50 | `bg-lb-stone-50` |
| bg-profile | stone-100 | `bg-lb-stone-100` |
| bg-overlay | `rgba(22,19,15,.48)` | `bg-lb-ink/48` |
| surface-card | white | `bg-lb-white` |
| surface-sunken | stone-100 | `bg-lb-stone-100` |
| surface-hover | stone-200 | `hover:bg-lb-stone-200` |
| surface-inverse | ink | `bg-lb-ink` |
| text-primary | ink | `text-lb-ink` |
| text-secondary | stone-600 | `text-lb-stone-600` |
| text-muted | stone-400 | `text-lb-stone-400` |
| text-inverse | white | `text-lb-white` |
| text-accent | tangerine-600 | `text-lb-tangerine-600` |
| border-subtle | stone-200 | `border-lb-stone-200` |
| border-strong | stone-300 | `border-lb-stone-300` |
| border-inverse | `rgba(255,255,255,.18)` | `border-white/18` |
| action-primary | ink → hover ink-2, fg white | `bg-lb-ink hover:bg-lb-ink-2 text-lb-white` |
| action-accent | tangerine → hover tangerine-600, fg ink | `bg-lb-tangerine hover:bg-lb-tangerine-600 text-lb-ink` |
| action-secondary | stone-100 → hover stone-200, fg ink | `bg-lb-stone-100 hover:bg-lb-stone-200 text-lb-ink` |
| control-on / off | tangerine / stone-300 | `bg-lb-tangerine` / `bg-lb-stone-300` |

Dark mode: **TBD** (not defined).

## Typography

| Family | Role | Weights | Source |
|---|---|---|---|
| Bricolage Grotesque | Display and headings | 700, 800 | Google Fonts (substitute, since no brand files were supplied) |
| Instrument Sans | All UI and body text | 400, 500, 600, 700 | Google Fonts |
| JetBrains Mono | Docs and specs only | 400, 500 | Google Fonts |

```ts
// app/layout.tsx
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });
// <html className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}>
```

### Scale

| Token | Size | Tailwind |
|---|---|---|
| xs | 12px | `text-xs` |
| sm | 14px | `text-sm` |
| md | 16px | `text-md` (base) |
| lg | 18px | `text-lg` |
| xl | 22px | `text-xl` |
| 2xl | 28px | `text-2xl` |
| 3xl | 40px | `text-3xl` |
| 4xl | 56px | `text-4xl` |
| 5xl | 80px | `text-5xl` |

| Line-height | Value | Tailwind | Tracking | Value | Tailwind |
|---|---|---|---|---|---|
| tight | 1.02 | `leading-[1.02]` | display | −0.035em | `tracking-[-0.035em]` |
| snug | 1.2 | `leading-[1.2]` | heading | −0.02em | `tracking-[-0.02em]` |
| normal | 1.45 | `leading-[1.45]` | body | 0 | `tracking-normal` |
| relaxed | 1.6 | `leading-[1.6]` | caps | 0.06em | `tracking-[0.06em]` |

### Roles

| Role | Spec | Tailwind |
|---|---|---|
| Display | Bricolage 800 / 80px / 1.02 / −0.035em | `font-display font-extrabold text-5xl leading-[1.02] tracking-[-0.035em]` |
| H1 | Bricolage 800 / 56px / 1.02 / −0.035em | `font-display font-extrabold text-4xl leading-[1.02] tracking-[-0.035em]` |
| H2 | Bricolage 700 / 40px / 1.08 / −0.02em | `font-display font-bold text-3xl leading-[1.08] tracking-[-0.02em]` |
| H3 | Bricolage 700 / 28px / 1.2 / −0.02em | `font-display font-bold text-2xl leading-[1.2] tracking-[-0.02em]` |
| Title | Instrument 600 / 18px / 1.2 | `font-sans font-semibold text-lg leading-[1.2]` |
| Body | Instrument 400 / 16px / 1.45 | `font-sans text-md leading-[1.45]` |
| Label | Instrument 500 / 14px / 1.2 | `font-sans font-medium text-sm leading-[1.2]` |
| Caption | Instrument 400 / 12px / 1.45 | `font-sans text-xs leading-[1.45]` |

These sizes appear in the kits but aren't on the token scale: marketing hero 88px / 0.98 / −0.045em, marketing H2 64px, welcome H1 48px, editor heading 32px, wordmark −0.045em. Whether to promote them to tokens is **TBD**.

## Spacing

The 4px base matches Tailwind's default spacing scale exactly, so no config is needed.

| Token | Value | Tailwind |
|---|---|---|
| space-1 | 4px | `p-1` / `gap-1` |
| space-2 | 8px | `p-2` |
| space-3 | 12px | `p-3` |
| space-4 | 16px | `p-4` |
| space-5 | 20px | `p-5` |
| space-6 | 24px | `p-6` |
| space-8 | 32px | `p-8` |
| space-10 | 40px | `p-10` |
| space-12 | 48px | `p-12` |
| space-16 | 64px | `p-16` |
| space-20 | 80px | `p-20` |
| space-24 | 96px | `p-24` |

### Sizing tokens

| Token | Value | Tailwind |
|---|---|---|
| control-sm | 36px | `h-9` |
| control-md | 48px | `h-12` |
| control-lg | 56px | `h-14` |
| profile-width | 580px | `max-w-[580px]` |
| app-panel-width | 620px | `max-w-[620px]` |
| content-max | 1200px | `max-w-[1200px]` |

### Spacing in use

| Context | Value |
|---|---|
| Editor card padding | 36px sides and top, 28px bottom |
| Editor card internal gap | 22px |
| Public link stack gap | 14px (8px in compact preview) |
| Editor link list gap | 12px |
| Marketing section vertical padding | 120px |
| Marketing two-column gap | 64px |

## Radius

| Token | Value | Tailwind | Use |
|---|---|---|---|
| xs | 6px | `rounded-xs` | Square link shape |
| sm | 10px | `rounded-sm` | Link thumbnail |
| md | 14px | `rounded-md` | Inputs, thumbnail tiles |
| lg | 20px | `rounded-lg` | Link buttons, accordion rows |
| xl | 28px | `rounded-xl` | Editor link rows, dashboard sheet top |
| 2xl | 40px | `rounded-2xl` | Editor panel, profile frame, footer card |
| pill | 999px | `rounded-pill` | All buttons, URL pills, nav, badges |

Phone preview frames use 44px outer and 36px inner radius. These aren't tokens; use `rounded-[44px]` and `rounded-[36px]`.

## Shadows

| Token | Value | Tailwind | Use |
|---|---|---|---|
| xs | `0 1px 2px rgba(22,19,15,.06)` | `shadow-xs` | Link button rest, switch knob |
| sm | `0 1px 2px rgba(22,19,15,.05), 0 2px 8px rgba(22,19,15,.06)` | `shadow-sm` | Elevated icon buttons, preview toolbar |
| md | `0 2px 4px rgba(22,19,15,.04), 0 8px 24px rgba(22,19,15,.08)` | `shadow-md` | Editor panel, site nav, link hover |
| lg | `0 4px 8px rgba(22,19,15,.05), 0 24px 56px rgba(22,19,15,.14)` | `shadow-lg` | Phone preview, profile frame, hero cards |
| inset | `inset 0 0 0 1px #E4DFD6` | `shadow-inset` | Hairline card border (editor rows) |

Focus ring: `0 0 0 3px rgba(255,91,46,.35)` → `focus-visible:ring-[3px] focus-visible:ring-lb-tangerine/35`.

## Breakpoints

**TBD.** The system defines no breakpoints, and every kit screen was designed at desktop width (1440px) only. Until they're defined, Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536) are a placeholder, not a spec. Mobile layouts for the dashboard and marketing site are **TBD**. The public profile is a single column capped at 580px, so it already works at mobile widths.

## Motion

| Token | Value | Tailwind |
|---|---|---|
| dur-fast | 120ms | `duration-[120ms]` |
| dur-base | 200ms | `duration-200` |
| dur-slow | 360ms | `duration-[360ms]` |
| ease-out (default) | `cubic-bezier(.2,.8,.2,1)` | `ease-out` (from `@theme`) |
| ease-spring | `cubic-bezier(.34,1.56,.64,1)` | `ease-spring` (from `@theme`) |
| press-scale | 0.97 | `active:scale-[.97]` |

| Interaction | Behavior |
|---|---|
| Button hover | Fill darkens one step, 120ms |
| Button press | Scale 0.97, 120ms |
| Link button hover | Lift `-translate-y-px` + `shadow-md`, 200ms shadow |
| Link button press | Scale 0.985 |
| Switch | Track color 200ms ease-out; knob 200ms ease-spring |
| Accordion chevron | Rotates 180°, 200ms (the panel itself has no height animation) |
| Panels | 360ms (no panel transitions are specified yet) |

`prefers-reduced-motion` handling is **TBD**. Recommendation: drop the transforms and keep the color transitions.

## Other

| Item | Status |
|---|---|
| Blur | `saturate(1.4) blur(16px)`. Only for floating chrome over content |
| Text selection | `selection:bg-lb-butter` |
| Default link | `text-lb-ink underline underline-offset-2 hover:text-lb-tangerine-600` |
| Z-index scale | **TBD** |
| Opacity scale | Disabled = 0.4, hidden link row = 0.55. Nothing else is defined |
| Logo | **TBD**. Wordmark only: "linkbase", Bricolage 800, −0.045em |
| Icon sets | Lucide (`lucide-react`) for UI; Simple Icons for social glyphs |
