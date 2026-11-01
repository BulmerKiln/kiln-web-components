# @bulmerkiln/design

The component library and design tokens of [Bulmer Kiln](https://bulmerkiln.com), the open-source,
security-first artifact registry. Every Kiln web app is built with it.

## At a glance

| | |
|---|---|
| Package | `@bulmerkiln/design` |
| Entry points | `@bulmerkiln/design` (components), `@bulmerkiln/design/icons` (UI icons), `@bulmerkiln/design/theme.css` (tokens, variants and fonts) |
| Fonts | Geist (`font-sans`) and Fira Code (`font-mono`), variable, SIL Open Font License 1.1 |
| Peers | React 19, Tailwind CSS 4 |
| Runtime dependencies | `@headlessui/react` (MIT): focus, keyboard and ARIA for the interactive widgets; `@floating-ui/react` (MIT, which Headless UI uses too): Tooltip's positioning and portal |
| Developed in | Storybook (`yarn dev`) |
| Requirement IDs | `DSN-` |

## Purpose

One set of accessible React components and one palette for every Kiln web app, so each screen
looks the same, works by keyboard and meets WCAG 2.2 AA in light and dark themes without each
app rebuilding it.

## Responsibilities

**Does**

- Define the palette (`brand`, `accent`, `ash`, `brick`, `celadon`), the fonts, and the `dark`, `reduce-motion` and
  `more-contrast` variants in `theme.css`.
- Draw the Kiln mark: `Logo` (mark and wordmark), `Icon` and `IconTile` (the app icon).
- Draw the UI icons on one 20 px grid with 1.5 px rounded strokes.
- Provide presentational components: markup, styling, keyboard behavior and ARIA.
- Document each component in Storybook, and test it there with `play` functions and axe-core.

**Does not**

- Fetch data, call the Kiln API or know about organizations, repositories or users. Screens and
  API hooks belong in `@bulmerkiln/ui`.
- Route, hold app state or store anything in the browser.
- Render untrusted HTML.

## Requirements

| ID | Requirement | Verified by |
|---|---|---|
| DSN-1 | Every story must pass axe-core's WCAG 2.0, 2.1 and 2.2 A and AA rules; a violation must fail the test run | `.storybook/preview.tsx` (`a11y.test: "error"`), every `*.stories.tsx` |
| DSN-2 | Every component must meet AA contrast in the dark theme as well as the light, with a story axe checks in dark | `Button.stories.tsx` (`Dark`) |
| DSN-3 | The published package must import only packages its `package.json` declares; an undeclared import must fail the build | `scripts/postbuild-package.mjs` |
| DSN-4 | `theme.css` must ship as source, so the consuming app's Tailwind build compiles it with the app's own classes | `scripts/postbuild-copy-theme.mjs` |
| DSN-5 | Every interactive component must be reachable and operable by keyboard, with a visible focus outline of at least 3:1 | `Button.stories.tsx` (`Keyboard`) |
| DSN-6 | A disabled `Button` must leave the tab order and must not call `onClick` | `Button.stories.tsx` (`Disabled`) |
| DSN-7 | The mark must follow the theme: a `brand-700` kiln with a white flame in light and a `brand-300` kiln with an `accent-200` flame in dark; the app icon a `brand-700` tile in light and a `brand-300` tile in dark | `Icon.stories.tsx` (`Color`, `Dark`), `IconTile.stories.tsx` (`Light`, `Dark`) |
| DSN-8 | A mark without a label must be hidden from assistive technology, and one with a label exposed as an image of that name; the `Logo` is named by its visible wordmark | `Icon.stories.tsx` (`Labelled`, `Decorative`), `Logo.stories.tsx` (`Horizontal`) |
| DSN-9 | Storybook's canvas must follow the theme toolbar: white in light, `ash-950` in dark, and the operating system's preference for System | `Logo.stories.tsx` (`Horizontal`, `Dark`) |
| DSN-10 | Every clickable element must show the pointer cursor, native or by ARIA role (`button`, `tab`, `option`, `menuitem`, …), and a disabled one `not-allowed`; `theme.css` sets both, since Tailwind's preflight resets buttons to the default cursor | `Button.stories.tsx` (`Click`, `Disabled`) |
| DSN-11 | UI icons must be hidden from assistive technology unless given a label | `Icons.stories.tsx` (`All`) |
| DSN-12 | An `IconButton` must be named by its required `label` and work by Tab, Enter and Space; a `Button` with `href` must render a link | `IconButton.stories.tsx` (`Keyboard`), `Button.stories.tsx` (`AsLink`) |
| DSN-13 | A field's label must name its control and its help text describe it; an error must mark the control invalid, describe it and be announced | `FormField.stories.tsx` (`Default`), `TextInput.stories.tsx` (`Error`) |
| DSN-14 | A `Select` must open with Space or Arrow Down, move with the arrows and choose with Enter, and its open list must meet contrast in dark | `Select.stories.tsx` (`Keyboard`, `Dark`) |
| DSN-15 | A `Combobox` must filter its options by what's typed and say when nothing matches | `Combobox.stories.tsx` (`Keyboard`, `Dark`) |
| DSN-16 | A `Checkbox`, `RadioGroup` and `Switch` must be operable by keyboard (Space, arrows in a group) and expose their state | `Checkbox.stories.tsx`, `RadioGroup.stories.tsx`, `Switch.stories.tsx` (`Keyboard`) |
| DSN-17 | An announced `Alert` must use `role="alert"` for danger and warning, and a dismissible one must have a named close button | `Alert.stories.tsx` (`Dismissible`) |
| DSN-18 | A toast must be announced (status, or alert for danger), pause while hovered or focused, and be dismissible; a `Spinner` must be announced by its label | `Toast.stories.tsx` (`ShowAndDismiss`), `Spinner.stories.tsx` (`Default`) |
| DSN-19 | A `Dialog` or `Drawer` must be named by its title and described, take focus while open, close on Escape and return focus to its trigger | `Dialog.stories.tsx`, `Drawer.stories.tsx` (`Keyboard`) |
| DSN-20 | A `Menu` must open from the keyboard on its first item, move with the arrows, act on Enter, close, and return focus to its trigger | `Menu.stories.tsx` (`Keyboard`) |
| DSN-21 | A `Tooltip` must show on keyboard focus, describe its trigger while shown, hide on Escape, and render in a portal so no clipping container cuts it off | `Tooltip.stories.tsx` (`Keyboard`, `InsideClippedContainer`) |
| DSN-22 | `Tabs` must be reachable on the selected tab, change with the arrow keys and show the matching panel | `Tabs.stories.tsx` (`Keyboard`) |
| DSN-23 | A `SpinnerOverlay` must be announced by its label, animate the mark's flame and ember, and keep them still under reduced motion | `SpinnerOverlay.stories.tsx` (`Default`, `ReducedMotion`) |
| DSN-24 | A `ProgressBar` must expose `role="progressbar"` named by its label with its value, or no value while indeterminate; the indeterminate sweep must stop under reduced motion | `ProgressBar.stories.tsx` (`Progress`, `Indeterminate`, `IndeterminateReduced`) |
| DSN-25 | A `meter` variant must expose `role="meter"` with its value text, and fill warning and then danger at its thresholds | `ProgressBar.stories.tsx` (`Meter`) |
| DSN-26 | A `segmented` variant must give every part's count and share in text: a legend in a named group, or one image named with every part when the legend is hidden | `ProgressBar.stories.tsx` (`Segmented`, `SegmentedCompact`) |
| DSN-27 | A `Link` in running text must be underlined, not told apart by color alone; an external one must open a new tab with `noopener noreferrer` and say so to screen readers | `Link.stories.tsx` (`Inline`, `External`) |
| DSN-28 | A `Breadcrumb` must be a named navigation landmark holding an ordered list, with the current page marked `aria-current="page"` and not a link | `Breadcrumb.stories.tsx` (`Default`) |
| DSN-29 | A `Badge` must carry its meaning in text; its icon must be decorative | `Badge.stories.tsx` (`Default`) |
| DSN-30 | `Kbd` must nest one `<kbd>` per key in an outer `<kbd>`, show the platform's modifier (⌘ or Ctrl), and give symbols a spoken name | `Kbd.stories.tsx` (`Default`) |
| DSN-31 | A `PageHeader` title must be the page's only `<h1>`; a `Card` rendered as a section must be a region named by its title at the requested heading level; a `Divider` must be a separator with its orientation | `PageHeader.stories.tsx` (`Default`), `Card.stories.tsx` (`Default`), `Divider.stories.tsx` |
| DSN-32 | A `Skeleton` must be hidden from assistive technology and stop pulsing under reduced motion | `Skeleton.stories.tsx` (`Text`, `ReducedMotion`) |
| DSN-33 | `Link`, `Button`, `IconButton` and link `MenuItem`s must render the component given in `as`, and `Breadcrumb` its `linkAs`, passing `href` and the rest through with the library's styles, so an app's router link works | `Link.stories.tsx`, `Button.stories.tsx`, `IconButton.stories.tsx` (`AsRouterLink`), `Breadcrumb.stories.tsx` (`WithRouterLinks`), `Menu.stories.tsx` (`RouterLinkItem`) |
| DSN-34 | A `Table` must be named by its caption, shown above (not inside) a focusable sideways-scrolling region of the same name, and mark a sorted column's header with `aria-sort`; a sortable header must be a button | `Table.stories.tsx` (`Default`, `Sorting`) |
| DSN-35 | `Pagination` must be a named landmark showing the first, last and current pages with the current one's neighbors, mark the current page `aria-current="page"`, disable Previous and Next at the ends, and render links through `linkAs` when given `getHref` | `Pagination.stories.tsx` (`Default`, `Keyboard`, `Links`) |
| DSN-36 | A `DescriptionList` must be a `<dl>` pairing each term with its details | `DescriptionList.stories.tsx` (`Default`) |
| DSN-37 | A `StatCard` must pair its label (term) with its figure (value), and say a change's direction in words, not only by arrow and color | `StatCard.stories.tsx` (`Default`) |
| DSN-38 | An `Avatar` must be named by the person or organization, fall back to initials when there's no image or it fails, and be hidden when `decorative` | `Avatar.stories.tsx` (`Initials`, `BrokenImage`, `Decorative`) |
| DSN-39 | A `SideNav` must be a named landmark whose current item is marked `aria-current="page"` (and visibly, beyond color), whose group headings name their lists, and whose items render the app's router link through `as` | `SideNav.stories.tsx` (`Default`, `WithRouterLinks`) |
| DSN-40 | A `SegmentedControl` must be a named radio group: Tab enters on the chosen option, the arrows change it, and the chosen option's edge clears 3:1 against the track | `SegmentedControl.stories.tsx` (`Default`) |
| DSN-41 | A `Disclosure` button must expose `aria-expanded`, toggle with Enter and Space, and sit in a heading when given a level | `Disclosure.stories.tsx` (`Default`, `Accordion`) |
| DSN-42 | A `Popover` must open from its button, move focus into its content, and close on Escape with focus back on the button | `Popover.stories.tsx` (`Keyboard`) |
| DSN-43 | `ThemeToggle` must be a radio group named "Color scheme"; light and dark must set `data-theme` on `<html>` and be remembered, and system must clear both | `ThemeToggle.stories.tsx` (`Default`) |
| DSN-44 | A `Tabs` list must scroll only sideways, and only when its tabs don't fit | `Tabs.stories.tsx` (`Fits`, `Narrow`) |

## Configuration

The app sets these attributes on `<html>`. Without them, the operating system's preference
applies. `ThemeProvider` manages `data-theme` for you: wrap the app in it and put a `ThemeToggle`
in the header; it remembers the choice in `localStorage` (`storageKey`, default `kiln-theme`) and
clears the attribute for "system", so the operating system decides.

| Attribute | Values | Effect |
|---|---|---|
| `data-theme` | `light`, `dark` | Overrides `prefers-color-scheme` |
| `data-contrast` | `more` | Turns on `more-contrast:` styles, as `prefers-contrast: more` does |
| `data-motion` | `reduce` | Stops transitions and animations, as `prefers-reduced-motion` does |
| `data-text-size` | `large`, `larger` | Scales the root font size to 112.5% or 125% |
| `data-text-spacing` | `wide` | Applies WCAG 1.4.12 text spacing |

## Usage

Import the theme in place of Tailwind; it imports Tailwind itself:

```css
@import "@bulmerkiln/design/theme.css";
```

```tsx
import { Button, Logo } from "@bulmerkiln/design";

<Logo layout="horizontal" size="sm" />;

<Button variant="primary" onClick={save}>
  Save changes
</Button>;
```

Anything that renders a link takes `as` (`Breadcrumb` takes `linkAs`), so a framework's router
link renders with these styles. It receives `href`, `className`, `ref` and the rest:

```tsx
import NextLink from "next/link";

<Button as={NextLink} href="/acme/api/settings">Settings</Button>;
<Link as={NextLink} href="/acme/tokens">access tokens</Link>;
<Breadcrumb linkAs={NextLink} items={items} />;
```

React Router's `Link` takes `to`, not `href`; adapt it once:

```tsx
import { Link as RouterLink, type LinkProps } from "react-router";

export const AppLink = ({ href, ...props }: Omit<LinkProps, "to"> & { href: string }) => (
  <RouterLink to={href} {...props} />
);
```

`className` positions a component (width, margins, grid placement). It isn't for color or
shape: use a variant for those, so the contrast stays verified. `Icon` and `IconTile` are
sized like icons, with a `size-*` class.

The page sets `<html lang="en-US">`; copy is US English.

## Security

- **Untrusted input**: components render text as React children, which React escapes. ESLint
  refuses `dangerouslySetInnerHTML`.
- **Supply chain**: one runtime dependency, Headless UI, kept external so the app owns one copy.
  Everything resolves through `yarn.lock`,
  a release must be seven days old before Yarn installs it (`npmMinimalAgeGate`), and no
  dependency's install scripts run (`enableScripts: false`). The build fails if the output imports
  a package that isn't declared (DSN-3).
- **Publishing**: published to npmjs.org with npm provenance.

## Testing

```bash
yarn lint     # ESLint
yarn test     # every story in headless Chromium: play functions and axe-core
yarn build    # type check, library build, packaging checks
```

`yarn test` needs Playwright's Chromium (`yarn playwright install chromium`).

## Standards and references

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), level AA
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Tailwind CSS v4](https://tailwindcss.com/docs), [Storybook](https://storybook.js.org/docs)

## Status

Implemented: DSN-1 to DSN-44. Foundations: the palette, fonts, variants and UI icons. Brand:
`Logo`, `Icon`, `IconTile`. Layout: `PageHeader`, `Card`, `Divider`, `Disclosure`. Navigation: `Link`,
`Breadcrumb`, `Pagination`, `Tabs`, `SideNav` (with `SideNavGroup`, `SideNavItem`). Controls: `Button`, `IconButton`, `FormField`, `TextInput`, `Textarea`,
`Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `SegmentedControl`, `ThemeToggle` (with
`ThemeProvider` and `useTheme`). Feedback: `Alert`, `Banner`, `Toast`
(with `ToastProvider` and `useToast`), `Spinner`, `SpinnerOverlay`, `ProgressBar`, `Skeleton`,
`EmptyState`, `ErrorState`. Overlays: `Dialog`, `Drawer`, `Menu`, `Popover`, `Tooltip`. Data display:
`Table` (with `TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell`), `DescriptionList`,
`StatCard`, `Avatar`, `Badge`, `Kbd`.

Planned: `Meter`-style usage displays build on `ProgressBar`; other primitives as screens need
them. Composites (the app shell, code blocks, data
tables) belong in `@bulmerkiln/ui`.
