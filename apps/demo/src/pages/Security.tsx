/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Badge,
  Card,
  Disclosure,
  Divider,
  ErrorState,
  IconButton,
  PageHeader,
  SpinnerOverlay,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
} from "@bulmerkiln/design";
import { ArrowPathIcon, ShieldCheckIcon } from "@bulmerkiln/design/icons";
import { useCallback, useEffect, useState } from "react";
import { findings, severityTone } from "../data";

type Load = "loading" | "failed" | "loaded";

export function Security() {
  const [state, setState] = useState<Load>("loading");
  const [attempts, setAttempts] = useState(1);
  // Sample data: the first load fails, so the error state shows; trying again works.
  const load = useCallback(() => {
    setState("loading");
    setAttempts((n) => n + 1);
  }, []);
  useEffect(() => {
    if (state !== "loading") return;
    const timer = setTimeout(() => setState(attempts <= 1 ? "failed" : "loaded"), 900);
    return () => clearTimeout(timer);
  }, [state, attempts]);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Security"
        description="Findings in the newest version of each repository."
        actions={
          <Tooltip content="Scan again">
            <IconButton label="Rescan" variant="secondary" onClick={load} disabled={state === "loading"}>
              <ArrowPathIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <section aria-label="Findings" aria-busy={state === "loading"} className="relative flex min-h-64 flex-col gap-6">
        {state === "loading" && <SpinnerOverlay label="Loading findings" contained />}
        {state === "failed" && (
          <ErrorState
            title="Findings didn't load"
            description="The scanner didn't answer in time. Try again; if it keeps failing, check the scanner's status."
            onRetry={load}
          />
        )}
        {state === "loaded" && (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Critical" value="0" description="None open" />
              <StatCard label="High" value={String(findings.filter((f) => f.severity === "High").length)} description="Fix within 7 days" />
              <StatCard label="Medium" value={String(findings.filter((f) => f.severity === "Medium").length)} description="Fix within 30 days" />
            </div>
            <Table caption={`${findings.length} open findings`}>
              <TableHead>
                <TableRow>
                  <TableHeader>Finding</TableHeader>
                  <TableHeader>Severity</TableHeader>
                  <TableHeader>Where</TableHeader>
                  <TableHeader>Fixed in</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {findings.map((finding) => (
                  <TableRow key={finding.id}>
                    <TableHeader scope="row">
                      <span className="flex flex-col">
                        <span className="font-mono text-xs">{finding.id}</span>
                        <span className="font-normal">{finding.title}</span>
                      </span>
                    </TableHeader>
                    <TableCell>
                      <Badge tone={severityTone[finding.severity]} size="sm">
                        {finding.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {finding.repository} <span className="text-ash-700 dark:text-ash-400">{finding.version}</span>
                    </TableCell>
                    <TableCell>{finding.fixedIn ?? <span className="text-ash-700 dark:text-ash-400">No fix yet</span>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </section>
      <Divider />
      <Card title="How findings are ranked" headingLevel={2}>
        <Disclosure title="Where severities come from" divided>
          The advisory's CVSS score, unless your policy overrides it for a package. Overrides are kept in
          the audit log with who made them.
        </Disclosure>
        <Disclosure title="Why a finding has no fix" divided>
          No release of the package fixes it yet. Kiln checks the advisory databases daily and lists the
          version as soon as one does.
        </Disclosure>
        <Disclosure title="What blocks a pull">
          <span className="flex items-start gap-2">
            <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-celadon-700 dark:text-celadon-400" />
            Nothing yet: acme's policy reports findings but doesn't block pulls. Owners can change that in
            the organization's settings.
          </span>
        </Disclosure>
      </Card>
    </div>
  );
}
