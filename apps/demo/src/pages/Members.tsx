/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Avatar,
  Badge,
  Button,
  Combobox,
  Dialog,
  IconButton,
  Link,
  Menu,
  MenuItem,
  PageHeader,
  Popover,
  Select,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useToast,
} from "@bulmerkiln/design";
import { EllipsisHorizontalIcon, InformationCircleIcon, UserMinusIcon, UserPlusIcon } from "@bulmerkiln/design/icons";
import { useState } from "react";
import { type Member, members as initialMembers, people, type Role } from "../data";

const roles: { value: Role; label: string }[] = [
  { value: "Reader", label: "Reader" },
  { value: "Maintainer", label: "Maintainer" },
  { value: "Owner", label: "Owner" },
];

function Invite({ open, onClose, onInvite }: { open: boolean; onClose: () => void; onInvite: (member: Member) => void }) {
  const [person, setPerson] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>("Reader");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const close = () => {
    setPerson(null);
    setRole("Reader");
    setMessage("");
    setError(undefined);
    onClose();
  };
  const send = () => {
    const chosen = people.find((p) => p.email === person);
    if (!chosen) {
      setError("Choose someone from this instance. People sign in once before they can be invited.");
      return;
    }
    setSending(true);
    // Sample data: a pretend round trip.
    setTimeout(() => {
      setSending(false);
      onInvite({ ...chosen, role: role ?? "Reader", lastActive: "invited" });
      close();
    }, 600);
  };
  return (
    <Dialog
      open={open}
      onClose={close}
      title="Invite to acme"
      description="Members can see acme's private repositories. What they can change depends on their role."
      actions={
        <>
          <Button variant="secondary" onClick={close} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={send} disabled={sending}>
            {sending && <Spinner label="Sending invitation" className="size-4" />}
            Send invitation
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Combobox
          label="Person"
          placeholder="Search by name"
          options={people.map((p) => ({ value: p.email, label: `${p.name} (${p.email})` }))}
          value={person}
          onChange={(value) => {
            setPerson(value);
            setError(undefined);
          }}
          emptyMessage="No one by that name has signed in to this instance."
          error={error}
          required
        />
        <Select label="Role" options={roles} value={role} onChange={setRole} />
        <Textarea
          label="Message"
          description="Optional. Sent with the invitation email."
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
    </Dialog>
  );
}

export function Members() {
  const toast = useToast();
  const [list, setList] = useState(initialMembers);
  const [inviting, setInviting] = useState(false);
  const owners = list.filter((member) => member.role === "Owner").length;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Members"
        description="People who can see and publish to acme."
        actions={
          <>
            <Popover
              align="end"
              trigger={
                <Button variant="secondary">
                  <InformationCircleIcon className="size-4" />
                  About roles
                </Button>
              }
            >
              <dl className="flex flex-col gap-3 text-sm">
                <div>
                  <dt className="font-semibold">Reader</dt>
                  <dd className="text-ash-700 dark:text-ash-400">Pulls from private repositories.</dd>
                </div>
                <div>
                  <dt className="font-semibold">Maintainer</dt>
                  <dd className="text-ash-700 dark:text-ash-400">Pushes, tags, and changes retention and scanning.</dd>
                </div>
                <div>
                  <dt className="font-semibold">Owner</dt>
                  <dd className="text-ash-700 dark:text-ash-400">Everything, including members, tokens and deleting repositories.</dd>
                </div>
              </dl>
              <Link href="#roles" className="mt-3 inline-block text-sm">
                Roles and your identity provider's groups
              </Link>
            </Popover>
            <Button onClick={() => setInviting(true)}>
              <UserPlusIcon className="size-4" />
              Invite
            </Button>
          </>
        }
      />
      <Table caption={`${list.length} members`}>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Last active</TableHeader>
            <TableHeader>
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((member) => {
            const lastOwner = member.role === "Owner" && owners === 1;
            return (
              <TableRow key={member.email}>
                <TableHeader scope="row">
                  <span className="flex items-center gap-3">
                    <Avatar name={member.name} size="sm" decorative />
                    <span className="flex flex-col">
                      <span>{member.name}</span>
                      <span className="text-xs font-normal text-ash-700 dark:text-ash-400">{member.email}</span>
                    </span>
                  </span>
                </TableHeader>
                <TableCell>
                  <Badge size="sm" tone={member.role === "Owner" ? "brand" : "neutral"}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>{member.lastActive}</TableCell>
                <TableCell>
                  <Menu
                    align="end"
                    trigger={
                      <IconButton label={`Actions for ${member.name}`} size="sm">
                        <EllipsisHorizontalIcon />
                      </IconButton>
                    }
                  >
                    {roles
                      .filter((role) => role.value !== member.role)
                      .map((role) => (
                        <MenuItem
                          key={role.value}
                          disabled={lastOwner}
                          onClick={() => {
                            setList((current) => current.map((m) => (m.email === member.email ? { ...m, role: role.value } : m)));
                            toast.show({ variant: "success", title: `${member.name} is now a ${role.label.toLowerCase()}` });
                          }}
                        >
                          Make {role.label.toLowerCase()}
                        </MenuItem>
                      ))}
                    <MenuItem
                      icon={<UserMinusIcon />}
                      danger
                      disabled={lastOwner}
                      onClick={() => {
                        setList((current) => current.filter((m) => m.email !== member.email));
                        toast.show({ variant: "success", title: `${member.name} removed from acme` });
                      }}
                    >
                      Remove from acme
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {owners === 1 && (
        <p className="flex items-center gap-1.5 text-sm text-ash-700 dark:text-ash-400">
          acme has one owner, so their role can't change and they can't be removed.
          <Tooltip content="Make someone else an owner first.">
            <IconButton label="Why?" size="sm">
              <InformationCircleIcon />
            </IconButton>
          </Tooltip>
        </p>
      )}
      <Invite
        open={inviting}
        onClose={() => setInviting(false)}
        onInvite={(member) => {
          setList((current) => [...current, member]);
          toast.show({ variant: "success", title: `Invitation sent to ${member.name}`, description: `They'll join as a ${member.role.toLowerCase()}.` });
        }}
      />
    </div>
  );
}
