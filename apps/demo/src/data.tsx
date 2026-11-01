/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuildingOfficeIcon, ContainerIcon, CubeIcon, GlobeAltIcon, LockClosedIcon } from "@bulmerkiln/design/icons";

/** Sample data: none of it is real. */

export interface Repository {
  name: string;
  format: "OCI" | "npm" | "Maven";
  visibility: "Private" | "Internal" | "Public";
  versions: number;
  size: string;
  updated: string;
}

export const repositories: Repository[] = [
  { name: "acme/api", format: "OCI", visibility: "Private", versions: 214, size: "3.1 GB", updated: "2 hours ago" },
  { name: "acme/web", format: "OCI", visibility: "Private", versions: 412, size: "6.8 GB", updated: "5 hours ago" },
  { name: "acme/billing", format: "OCI", visibility: "Internal", versions: 38, size: "740 MB", updated: "yesterday" },
  { name: "@acme/ui-kit", format: "npm", visibility: "Public", versions: 96, size: "41 MB", updated: "3 days ago" },
  { name: "@acme/sdk", format: "npm", visibility: "Internal", versions: 57, size: "18 MB", updated: "1 week ago" },
  { name: "com.acme:ledger", format: "Maven", visibility: "Private", versions: 23, size: "112 MB", updated: "2 weeks ago" },
];

export const versions = [
  { tag: "2.14.0", digest: "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", size: "182.4 MB", pushed: "2 hours ago", signed: true },
  { tag: "2.13.2", digest: "sha256:60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752", size: "181.9 MB", pushed: "3 days ago", signed: true },
  { tag: "2.13.1", digest: "sha256:fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13", size: "179.2 MB", pushed: "1 week ago", signed: false },
  { tag: "2.13.0", digest: "sha256:a4e624d686e03ed2767c0abd85c14426b0b1157d2ce81d27bb4fe4f6f01d688a", size: "176.5 MB", pushed: "2 weeks ago", signed: true },
];

export const formatTone = { OCI: "brand", npm: "success", Maven: "warning" } as const;

export const formatIcon = { OCI: <ContainerIcon />, npm: <CubeIcon />, Maven: <CubeIcon /> };

export const visibilityIcon = { Private: <LockClosedIcon />, Internal: <BuildingOfficeIcon />, Public: <GlobeAltIcon /> };

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3600 * 1000);

export const discussion = [
  {
    id: "c1",
    author: { name: "Grace Hopper" },
    createdAt: hoursAgo(30),
    body: "Why is **2.13.1** unsigned? Our deploy policy refuses it.",
    replies: [
      {
        id: "c1-r1",
        author: { name: "Ada Lovelace" },
        createdAt: hoursAgo(29),
        body: "The signing key rotated mid-build, so the job pushed before signing. See [the runbook](https://example.com/runbooks/signing).",
        canEdit: true,
        canDelete: true,
      },
      { id: "c1-r2", author: { name: "Grace Hopper" }, createdAt: hoursAgo(28), body: "Should we re-run it?" },
      {
        id: "c1-r3",
        author: { name: "Ada Lovelace" },
        createdAt: hoursAgo(27),
        body: "No: tag a new version instead.\n\n```shell\nkiln verify kiln.example.com/acme/api:2.13.2\n```",
        canEdit: true,
        canDelete: true,
      },
      { id: "c1-r4", author: { name: "Grace Hopper" }, createdAt: hoursAgo(26), body: "Done, 2.13.2 verifies. Thanks!" },
    ],
  },
  {
    id: "c2",
    author: { name: "Alan Turing" },
    createdAt: hoursAgo(3),
    body: "Retention keeps 2.13.1 until the 50-version limit; I've put a hold on it for the incident review.",
    replies: [
      {
        id: "c2-r1",
        author: { name: "Fred Brooks" },
        createdAt: hoursAgo(2),
        body: "Good. And let's not add reviewers to get it done sooner: that only makes it later.",
      },
    ],
  },
];

export type Role = "Owner" | "Maintainer" | "Reader";

export interface Member {
  name: string;
  email: string;
  role: Role;
  lastActive: string;
}

export const members: Member[] = [
  { name: "Ada Lovelace", email: "ada@acme.example", role: "Owner", lastActive: "now" },
  { name: "Grace Hopper", email: "grace@acme.example", role: "Maintainer", lastActive: "1 hour ago" },
  { name: "Alan Turing", email: "alan@acme.example", role: "Maintainer", lastActive: "yesterday" },
  { name: "Frances Allen", email: "frances@acme.example", role: "Maintainer", lastActive: "2 days ago" },
  { name: "Fred Brooks", email: "fred@acme.example", role: "Reader", lastActive: "4 days ago" },
  { name: "Ken Thompson", email: "ken@acme.example", role: "Reader", lastActive: "last week" },
];

/** People on this instance who aren't members of acme yet. */
export const people = [
  { name: "Margaret Hamilton", email: "margaret@acme.example" },
  { name: "Edsger Dijkstra", email: "edsger@acme.example" },
  { name: "Barbara Liskov", email: "barbara@acme.example" },
  { name: "Donald Knuth", email: "donald@acme.example" },
  { name: "Dennis Ritchie", email: "dennis@acme.example" },
  { name: "Leslie Lamport", email: "leslie@acme.example" },
  { name: "Radia Perlman", email: "radia@acme.example" },
  { name: "Tony Hoare", email: "tony@acme.example" },
];

export type Severity = "Critical" | "High" | "Medium" | "Low";

export const findings: { id: string; title: string; severity: Severity; repository: string; version: string; fixedIn?: string }[] = [
  { id: "CVE-2026-31337", title: "Heap overflow in libpng's chunk parser", severity: "High", repository: "acme/api", version: "2.14.0", fixedIn: "1.6.47" },
  { id: "CVE-2026-28801", title: "Request smuggling in the HTTP/1 parser", severity: "High", repository: "acme/web", version: "5.2.1", fixedIn: "3.1.4" },
  { id: "GHSA-7x2p-h4f9-q3vm", title: "Prototype pollution through deep merge", severity: "Medium", repository: "@acme/ui-kit", version: "4.0.2" },
];

export const severityTone = { Critical: "danger", High: "danger", Medium: "warning", Low: "neutral" } as const;
