# myofficehrm-theme

Design-system prototype and reference for the myOfficeHRM product UI.
The normative requirements live in `myofficehrm/docs/spec/17-Design-System-and-Theming.md`;
this repo is the working proof. Not a package — other repos consume these
artifacts by copying once the monorepo layout lands.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Radix UI · Inter (`@fontsource-variable/inter`)

## The three layers

```
src/lib/colours.ts   colourMap — named schemes × {lt,dk} × {10,30,50,70,90}
        │  applyScheme() writes data-scheme="..." on <html>
        ▼
src/index.css        :root / .dark define tokens; [data-scheme] blocks per
                     scheme; @theme inline maps everything to Tailwind utilities
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

`colourMap = { default, teal, violet, blue }` — `default` is the brand
scheme (baked into `:root`/`.dark`); the rest are catalog options.

- `applyScheme("teal")` → `<html data-scheme="teal">`, persists to localStorage
- `resetScheme()` → removes the attribute, restores `default`
- `initScheme()` → restores persisted choice (called in `main.tsx`;
  `index.html` runs an inline equivalent pre-paint)
- Schemes swap the accent scale only; neutrals stay shared

Adding a scheme: `colourMap` entry + `[data-scheme="x"]` and
`[data-scheme="x"].dark` blocks in `index.css` (values duplicated there by
hand until generated from one source — spec 17 §7).

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
