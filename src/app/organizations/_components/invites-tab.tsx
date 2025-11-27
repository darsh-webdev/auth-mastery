import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth/auth-client";
import CreateInviteButton from "./create-invite-button";

export default function InvitesTab() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const pendingInvites = activeOrganization?.invitations.filter(
    (invite) => invite.status === "pending"
  );

  const cancelInvitation = (invitationId: string) => {
    return authClient.organization.cancelInvitation({
      invitationId,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateInviteButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingInvites?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-md">
                No invites found.
              </TableCell>
            </TableRow>
          ) : (
            pendingInvites?.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell>{invite.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{invite.role}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(invite.expiresAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <BetterAuthActionButton
                    requireAreYouSure
                    variant="destructive"
                    size="sm"
                    action={() => cancelInvitation(invite.id)}
                  >
                    Cancel
                  </BetterAuthActionButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
