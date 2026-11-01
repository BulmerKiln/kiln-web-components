/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  EmptyState,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextInput,
  useToast,
} from "@bulmerkiln/design";
import { KeyIcon, PlusIcon } from "@bulmerkiln/design/icons";
import { useState } from "react";

interface Token {
  name: string;
  scopes: string[];
  expires: string;
}

export function Tokens() {
  const toast = useToast();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [write, setWrite] = useState(false);
  const create = () => {
    const token = { name: name.trim() || "unnamed", scopes: write ? ["read", "write"] : ["read"], expires: "in 90 days" };
    setTokens((current) => [...current, token]);
    toast.show({ variant: "success", title: `${token.name} created`, description: "Copy it now: it won't be shown again." });
    setOpen(false);
    setName("");
    setWrite(false);
  };
  const newToken = (
    <Button onClick={() => setOpen(true)}>
      <PlusIcon className="size-4" />
      New token
    </Button>
  );
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Access tokens" description="For clients that can't use trusted publishing." actions={tokens.length > 0 && newToken} />
      {tokens.length === 0 ? (
        <EmptyState
          icon={<KeyIcon />}
          title="No access tokens"
          description="CI with trusted publishing needs none. Create one for anything else that pushes or pulls."
          action={newToken}
        />
      ) : (
        <Table caption="Access tokens" hideCaption>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Scopes</TableHeader>
              <TableHeader>Expires</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token, i) => (
              <TableRow key={i}>
                <TableHeader scope="row">{token.name}</TableHeader>
                <TableCell>
                  <span className="flex gap-1">
                    {token.scopes.map((scope) => (
                      <Badge key={scope} size="sm" tone={scope === "write" ? "warning" : "neutral"}>{scope}</Badge>
                    ))}
                  </span>
                </TableCell>
                <TableCell>{token.expires}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="New access token"
        description="Scoped to acme. It's shown once, when it's created."
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={create}>Create token</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <TextInput label="Name" description="Where it's used, so you know what breaks if it's revoked." placeholder="ci-deploy" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
          <Checkbox label="Allow pushes" description="Without it, the token can only pull." checked={write} onChange={setWrite} />
        </div>
      </Drawer>
    </div>
  );
}
