# Linkbase UI: Components, Layouts, Accessibility

Read with `design-system.md` (tokens and Tailwind classes). Values marked **TBD** are not defined by the system.

Icons: use `lucide-react` (2px stroke) for UI icons and Simple Icons (`simple-icons` / `@icons-pack/react-simple-icons`) for social glyphs. Social glyphs are always monochrome.

---

## Core

### Button

A pill-shaped action. Use `primary` for the main action in the app and `accent` for marketing CTAs.

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` `accent` `secondary` `outline` `ghost` `inverse` | `primary` |
| `size` | `sm` `md` `lg` | `md` |
| `icon` / `iconRight` | Lucide icon | – |
| `fullWidth`, `disabled`, `type` | | `false`, `false`, `button` |

| Variant | Rest | Hover |
|---|---|---|
| primary | `bg-lb-ink text-lb-white` | `bg-lb-ink-2` |
| accent | `bg-lb-tangerine text-lb-ink` | `bg-lb-tangerine-600` |
| secondary | `bg-lb-stone-100 text-lb-ink` | `bg-lb-stone-200` |
| outline | `bg-lb-white text-lb-ink border border-lb-stone-300` | `bg-lb-stone-50` |
| ghost | `bg-transparent text-lb-ink` | `bg-lb-stone-100` |
| inverse | `bg-lb-white text-lb-ink` | `bg-lb-stone-100` |

| Size | Height | Padding-x | Font | Icon | Gap |
|---|---|---|---|---|---|
| sm | 36px `h-9` | 16px `px-4` | 14px | 16px | 6px |
| md | 48px `h-12` | 22px `px-[22px]` | 16px | 20px | 8px |
| lg | 56px `h-14` | 28px `px-7` | 18px | 22px | 10px |

States: **pressed** = `active:scale-[.97]`; **disabled** = `opacity-40 cursor-not-allowed` with no hover or press effect; **focus** = see the Accessibility section; **loading** = **TBD**.

```tsx
<button className="inline-flex items-center justify-center gap-2 h-12 px-[22px] rounded-pill
  bg-lb-ink text-lb-white font-sans font-semibold text-md tracking-[-0.005em] whitespace-nowrap
  transition duration-[120ms] ease-out hover:bg-lb-ink-2 active:scale-[.97]
  disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100">
  <Plus size={20} /> Add
</button>
```

### IconButton

An icon-only button for toolbars, share, overflow menus and adding socials.

| Prop | Values | Default |
|---|---|---|
| `variant` | `soft` `plain` `elevated` `solid` | `soft` |
| `size` | diameter in px | 44 |
| `iconSize` | px | `round(size × 0.45)` |
| `shape` | `circle` `rounded` (14px) | `circle` |
| `label` | **required** accessible name | – |

| Variant | Rest | Hover |
|---|---|---|
| soft | `bg-lb-stone-100` | `bg-lb-stone-200` |
| plain | transparent | `bg-lb-stone-200` |
| elevated | `bg-lb-white shadow-sm` | `bg-lb-stone-200` |
| solid | `bg-lb-ink text-lb-white` | `brightness-130` |

Disabled: `opacity-40`. Sizes seen in kits: 28 (inline add-social), 36, 40 (profile share), 44.

### Input

A filled text field. Use `prefix` for username and URL claims.

| Prop | Values |
|---|---|
| `label`, `placeholder`, `hint`, `error`, `prefix` | string |
| `size` | `md` (48px, 16px text) · `lg` (56px, 18px text) |

| State | Style |
|---|---|
| Rest | `bg-lb-stone-100 rounded-md px-4`, no border |
| Focus | `ring-2 ring-lb-ink` (inset-free 2px ring), 120ms |
| Error | `ring-2 ring-lb-danger`; message below in `text-xs text-lb-danger` |
| Hint | `text-xs text-lb-stone-600` below the field |
| Disabled | **TBD** |

Label: `text-sm font-medium text-lb-ink`, 6px above the field. The prefix is `text-lb-stone-600` and sits 2px from the value.

```tsx
<label className="flex flex-col gap-1.5">
  <span className="text-sm font-medium">Username</span>
  <span className="flex items-center h-14 px-4 rounded-md bg-lb-stone-100 focus-within:ring-2 focus-within:ring-lb-ink">
    <span className="text-lb-stone-600">linkbase.me/</span>
    <input className="flex-1 min-w-0 bg-transparent outline-none text-lg ml-0.5" />
  </span>
