# @bulmerkiln/ui

The shared screens and composites of the [Bulmer Kiln](https://bulmerkiln.com) web apps, built on
`@bulmerkiln/design`. Both editions' web apps compose them.

## At a glance

| | |
|---|---|
| Package | `@bulmerkiln/ui` |
| Entry points | `@bulmerkiln/ui` (components), `@bulmerkiln/ui/styles.css` (points Tailwind at them) |
| Depends on | `@bulmerkiln/design` (same release); `@headlessui/react` (MIT): the command palette's dialog and combobox, the editor's style menu; `lexical` and `@lexical/*` (MIT): the rich text editor and Markdown parsing; `shiki` (MIT): code coloring |
| Peers | React 19, Tailwind CSS 4 |
| Developed in | Storybook (`yarn dev:ui`) and the demo app (`yarn demo`) |
| Requirement IDs | `UI-` |

## Purpose

The pieces a Kiln web app builds again and again from the design library's primitives: the app
shell, copying values, code blocks, the command palette, rich text and comment threads, and later
data tables and severity displays. Writing them once keeps every screen, and both editions, the
same.

## Responsibilities

**Does**

- Compose `@bulmerkiln/design` primitives into larger parts: `AppShell`, `CopyButton`, `CodeBlock`,
  `CommandPalette`, `RichTextEditor`, `RichTextContent`, `Comment`, `CommentComposer`,
  `CommentThread`.
- Read and write rich text as Markdown (CommonMark headings, quotes, lists, fenced code, emphasis,
  inline code and links, plus GFM strikethrough and task lists and GitHub's callouts), and show it
  as React elements.
- Know Kiln's concepts where a part needs them (digests, severities, repositories), still without
  fetching data: the app passes it in.
- Document each part in Storybook and test it with `play` functions and axe-core.

**Does not**

- Define colors, type or primitives: those belong in `@bulmerkiln/design`.
- Fetch data, route, or hold app state.

## Requirements

| ID | Requirement | Verified by |
|---|---|---|
| UI-1 | `AppShell` must start with a skip link to `<main>`, then the header and navigation; on narrow screens the navigation must be a drawer behind a named menu button that closes when a link in it is followed | `AppShell.stories.tsx` (`Default`, `Narrow`) |
| UI-2 | `CopyButton` must be named by its label, copy its value, and announce "Copied", or that copying failed and what to do instead | `CopyButton.stories.tsx` (`Default`, `Refused`) |
| UI-3 | A `CodeBlock` must be a region named by its title that takes focus to scroll by keyboard, color its code once the grammar loads, copy the code exactly, and keep line numbers out of the accessible text and the selection | `CodeBlock.stories.tsx` (`Default`, `Manifest`, `Keyboard`) |
| UI-4 | `CommandPalette` must open on ⌘K / Ctrl+K with focus in its search, filter by every word typed, move with the arrows and choose with Enter, announce the result count or that nothing matches, and close on Escape | `CommandPalette.stories.tsx` (`Keyboard`, `NoMatches`) |
| UI-5 | `RichTextContent` must render Markdown as elements, never HTML, so markup in the text shows as text; keep only http, https and mailto links, opening them in a new tab with `rel="noopener noreferrer nofollow ugc"` and saying so; and start headings at `h3` | `RichTextContent.stories.tsx` (`Default`, `Hostile`) |
| UI-6 | `RichTextEditor` must read and write Markdown, format from its toolbar and from Markdown typed as you go, load a controlled value without losing newer typing, and call `onSubmitShortcut` on ⌘Enter / Ctrl+Enter | `RichTextEditor.stories.tsx` (`Formatting`, `MarkdownShortcuts`, `WithValue`, `SubmitShortcut`) |
| UI-7 | The editor's toolbar must be a named toolbar with one tab stop, moved through with the arrows, Home and End; toggles expose `aria-pressed`, and the style menu's name holds the current style | `RichTextEditor.stories.tsx` (`Keyboard`, `Formatting`) |
| UI-8 | The editor must accept only http, https and mailto links, turn other links in a loaded value into text, and keep only what Markdown holds from a paste: no scripts, images, inline styles, underline or unsafe links | `RichTextEditor.stories.tsx` (`Links`, `HostileValue`, `HostilePaste`) |
| UI-9 | An editor error, or text past `maxLength`, must mark the field invalid, describe it and be announced, saying how to fix it | `RichTextEditor.stories.tsx` (`Error`, `TooLong`) |
| UI-10 | `CommentComposer` must submit Markdown, wait on the app's promise and then clear; on failure keep the text and say so; and refuse an empty comment with a reason | `CommentComposer.stories.tsx` (`Submit`, `Rejected`, `Empty`) |
| UI-11 | A `Comment` must be an article named by its author and time, give the exact time in `datetime`, and edit in place from its actions menu, with focus in the text | `Comment.stories.tsx` (`Default`, `Edit`) |
| UI-12 | `CommentThread` must be a named list with each comment's replies in a named list below it, fold long replies behind a toggle that keeps focus, open a focused reply composer, and offer Edit and Delete only where allowed | `CommentThread.stories.tsx` (`Default`, `Reply`, `Permissions`) |
| UI-13 | With `preview`, the editor must offer Write and Preview tabs, changed with the arrow keys; Preview must show the Markdown as `RichTextContent` does, and Write must come back with the text and undo history | `RichTextEditor.stories.tsx` (`Preview`, `PreviewKeyboard`) |
| UI-14 | Rich text must read and write GFM task lists (`- [ ]`, `- [x]`) and GitHub's callouts (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`); the editor must offer both and tick an item from its box, and `RichTextContent` must say an item's state in words and show each callout as a note named by its kind | `RichTextEditor.stories.tsx` (`TaskList`, `Callouts`), `RichTextContent.stories.tsx` (`TaskListsAndCallouts`) |

## Usage

```css
@import "@bulmerkiln/design/theme.css";
@import "@bulmerkiln/ui/styles.css";
```

```tsx
import { ThemeProvider, ToastProvider } from "@bulmerkiln/design";
import { AppShell } from "@bulmerkiln/ui";

<ThemeProvider>
  <ToastProvider>
    <AppShell brand={<Logo size="sm" />} nav={<SideNav label="Organization">…</SideNav>}>
      …
    </AppShell>
  </ToastProvider>
</ThemeProvider>;
```

The app supplies data and acts on events; the parts hold only what's on screen:

```tsx
<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={[{ id: "acme/api", label: "acme/api", group: "Repositories" }]}
  onSelect={(item) => navigate(`/repositories/${item.id}`)}
/>

<CommentThread
  label="Comments on 2.14.0"
  comments={comments} // { id, author, createdAt, body (Markdown), replies, canEdit, canDelete }
  onReply={(id, markdown) => api.reply(id, markdown)} // a rejected promise keeps the text
  onEdit={(id, markdown) => api.edit(id, markdown)}
  onDelete={(id) => confirmDelete(id)}
/>

<CommentComposer label="Comment on 2.14.0" onSubmit={(markdown) => api.comment(markdown)} />
```

## Security

- Renders text as React children; ESLint refuses `dangerouslySetInnerHTML`.
- Rich text is untrusted input: anyone who can comment writes it, and everyone who reads the
  thread renders it.
  - It's stored and exchanged as Markdown, so there's no HTML to sanitize. `RichTextContent`
    parses it with Lexical and builds React elements, so markup in the text shows as text.
  - Links: only absolute `http`, `https` and `mailto` URLs are kept, in the link dialog, in a
    loaded value, in a paste and when rendered; anything else (`javascript:`, `data:`, a relative
    path) becomes its text. Kept links open in a new tab with
    `rel="noopener noreferrer nofollow ugc"`.
  - Paste: Lexical imports only the nodes the editor registers, and the editor drops what Markdown
    can't hold (inline styles, underline, highlight, alignment), so what's shown is what's saved.
  - Length: `maxLength` (10,000 characters in `CommentComposer`) marks longer text invalid. The
    server must enforce its own limit; this one is for the writer.
- Code is colored by Shiki on its JavaScript regex engine (no WebAssembly); grammars load only for
  the languages shown. Colors reach the page as CSS custom properties, not markup.
- `CopyButton` writes only to the clipboard, on a click, through the browser's Clipboard API.
- `CommandPalette`'s ⌘K / Ctrl+K needs a modifier, so it can't fire while someone types.
- Runtime dependencies: `@bulmerkiln/design` (same workspace and release), `@headlessui/react`,
  `lexical` with `@lexical/*`, and `shiki`, all MIT, version-pinned by `yarn.lock` and installed
  only once a week old.

## Testing

```bash
yarn lint && yarn test && yarn build   # from the workspace root
```

Stories run in headless Chromium with axe-core, like `@bulmerkiln/design`'s. A story that needs a
narrow screen sets Storybook's `viewport` global; a story whose test clicks a link stops the link
navigating, or the test page goes with it.

## Standards and references

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), level AA
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/): landmarks, skip links,
  toolbar, combobox, dialog
- [CommonMark](https://spec.commonmark.org/) and [GitHub Flavored Markdown](https://github.github.com/gfm/)
  (strikethrough)
- [Lexical](https://lexical.dev/) and [Shiki](https://shiki.style/)

## Status

Implemented: UI-1 to UI-14 (`AppShell`, `CopyButton`, `CodeBlock`, `CommandPalette`,
`RichTextContent`, `RichTextEditor`, `Comment`, `CommentComposer`, `CommentThread`).

Planned: `PullCommand`, `DataTable`, `Digest`, `SeverityBadge`, the organization switcher and user
menu, charts, and a `CodeEditor` for configuration.
