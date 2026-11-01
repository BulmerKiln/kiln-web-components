/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  DescriptionList,
  Dialog,
  Link,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  useToast,
} from "@bulmerkiln/design";
import { ClipboardIcon, ExclamationTriangleIcon, ShieldCheckIcon, TagIcon, TrashIcon } from "@bulmerkiln/design/icons";
import {
  CodeBlock,
  CommentComposer,
  CommentThread,
  CopyButton,
  type CommentThreadComment,
  RichTextContent,
  RichTextEditor,
} from "@bulmerkiln/ui";
import { useState } from "react";
import { discussion, versions, visibilityIcon } from "../data";
import { RouterLink } from "../RouterLink";

const pull = "docker pull kiln.example.com/acme/api:2.14.0";

const initialDescription = `Images for the **payments API**. Pull by digest in production; tags move.

- Built by GitHub Actions on every merge to \`main\`
- Signed with the acme release key, and verified on push

> [!WARNING]
> Don't re-run a failed release job: it signs with the key it started with. Tag a new version.

Before the 3.0 release:

- [x] Move to the rotated signing key
- [ ] Drop the \`2.12\` images from retention

Owners: [#payments on chat](https://chat.example.com/payments).`;

function Overview({ description }: { description: string }) {
  const latest = versions[0];
  return (
    <div className="flex flex-col gap-4">
      {description && (
        <Card title="About">
          <RichTextContent value={description} />
        </Card>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Pulls today" value="12,410" change={{ value: "8%", trend: "up", sentiment: "positive", period: "vs yesterday" }} />
        <StatCard label="Versions" value="214" description="4 tagged this month" />
        <StatCard label="Size" value="3.1 GB" change={{ value: "180 MB", trend: "up", sentiment: "negative", period: "this week" }} />
      </div>
      <CodeBlock code={pull} language="shell" title="Pull command" copyLabel="Copy pull command" />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Card title="Latest version" description="2.14.0, pushed 2 hours ago">
          <DescriptionList
            items={[
              {
                term: "Digest",
                details: (
                  <span className="flex items-start gap-1">
                    <span className="font-mono text-xs break-all">{latest.digest}</span>
                    <CopyButton value={latest.digest} label="Copy digest" />
                  </span>
                ),
              },
              { term: "Signature", details: <Badge tone="success" size="sm" icon={<ShieldCheckIcon />}>Verified</Badge> },
              { term: "Built by", details: <Link href="#run" external>GitHub Actions run 4812</Link> },
            ]}
          />
        </Card>
        <Card title="Findings in 2.14.0">
          <ProgressBar
            variant="segmented"
            label="By severity"
            hideLabel
            segments={[
              { label: "Critical", value: 0, tone: "danger" },
              { label: "High", value: 2, tone: "danger", intensity: "medium" },
              { label: "Medium", value: 9, tone: "warning", intensity: "medium" },
              { label: "Low", value: 14, tone: "neutral", intensity: "medium" },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

const me = { name: "Ada Lovelace" };

function Discussion() {
  const toast = useToast();
  const [comments, setComments] = useState<CommentThreadComment[]>(discussion);
  // Sample data: changes live in this page only, and every save takes a moment, as a real one would.
  const save = () => new Promise<void>((resolve) => setTimeout(resolve, 400));
  const update = (id: string, change: (item: CommentThreadComment) => CommentThreadComment | null) =>
    setComments((current) =>
      current.flatMap((comment) => {
        if (comment.id === id) return change(comment) ?? [];
        const replies = (comment.replies ?? []).flatMap((reply) => (reply.id === id ? (change(reply) ?? []) : reply));
        return { ...comment, replies };
      }),
    );
  const fresh = (body: string) => ({ id: crypto.randomUUID(), author: me, createdAt: new Date(), body, canEdit: true, canDelete: true });
  return (
    <Card title="Discussion" description="Notes on acme/api, kept with its audit log.">
      <div className="flex flex-col gap-6">
        <CommentThread
          label="Discussion of acme/api"
          comments={comments}
          onReply={async (id, body) => {
            await save();
            setComments((current) =>
              current.map((comment) => (comment.id === id ? { ...comment, replies: [...(comment.replies ?? []), fresh(body)] } : comment)),
            );
          }}
          onEdit={async (id, body) => {
            await save();
            update(id, (item) => ({ ...item, body, editedAt: new Date() }));
          }}
          onDelete={(id) => {
            update(id, () => null);
            toast.show({ variant: "success", title: "Comment deleted" });
          }}
        />
        <CommentComposer
          label="Add to the discussion"
          preview
          onSubmit={async (body) => {
            await save();
            setComments((current) => [...current, fresh(body)]);
          }}
        />
      </div>
    </Card>
  );
}

function Versions() {
  return (
    <Table caption="Versions of acme/api" hideCaption density="compact">
      <TableHead>
        <TableRow>
          <TableHeader>Tag</TableHeader>
          <TableHeader>Digest</TableHeader>
          <TableHeader numeric>Size</TableHeader>
          <TableHeader>Pushed</TableHeader>
          <TableHeader>Signature</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {versions.map((v) => (
          <TableRow key={v.tag}>
            <TableHeader scope="row">
              <span className="inline-flex items-center gap-1.5">
                <TagIcon className="size-4 text-ash-700 dark:text-ash-400" />
                {v.tag}
              </span>
            </TableHeader>
            <TableCell mono>{v.digest.slice(0, 19)}</TableCell>
            <TableCell numeric>{v.size}</TableCell>
            <TableCell>{v.pushed}</TableCell>
            <TableCell>
              {v.signed ? (
                <Badge tone="success" size="sm" icon={<ShieldCheckIcon />}>Verified</Badge>
              ) : (
                <Badge tone="warning" size="sm" icon={<ExclamationTriangleIcon />}>Unsigned</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Settings({ description, onDescriptionChange }: { description: string; onDescriptionChange: (markdown: string) => void }) {
  const toast = useToast();
  const [draft, setDraft] = useState(description);
  const [retention, setRetention] = useState<string | null>("50");
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <Card title="Description" headingLevel={2}>
        <div className="flex flex-col gap-3">
          <RichTextEditor
            label="Description"
            hideLabel
            description="Shown on the repository's overview. Markdown works."
            value={draft}
            onChange={setDraft}
            maxLength={2000}
            preview
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setDraft(description)} disabled={draft === description}>
              Discard
            </Button>
            <Button
              size="sm"
              disabled={draft === description || draft.length > 2000}
              onClick={() => {
                onDescriptionChange(draft);
                toast.show({ variant: "success", title: "Description saved" });
              }}
            >
              Save description
            </Button>
          </div>
        </div>
      </Card>
      <Card title="Scanning" headingLevel={2}>
        <Switch label="Scan on push" description="Every pushed image is scanned before it can be pulled." defaultChecked />
      </Card>
      <Card title="Retention" headingLevel={2}>
        <Select
          label="Keep the newest"
          description="Versions per package, not counting releases."
          value={retention}
          onChange={setRetention}
          options={[
            { value: "20", label: "20 versions" },
            { value: "50", label: "50 versions" },
            { value: "all", label: "Every version" },
          ]}
          className="max-w-xs"
        />
      </Card>
      <Alert variant="danger" title="Delete this repository">
        Removes its 214 versions and their scan results. Releases under retention block this.
        <div className="mt-3">
          <Button variant="danger" size="sm" onClick={() => setDeleting(true)}>
            <TrashIcon className="size-3.5" />
            Delete acme/api
          </Button>
        </div>
      </Alert>
      <Dialog
        open={deleting}
        onClose={() => setDeleting(false)}
        title="Delete acme/api?"
        description="This can't be undone."
        size="sm"
        actions={
          <>
            <Button variant="secondary" onClick={() => setDeleting(false)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                setDeleting(false);
                toast.show({ variant: "danger", title: "Couldn't delete acme/api", description: "2.13.2 is under retention. Remove the hold first." });
              }}
            >
              Delete
            </Button>
          </>
        }
      />
    </div>
  );
}

export function RepositoryPage() {
  const toast = useToast();
  const [description, setDescription] = useState(initialDescription);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        breadcrumb={
          <Breadcrumb
            linkAs={RouterLink}
            items={[{ label: "acme", href: "/" }, { label: "Repositories", href: "/" }, { label: "acme/api" }]}
          />
        }
        title="acme/api"
        meta={
          <>
            <Badge icon={visibilityIcon.Private}>Private</Badge>
            <Badge tone="success" icon={<ShieldCheckIcon />}>Verified</Badge>
          </>
        }
        description="Images for the payments API, built by GitHub Actions and verified on push."
        actions={
          <Button
            onClick={() =>
              navigator.clipboard.writeText(pull).then(
                () => toast.show({ variant: "success", title: "Pull command copied" }),
                () => toast.show({ variant: "warning", title: "Couldn't copy", description: pull }),
              )
            }
          >
            <ClipboardIcon className="size-4" />
            Copy pull command
          </Button>
        }
      />
      <Tabs
        tabs={[
          { id: "overview", label: "Overview", panel: <Overview description={description} /> },
          { id: "versions", label: "Versions", panel: <Versions /> },
          { id: "discussion", label: "Discussion", panel: <Discussion /> },
          { id: "settings", label: "Settings", panel: <Settings description={description} onDescriptionChange={setDescription} /> },
        ]}
      />
    </div>
  );
}
