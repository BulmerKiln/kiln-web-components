/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Badge,
  Button,
  Dialog,
  Link,
  PageHeader,
  Pagination,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextInput,
  useToast,
} from "@bulmerkiln/design";
import { MagnifyingGlassIcon, PlusIcon } from "@bulmerkiln/design/icons";
import { useState } from "react";
import { formatIcon, formatTone, repositories, visibilityIcon } from "../data";
import { RouterLink } from "../RouterLink";

function NewRepository({ open, onClose }: { open: boolean; onClose: () => void }) {
  const toast = useToast();
  const [name, setName] = useState("");
  const [format, setFormat] = useState<string | null>("oci");
  const [error, setError] = useState<string>();
  const create = () => {
    if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(name)) {
      setError("Use namespace/name in lower case, such as acme/payments.");
      return;
    }
    toast.show({ variant: "success", title: `${name} created`, description: "Push to it with any OCI client." });
    setName("");
    setError(undefined);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="New repository"
      description="Repositories hold one format. Visibility can change later."
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={create}>Create repository</Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <TextInput label="Name" placeholder="acme/payments" value={name} onChange={(e) => setName(e.target.value)} error={error} required autoComplete="off" />
        <Select
          label="Format"
          value={format}
          onChange={setFormat}
          options={[
            { value: "oci", label: "OCI images" },
            { value: "npm", label: "npm packages" },
            { value: "maven", label: "Maven artifacts" },
          ]}
        />
        <RadioGroup
          label="Visibility"
          defaultValue="private"
          options={[
            { value: "private", label: "Private", description: "Only members of acme can pull." },
            { value: "internal", label: "Internal", description: "Anyone signed in to this instance can pull." },
            { value: "public", label: "Public", description: "Anyone can pull." },
          ]}
        />
      </div>
    </Dialog>
  );
}

export function Repositories() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);
  const shown = repositories.filter((r) => r.name.includes(query.trim().toLowerCase()));
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Repositories"
        description="Everything acme publishes, across formats."
        actions={
          <Button onClick={() => setCreating(true)}>
            <PlusIcon className="size-4" />
            New repository
          </Button>
        }
      />
      <TextInput
        label="Search repositories"
        type="search"
        placeholder="acme/api"
        leadingIcon={<MagnifyingGlassIcon />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
      <Table caption={`${shown.length} repositories`}>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Format</TableHeader>
            <TableHeader>Visibility</TableHeader>
            <TableHeader numeric>Versions</TableHeader>
            <TableHeader numeric>Size</TableHeader>
            <TableHeader>Updated</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {shown.map((repo) => (
            <TableRow key={repo.name}>
              <TableHeader scope="row">
                {repo.name === "acme/api" ? (
                  <Link as={RouterLink} href="/repositories/acme/api" variant="standalone">{repo.name}</Link>
                ) : (
                  repo.name
                )}
              </TableHeader>
              <TableCell><Badge tone={formatTone[repo.format]} size="sm" icon={formatIcon[repo.format]}>{repo.format}</Badge></TableCell>
              <TableCell><Badge size="sm" icon={visibilityIcon[repo.visibility]}>{repo.visibility}</Badge></TableCell>
              <TableCell numeric>{repo.versions}</TableCell>
              <TableCell numeric>{repo.size}</TableCell>
              <TableCell>{repo.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={page} pageCount={3} onPageChange={setPage} summary={`Page ${page} of sample data`} />
      <NewRepository open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}
