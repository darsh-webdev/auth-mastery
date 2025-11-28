"use client";

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InviteInformation({
  invitation,
}: {
  invitation: { id: string; organizationId: string };
}) {
  const router = useRouter();

  function acceptInvite() {
    return authClient.organization.acceptInvitation(
      { invitationId: invitation.id },
      {
        onSuccess: async () => {
          await authClient.organization.setActive({
            organizationId: invitation.organizationId,
          });
          toast.success("Invitation accepted");
          router.push("/organizations");
        },
      }
    );
  }
  function rejectInvite() {
    return authClient.organization.rejectInvitation(
      {
        invitationId: invitation.id,
      },
      {
        onSuccess: () => {
          router.push("/");
          toast.success("Invitation rejected");
        },
      }
    );
  }

  return (
    <div className="flex gap-4">
      <BetterAuthActionButton className="flex-grow" action={acceptInvite}>
        Accept
      </BetterAuthActionButton>
      <BetterAuthActionButton
        className="flex-grow"
        variant="destructive"
        action={rejectInvite}
      >
        Reject
      </BetterAuthActionButton>
    </div>
  );
}
