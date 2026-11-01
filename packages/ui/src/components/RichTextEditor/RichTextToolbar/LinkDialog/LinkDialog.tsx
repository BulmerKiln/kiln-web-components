/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Dialog, TextInput } from "@bulmerkiln/design";
import { useState } from "react";
import { isSafeLinkUrl } from "../../../../utils/richText";
import type { LinkDialogProps } from "./LinkDialog.types";

/** Asks for a link's address and accepts only full http, https and mailto links. */
export function LinkDialog({ open, onClose, onApply }: LinkDialogProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string>();
  const close = () => {
    setUrl("");
    setError(undefined);
    onClose();
  };
  const apply = () => {
    const trimmed = url.trim();
    if (!isSafeLinkUrl(trimmed)) {
      setError("Use a full link that starts with https://, http:// or mailto:, such as https://example.com.");
      return;
    }
    setUrl("");
    setError(undefined);
    onApply(trimmed);
  };
  return (
    <Dialog
      open={open}
      onClose={close}
      title="Add a link"
      description="The selected text links to it. Links open in a new tab."
      size="sm"
      actions={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button onClick={apply}>Add link</Button>
        </>
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          apply();
        }}
      >
        <TextInput
          label="Address"
          type="url"
          inputMode="url"
          placeholder="https://"
          autoComplete="url"
          autoFocus
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          error={error}
        />
      </form>
    </Dialog>
  );
}
