# myofficehrm-theme

Design-system prototype and reference for the myOfficeHRM product UI.
The normative requirements live in `myofficehrm/docs/spec/17-Design-System-and-Theming.md`;
this repo is the working proof. Not a package — other repos consume these
artifacts by copying once the monorepo layout lands.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Radix UI · Inter (`@fontsource-variable/inter`)

## The three layers

```
src/lib/colourmap.json  the single source — named schemes × {lt,dk} × steps
        │  read by ┌─────────────────────────────┐
        │          │ src/lib/colours.ts (typed)  │ → applyScheme(), currentScheme()
        │          │ scheme-css Vite plugin      │ → virtual:schemes.css
        ▼          └─────────────────────────────┘
src/index.css        role aliases + neutrals/statuses/shape; @theme inline
                     maps everything to Tailwind utilities
        ▼
src/components/ui/   primitives use role utilities only (bg-accent,
                     text-muted-foreground, ring-ring, ...) — never raw hex
```

## Tokens

Semantic roles, not colour names. A themed app reads `--accent`,
`--card`, `--popover-foreground`, `--input`, `--ring`,
`--surface-elevated`, `--success`, ... — never a hex.

Accent scale steps and their roles:

| Step | Role                                   |
| ---- | -------------------------------------- |
| 10   | tint fills (selected, active nav)      |
| 30   | mid tints / accent borders             |
| 50   | base accent (links, buttons, ring)     |
| 70   | hover / pressed                        |
| 90   | darkest anchor (`--primary`, CTAs)     |

`.dark` inverts the scale — the step number keeps its role.

## Schemes

`colourMap` — `default` is the brand scheme (baked into `:root`/`.dark`);
14 catalog options: `teal`, `cyan`, `steel`, `blue`, `indigo`, `violet`,
`magenta`, `plum`, `pink`, `crimson`, `red`, `ember`, `olive`, `graphite`
(monochrome). Names are plain standard colour words (spec 17 §3) — no
brand prefixes, no invented compounds.

- `applyScheme("teal")` → `<html data-scheme="teal">`, persists to localStorage
- `resetScheme()` → removes the attribute, restores `default`
- `initScheme()` → restores persisted choice (called in `main.tsx`;
  `index.html` runs an inline equivalent pre-paint)
- A scheme = accent scale **+ neutral ramp** tinted to its hue family —
  background, surfaces, borders, text re-tint on selection. Ramps share one
  lightness ladder, so contrast carries over; statuses stay global.

Adding a scheme: add its lt/dk accent steps **and** lt/dk `neutrals` ramp to
`src/lib/colourmap.json`, plus the scheme name to the `Schemes` type in
`src/lib/colours.ts` — the CSS is generated (`virtual:schemes.css` via the
`scheme-css` plugin in `vite.config.ts`), never write `[data-scheme]` blocks
by hand. Neutrals must keep the reference lightness ladder (spec 17 §3).

## Dark mode

`.dark` on `<html>`; `index.html` resolves persisted/system preference
pre-paint; `useDarkMode()` persists the choice.

## Primitives

`src/components/ui/`: button, badge, card, input, textarea, label, field,
select, checkbox, switch, radio-group, tabs, tooltip, popover, dialog,
dropdown-menu, table, avatar, skeleton, separator, sonner (toast).

Rules when adding components:

- role utilities only (`bg-popover`, `border-input`, ...); no hex, no
  opacity modifiers on token colours (`bg-accent/10` → `bg-accent-10`)
- checked/interactive states use the accent scale (`bg-accent` +
  `text-accent-foreground`, hover on `accent-70`)
- `-foreground` pairing required for every filled colour (spec 17 §8, AA)

## Routes

- `/` — landing pages (marketing-style reference)
- `/demo` — dashboard mock (surface patterns)
- `/ui` — component showcase / living styleguide

## Commands

```bash
pnpm dev       # dev server
pnpm build     # typecheck + production build
pnpm preview   # serve dist/
```