</label>
```

### Switch

An on/off toggle for link visibility and the footer branding.

| Spec | Value |
|---|---|
| Track | 44×26, `rounded-pill`; on = `bg-lb-tangerine`, off = `bg-lb-stone-300` |
| Knob | 20×20 white circle, `shadow-xs`, 3px inset; moves `left-[3px]` → `left-[21px]` |
| Motion | Track 200ms ease-out; knob 200ms ease-spring |
| Disabled | `opacity-40 cursor-not-allowed` |

Supports controlled (`checked` + `onChange`) and uncontrolled (`defaultChecked`) use.

### Tabs

Underline tabs for switching panels inside a card (Links / Shop).

| State | Style |
|---|---|
| Active | `text-lb-ink font-semibold` + 3px ink underline (`shadow-[inset_0_-3px_0_#16130F]`) |
| Inactive | `text-lb-stone-400 font-medium` |
| Hover | **TBD** (color transition only, 120ms) |

Text is 18px, padding `pt-1.5 pb-2.5`, with 24px between tabs.

### Avatar

A circular profile image with fallbacks.

| Case | Render |
|---|---|
| `src` | Image, `object-cover` |
| `name`, no `src` | Up to 2 initials, Bricolage 700 at `size × 0.38`, on a pastel tint chosen by `name.length % 5` from butter, sky, rose, pine-100 and tangerine-100 |
| Neither | `bg-lb-stone-300` with a white `user-round` icon at `size × 0.55` |
| `ring` | `0 0 0 3px white, 0 0 0 5px ink` |

Sizes in kits: 40, 48, 56 (default), 64 (editor), 80–96 (profile).

### Accordion

FAQ disclosure rows. Only one row is open at a time.

| Prop | Values |
|---|---|
| `items` | `{ q, a }[]` |
| `tone` | `light`: `bg-lb-white shadow-inset` · `dark`: `bg-white/8 text-lb-white` |
| `defaultOpen` | index, `-1` = none |

Rows: `rounded-lg`, 10px gap. Trigger: `px-6 py-5`, 16px semibold, with a chevron-down at 20px that rotates 180° when open (200ms). Panel: `px-6 pb-[22px]`, line-height 1.6, 82% opacity.

---

## Links

### LinkButton (public profile link)

A full-width link with a centered label that visitors tap. Theme it with the CSS variables `--link-bg` and `--link-fg` on any ancestor (the defaults are white and ink).

| Prop | Values | Default |
|---|---|---|
| `shape` | `rounded` (20px) · `pill` · `square` (6px) | `rounded` |
| `variant` | `fill` (bg + `shadow-xs`) · `outline` (transparent, 2px border in `--link-fg`) | `fill` |
| `thumb` | image URL. 44px (32px compact), `rounded-sm`, 8px from the left | – |
| `compact` | min-h 48px, `px-12`, 14px text, 32px thumb (used in the phone preview) | `false` |
| `onMore` | kebab (`ellipsis-vertical`, 18px), 14px from the right, 70% opacity | – |

Regular: `min-h-[60px] px-14 py-2`, 16px semibold, centered, line-height 1.25.

| State | Style |
|---|---|
| Hover | `-translate-y-px`, fill variant → `shadow-md` |
| Pressed | `scale-[.985]` |
| Focus | See Accessibility |

The kebab must not trigger navigation (`preventDefault` + `stopPropagation`).

### LinkCard (dashboard editor row)

| Part | Spec |
|---|---|
| Container | `rounded-xl bg-lb-white shadow-inset`, padding `14px 16px` (left 8px with drag handle), 14px gap |
| Drag handle | `grip-vertical` 18px, `text-lb-stone-400`, `cursor-grab` |
| Thumb | 44×44 `rounded-md bg-lb-stone-100`; image or Lucide icon (20px), defaulting to `link` |
| Title | 16px semibold, single line, ellipsis |
| Meta | `"{clicks} clicks · {domain}"`, 14px `text-lb-stone-600`, ellipsis |
| Trailing | Switch (if `enabled` is defined) + kebab |

| State | Style |
|---|---|
| Enabled | Full opacity |
| Hidden (`enabled=false`) | `opacity-55`, 200ms |
| Dragging, editing inline, error | **TBD** |

Drag-to-reorder behavior is **TBD**. Only the handle is specified.

### UrlPill

| Prop | Values | Default |
|---|---|---|
| `tone` | `soft` (`bg-lb-stone-100`) · `white` (`bg-white shadow-md`) · `dark` (`bg-lb-ink text-white`) | `soft` |
| `size` | `md` 48px / 16px · `sm` 40px / 14px | `md` |
| `leadingIcon` | Lucide icon or `null` | `link-2` |
| `trailing` | `share` `copy` `close` `none` | `share` |

Font 500, 10px gap, `rounded-pill`. Copy-to-clipboard feedback is **TBD**.

---

## Navigation

### NavRail

The vertical list of top-level dashboard sections.

| State | Circle (48px) | Label (12px) |
|---|---|---|
| Active | `bg-lb-ink text-white` + ring `0 0 0 3px bg-app, 0 0 0 5px ink` | `font-semibold text-lb-ink` |
| Inactive | `bg-lb-stone-100 text-lb-ink` | `font-medium text-lb-stone-600` |

18px between items and 6px between icon and label. Items in the kit: Content (`layers`), Header (`square-user`), Design (`paintbrush`), Settings (`settings`). Only Content has a designed screen. The **Header, Design and Settings screens are TBD**.

### AnnouncementBar

A full-width top strip with min-height 48px, `px-12 py-2`, 14px medium text, centered. The CTA pill is 30px tall with `px-3`, has an optional 14px icon, and is 600 weight. The dismiss `x` (16px) sits 14px from the right.

| Tone | Bar | CTA pill |
|---|---|---|
| ink (app upsell) | `bg-lb-ink text-white` | `bg-lb-tangerine text-lb-ink` |
| tangerine (marketing) | `bg-lb-tangerine text-lb-ink` | `bg-lb-ink text-white` |
| butter (marketing) | `bg-lb-butter text-lb-ink` | `bg-lb-ink text-white` |

Whether a dismissal persists is **TBD**.

---

## Marketing-only pieces (UI kit, not primitives)

| Piece | Spec |
|---|---|
| SiteNav | Sticky `top-4`, white pill, h-72px, `pl-7 pr-3`, `shadow-md`, max-w 1240px. Items: Product, Templates, Creators, Pricing, Learn (15px medium, stone-600). Right side: secondary "Log in", primary "Sign up free". Mobile nav is **TBD** |
| ClaimForm | White field, h-56px, `rounded-md`, "linkbase.me/" prefix, min-w 260 / max-w 340, plus an `lg` Button (primary on light backgrounds, accent on dark). Success state: inline text "linkbase.me/{name} is yours. Check your inbox." |
| Section block | Full-bleed color pair, `py-[120px] px-6`, max-w 1200, two columns with a 64px gap that wrap at 420px per column; alternate sections are mirrored |
| Stat tile | `rounded-xl p-6 min-h-[150px]`, 14px semibold label, 44px Bricolage 800 value |
| Footer | White card, `rounded-2xl`, `px-12 pt-12 pb-9`, 4 link columns with 18px bold headings, wordmark and © on a hairline-divided bottom row |
| Pro badge | h-24px pill, `bg-lb-butter`, 12px semibold, `zap` icon at 12px |

---

## Layout patterns

### Public profile (`/[username]`)

```
bg-lb-stone-300 page
└─ column: max-w-[580px], centered, pt-8, rounded-t-[40px], shadow-lg, overflow-hidden
   └─ bg-lb-stone-100, padding 28px (bottom 32px)
      ├─ top row: wordmark chip (h-40, white pill, shadow-sm) ··· share IconButton (40, elevated)
      ├─ Avatar 96 (mt-8)
      ├─ username: Bricolage 700 26px (mt-3.5)
      ├─ bio: 15px stone-600, centered (mt-1)
      ├─ social glyphs 22px, gap 14px
      ├─ LinkButton stack, gap 14px (mt-7)
      └─ footer: "Report · Privacy · Made with Linkbase", 12px stone-600 (mt-12)
   └─ sticky bottom CTA: gradient transparent → rgba(22,19,15,.88), pt-12 pb-6,
      white UrlPill "linkbase.me/you" (close) + "Join {username} on Linkbase"
```

Only enabled links render. Page themes beyond `--link-bg` / `--link-fg` and the shape and variant props are **TBD**.

### Dashboard (`/admin`)

```
bg-lb-ink
├─ AnnouncementBar (ink)
└─ sheet: bg-lb-stone-50, rounded-t-xl, px-7 pt-5 pb-10
   ├─ header grid [1fr auto 1fr]: back IconButton · UrlPill (soft) · "Enhance" secondary Button
   └─ body grid [80px | minmax(0,620px) | 1fr], gap 32px, mt-7
      ├─ NavRail (pt-[120px])
      ├─ Editor panel: white, rounded-2xl, shadow-md, p-9 pb-7, gap 22px
      │   H "Content" 32px + bulk/archive IconButtons → Tabs → avatar row (64 + socials + add)
      │   → [Add | New collection] 2-col grid → inline add form → LinkCard list (gap 12)
      │   → divider → "Linkbase footer" row (Pro badge + Switch)
      └─ Preview (sticky top-6): phone 300×620, rounded-[44px], p-2.5, ink, shadow-lg,
          compact ProfileView inside + vertical toolbar pill (customize, open page)
```

**Inline add form:** `bg-lb-stone-50 rounded-xl p-5`, with URL and Title inputs and a Cancel (ghost sm) / Add link (primary sm, disabled until a URL is entered) row. If the URL has no protocol, `https://` is prepended. New links go to the **top** of the list and are enabled by default.

Collections, Shop tab content and the "Enhance" action are **TBD**. Responsive behavior below about 1200px is **TBD**.

### Onboarding (`/register/username`)

A two-column grid (`grid-cols-2`, full viewport height).
- **Left:** wordmark at top-left (30px), padding `px-10 py-9`. The form column is max-w 440px, centered, mt-[72px], gap 20px, center-aligned text. It contains a 48px H1 "Welcome to Linkbase", an 18px stone-600 subline, an `lg` prefixed Input, a 13px consent caption, and an `lg` full-width Button. The button uses the `outline` variant and is disabled while the username is invalid; once valid it switches to `primary`.
- **Right:** a `bg-lb-butter` illustration panel with a tilted pine sample profile and a white UrlPill. Real illustration or photography is **TBD**.

Username rule: `^[a-z0-9_.]{3,30}$`. Input is lowercased as the user types. The error copy is "3–30 characters: lowercase letters, numbers, _ and ." The availability check is **TBD**.

### Marketing home (`/`)

Order: butter AnnouncementBar → tangerine hero (SiteNav + 88px H1 + ClaimForm + sample profile) → pine/butter "Build" → sky/plum "Share" → stone-100 "Analytics" (stat grid) → plum FAQ (dark Accordion, max-w 820) → tangerine closing claim + footer card. Photography slots are placeholders (**TBD**).

---

## Accessibility

| Area | Requirement |
|---|---|
| Focus | Every interactive element needs a visible `focus-visible` style. Inputs use a 2px ink ring. Other controls use `ring-[3px] ring-lb-tangerine/35`. Components don't currently set focus styles, so engineering needs to add them |
| IconButton | `label` is required and maps to `aria-label` and `title` |
| Switch | `<button role="switch" aria-checked>` with an `aria-label` (e.g. "Show link: Portfolio"). Space and Enter toggle it |
| Tabs | `role="tablist"` / `role="tab"` with `aria-selected`. Arrow-key navigation and `tabpanel` wiring are **TBD**, so implement the WAI-ARIA tabs pattern |
| Accordion | Trigger needs `aria-expanded` and `aria-controls`; panel needs `role="region"`. These are not yet in the component |
| NavRail | Wrap in `<nav aria-label="Dashboard">` and mark the active item with `aria-current="page"` |
| LinkButton | Rendered as a real `<a>`. The kebab must be a separate `<button aria-label="More options">`, not a nested span. External links: `target`/`rel` policy is **TBD** |
| LinkCard | Drag handle needs a keyboard alternative (move up/down) |
| Input | `<label>` wraps the field. Link errors with `aria-invalid` + `aria-describedby` |
| Avatar | `alt={name}`; decorative uses `alt=""` |
| Icons | Decorative icons get `aria-hidden="true"` |
| AnnouncementBar | Dismiss button `aria-label="Dismiss"` |
| Disabled | Use the native `disabled` attribute; disabled controls render at 40% opacity |
| Hit targets | Min 44×44 on touch. The kebab (about 30px), the 28px add-social button and the Accordion are below this on mobile; enlarge the hit areas |
| Contrast | Ink on white, stone-100, tangerine, butter and sky passes AA. Pine/butter and plum/rose pass for headings. **Verify:** stone-600 on stone-100 for small text, stone-400 muted text (fails AA for body, so use it only for non-essential text), white text on tangerine (don't use; accent buttons use ink text) |
| Motion | Respect `prefers-reduced-motion` (handling **TBD**; see design-system.md) |
| Language/RTL | **TBD** |
