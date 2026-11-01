/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, PageHeader, ProgressBar, SegmentedControl, Skeleton, StatCard } from "@bulmerkiln/design";
import { useEffect, useState } from "react";

export function Usage() {
  const [loaded, setLoaded] = useState(false);
  const [range, setRange] = useState("7d");
  // Pretend to fetch, so the loading state shows.
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Usage"
        description="Storage and transfer for acme."
        actions={
          <SegmentedControl
            label="Time range"
            value={range}
            onChange={setRange}
            options={[
              { value: "24h", label: "24 hours" },
              { value: "7d", label: "7 days" },
              { value: "30d", label: "30 days" },
            ]}
          />
        }
      />
      <section aria-busy={!loaded} aria-label="Usage figures" className="flex flex-col gap-4">
        {!loaded ? (
          <>
            <p className="sr-only">Loading usage</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Card key={i}>
                  <Skeleton lines={2} />
                </Card>
              ))}
            </div>
            <Card>
              <Skeleton shape="block" className="h-28" />
            </Card>
          </>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Pulls" value="84,120" change={{ value: "12%", trend: "up", sentiment: "positive", period: "vs last period" }} />
              <StatCard label="Pushes" value="1,204" change={{ value: "3%", trend: "down", sentiment: "neutral", period: "vs last period" }} />
              <StatCard label="Egress" value="412 GB" change={{ value: "0", trend: "flat" }} />
            </div>
            <Card title="Quotas" headingLevel={2}>
              <div className="flex flex-col gap-5">
                <ProgressBar variant="meter" label="Storage" value={42.1} max={50} valueText="42.1 of 50 GB" warningAt={40} dangerAt={47.5} />
                <ProgressBar variant="meter" label="Members" value={18} max={25} valueText="18 of 25" warningAt={22} dangerAt={25} />
                <ProgressBar
                  variant="segmented"
                  label="Storage by format"
                  segments={[
                    { label: "OCI", value: 31, tone: "brand" },
                    { label: "npm", value: 9, tone: "success" },
                    { label: "Maven", value: 2, tone: "warning", intensity: "medium" },
                  ]}
                />
              </div>
            </Card>
          </>
        )}
      </section>
    </div>
  );
}
