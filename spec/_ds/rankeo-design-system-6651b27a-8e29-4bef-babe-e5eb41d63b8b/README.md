# Rankeo Design System — Conventions for the Design Agent

## Wrapping and setup

No provider or root wrapper is required. CSS design tokens are injected at `:root` via `styles.css` (which `@import`s `_ds_bundle.css`). Components render with brand styling out of the box — just import and use.

## Styling idiom

This is a **Tailwind CSS v4** design system. Style with Tailwind utility classes and CSS custom properties. Do not invent class names.

**Semantic CSS tokens** — reference these via `var(--name)` in inline styles or use the Tailwind mappings below:

| Token | Purpose |
|---|---|
| `--background` | page/surface background |
| `--foreground` | primary text |
| `--card` | card surface |
| `--card-foreground` | text on cards |
| `--primary` | primary action color |
| `--primary-foreground` | text on primary |
| `--secondary` | secondary surface |
| `--secondary-foreground` | text on secondary |
| `--muted` | muted surface |
| `--muted-foreground` | muted/secondary text |
| `--border` | default border color |
| `--radius` | base border-radius (0.625rem) |

**Tailwind classes** — use the standard scale: `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `rounded-md`, `p-4`, `gap-4`, `text-sm`, `font-semibold`, etc.

## Component API highlights

**Button** — `variant`: `default` | `secondary` | `outline` | `ghost` | `destructive` | `link`. `size`: `xs` | `sm` | `default` | `lg`.
**No `asChild` prop** — this DS uses `@base-ui/react`, not Radix UI. To wrap a Button in a link, nest: `<a href="..."><Button>...</Button></a>`.

**Badge** — same variants as Button: `default` | `secondary` | `destructive` | `outline` | `ghost` | `link`.

**Card compound** — always compose as:
```jsx
<Card>
  <CardHeader>
    <CardTitle>…</CardTitle>
    <CardDescription>…</CardDescription>
    <CardAction>{/* optional badge/button */}</CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```
`Card` accepts `size="sm"` for compact cards.

**Dialog** — needs `open` prop for static renders. Compose with `DialogContent > DialogHeader > DialogTitle + DialogDescription`, then `DialogFooter` for actions.

**Brackets** — `BracketRenderer` wraps all bracket types; `SingleEliminationBracket`, `GroupStageView`, `RoundRobinTable` are available individually. These are data-driven — provide the matches/rounds data from the `.d.ts`.

## Where the truth lives

- Read `styles.css` and `_ds_bundle.css` for the complete token and utility set.
- Each component's `.prompt.md` has its full usage reference.
- The bundle exposes everything at `window.RankeoDS.*`.

## Idiomatic example

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from 'tournament-platform'

export function TournamentCard() {
  return (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Card>
        <CardHeader>
          <CardTitle>Torneo de Pádel</CardTitle>
          <CardDescription>Inscripciones abiertas hasta el 30 de junio</CardDescription>
          <CardAction>
            <Badge variant="secondary">Abierto</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>
            Club Deportivo Puebla · 32 participantes
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Ver detalles</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
```

# RankeoDS (tournament-platform@0.1.0)

This design system is the published tournament-platform React library, bundled as a single
browser global. All 113 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.RankeoDS`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.RankeoDS.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { AdminHint } = window.RankeoDS;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<AdminHint />);
```

## Tokens

249 CSS custom properties from tournament-platform. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (83): `--color-red-100`, `--color-red-300`, `--color-red-400`, …
- **spacing** (5): `--tw-space-y-reverse`, `--tw-ring-inset`, `--tw-inset-shadow`, …
- **typography** (18): `--font-sans`, `--font-weight-normal`, `--font-weight-medium`, …
- **radius** (2): `--radius-md`, `--radius`
- **shadow** (7): `--tw-shadow`, `--tw-ring-shadow`, `--tw-drop-shadow-size`, …
- **other** (134): `--spacing`, `--container-xs`, `--container-sm`, …

## Components

### admin
- `AdminHint`

### layout
- `AdminShell`
- `AdminSidebar`
- `BottomBar`
- `PublicShell`
- `SuperadminSidebar`

### general
- `BackIcon`
- `Badge`
- `Button`
- `Card`
- `CardAction`
- `CardContent`
- `CardDescription`
- `CardFooter`
- `CardHeader`
- `CardTitle`
- `CheckIcon`
- `ChevronDownIcon`
- `CloseIcon`
- `Dialog`
- `DialogClose`
- `DialogContent`
- `DialogDescription`
- `DialogFooter`
- `DialogHeader`
- `DialogOverlay`
- `DialogPortal`
- `DialogTitle`
- `DialogTrigger`
- `DropdownMenu`
- `DropdownMenuCheckboxItem`
- `DropdownMenuContent`
- `DropdownMenuGroup`
- `DropdownMenuItem`
- `DropdownMenuLabel`
- `DropdownMenuPortal`
- `DropdownMenuRadioGroup`
- `DropdownMenuRadioItem`
- `DropdownMenuSeparator`
- `DropdownMenuShortcut`
- `DropdownMenuSub`
- `DropdownMenuSubContent`
- `DropdownMenuSubTrigger`
- `DropdownMenuTrigger`
- `EventGlobalSearch`
- `FixedBar`
- `HomeIcon`
- `IconButton`
- `IconLink`
- `Input`
- `LeaguePenaltyControl`
- `MenuIcon`
- `PinIcon`
- `PlayerAvatar`
- `PlayerGlobalSearch`
- `SearchIcon`
- `Separator`
- `ShareIcon`
- `StickyBar`
- `SwRegister`
- `Table`
- `TableBody`
- `TableCaption`
- `TableCell`
- `TableFooter`
- `TableHead`
- `TableHeader`
- `TableRow`
- `Tabs`
- `TabsContent`
- `TabsList`
- `TabsTrigger`
- `Toaster`
- `WelcomeBanner`
- `Wordmark`

### shared
- `BannerUploader`
- `LeagueBannerClient`

### brackets
- `BracketRenderer`
- `GroupStageView`
- `RoundRobinTable`
- `SingleEliminationBracket`

### header
- `DetailHeader`
- `NavMenu`
- `PublicHeaderSlot`
- `SiteHeader`

### liga
- `ExportRankingButton`
- `ExportScheduleButton`
- `PairPenaltyControl`
- `RankingExportCard`
- `ScheduleExportCard`

### rk
- `Eyebrow`
- `FlierHero`
- `InscriptionCard`
- `MetaItem`
- `RankRow`
- `RkCard`
- `RkChip`
- `RkProgress`
- `RkTabBar`
- `Segmented`

### tournaments
- `GlassTorneoCard`
- `TournamentCard`

### matches
- `MatchDetailCard`
- `ScoreInput`

### registrations
- `PairRegistrationForm`
- `RegistrationButton`
- `RegistrationForm`
- `RegistrationModal`
- `RegistrationsTable`
- `TournamentPairRegistrationForm`
- `TournamentRegistrationForm`

### registration
- `RegistrationInfo`

### schedule
- `ScheduleBoard`
