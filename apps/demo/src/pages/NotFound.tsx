/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, EmptyState, PageHeader } from "@bulmerkiln/design";
import { RouterLink } from "../RouterLink";

export function NotFound() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Page not found" />
      <EmptyState
        title="Nothing lives at this address"
        description="It may have moved, or the link may be mistyped."
        action={<Button as={RouterLink} href="/">Go to repositories</Button>}
      />
    </div>
  );
}
