/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Avatar,
  Banner,
  Badge,
  Button,
  IconButton,
  IconTile,
  Kbd,
  Logo,
  Menu,
  MenuItem,
  MenuSeparator,
  SideNav,
  SideNavGroup,
  SideNavItem,
  ThemeProvider,
  ThemeToggle,
  ToastProvider,
} from "@bulmerkiln/design";
import {
  ArrowRightStartOnRectangleIcon,
  ChartBarIcon,
  InboxStackIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@bulmerkiln/design/icons";
import { AppShell, CommandPalette, type CommandPaletteItem } from "@bulmerkiln/ui";
import { useEffect, useState } from "react";
import { Members } from "./pages/Members";
import { NotFound } from "./pages/NotFound";
import { Repositories } from "./pages/Repositories";
import { RepositoryPage } from "./pages/RepositoryPage";
import { Security } from "./pages/Security";
import { Tokens } from "./pages/Tokens";
import { Usage } from "./pages/Usage";
import { formatIcon, repositories } from "./data";
import { navigate, usePath } from "./router";
import { RouterLink } from "./RouterLink";

const pages: { path: string; title: string; render: () => React.JSX.Element }[] = [
  { path: "/", title: "Repositories", render: () => <Repositories /> },
  { path: "/repositories/acme/api", title: "acme/api", render: () => <RepositoryPage /> },
  { path: "/usage", title: "Usage", render: () => <Usage /> },
  { path: "/security", title: "Security", render: () => <Security /> },
  { path: "/members", title: "Members", render: () => <Members /> },
  { path: "/tokens", title: "Access tokens", render: () => <Tokens /> },
];

// Everything ⌘K finds: the sample repositories, then the pages.
const paletteItems: (CommandPaletteItem & { href: string })[] = [
  ...repositories.map((repo) => ({
    id: repo.name,
    label: repo.name,
    description: `${repo.format} · ${repo.visibility}`,
    group: "Repositories",
    icon: formatIcon[repo.format],
    // Only acme/api has a page in the demo.
    href: repo.name === "acme/api" ? "/repositories/acme/api" : "/",
  })),
  { id: "page-repositories", label: "Repositories", group: "Pages", icon: <InboxStackIcon />, href: "/" },
  { id: "page-usage", label: "Usage", description: "Storage and transfer", group: "Pages", icon: <ChartBarIcon />, href: "/usage" },
  { id: "page-security", label: "Security", description: "Findings", group: "Pages", icon: <ShieldCheckIcon />, keywords: ["cve", "vulnerabilities"], href: "/security" },
  { id: "page-members", label: "Members", group: "Pages", icon: <UsersIcon />, keywords: ["people", "invite", "roles"], href: "/members" },
  { id: "page-tokens", label: "Access tokens", group: "Pages", icon: <KeyIcon />, keywords: ["credentials", "ci"], href: "/tokens" },
];

export function App() {
  const path = usePath();
  const [demoNotice, setDemoNotice] = useState(true);
  const [searching, setSearching] = useState(false);
  const page = pages.find((p) => p.path === path);
  // A single-page app has to do what a page load does: name the page and move focus to it.
  useEffect(() => {
    document.title = `${page?.title ?? "Not found"} · acme · Kiln demo`;
    document.getElementById("main")?.focus();
  }, [page]);
  const nav = (
    <SideNav label="Organization">
      <SideNavGroup>
        <SideNavItem as={RouterLink} href="/" icon={<InboxStackIcon />} current={path === "/" || path.startsWith("/repositories")}>
          Repositories
        </SideNavItem>
        <SideNavItem as={RouterLink} href="/usage" icon={<ChartBarIcon />} current={path === "/usage"}>
          Usage
        </SideNavItem>
        <SideNavItem as={RouterLink} href="/security" icon={<ShieldCheckIcon />} current={path === "/security"} badge={<Badge tone="danger" size="sm">3</Badge>}>
          Security
        </SideNavItem>
      </SideNavGroup>
      <SideNavGroup label="Settings">
        <SideNavItem as={RouterLink} href="/tokens" icon={<KeyIcon />} current={path === "/tokens"}>
          Access tokens
        </SideNavItem>
        <SideNavItem as={RouterLink} href="/members" icon={<UsersIcon />} current={path === "/members"}>
          Members
        </SideNavItem>
      </SideNavGroup>
    </SideNav>
  );
  const sidebar = (
    <>
      {nav}
      <p className="mt-8 flex items-center gap-2 px-3 text-xs text-ash-700 dark:text-ash-400">
        <IconTile className="size-5" />
        Bulmer Kiln demo, with sample data
      </p>
    </>
  );
  return (
    <ThemeProvider storageKey="kiln-demo-theme">
      <ToastProvider>
        <AppShell
          brand={
            <RouterLink href="/" aria-label="Kiln home" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:focus-visible:outline-brand-300">
              <Logo size="sm" />
            </RouterLink>
          }
          nav={sidebar}
          banner={
            demoNotice && (
              <Banner variant="info" onDismiss={() => setDemoNotice(false)}>
                A demo of @bulmerkiln/design and @bulmerkiln/ui with sample data.
              </Banner>
            )
          }
          actions={
            <>
              <Button variant="secondary" size="sm" onClick={() => setSearching(true)} aria-keyshortcuts="Meta+K Control+K">
                <MagnifyingGlassIcon className="size-4" />
                Search
                <Kbd keys={["mod", "K"]} className="hidden sm:inline-flex" />
              </Button>
              <ThemeToggle />
              <Menu
                trigger={
                  <IconButton label="Account">
                    <Avatar name="Ada Lovelace" size="sm" decorative />
                  </IconButton>
                }
              >
                <MenuItem disabled>Signed in as Ada Lovelace</MenuItem>
                <MenuSeparator />
                <MenuItem as={RouterLink} href="/tokens" icon={<KeyIcon />}>Access tokens</MenuItem>
                <MenuItem onClick={() => {}} icon={<ArrowRightStartOnRectangleIcon />}>Sign out</MenuItem>
              </Menu>
            </>
          }
        >
          {page ? page.render() : <NotFound />}
        </AppShell>
        <CommandPalette
          open={searching}
          onOpenChange={setSearching}
          items={paletteItems}
          onSelect={(item) => navigate(paletteItems.find((candidate) => candidate.id === item.id)?.href ?? "/")}
        />
      </ToastProvider>
    </ThemeProvider>
  );
}
