"use client";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { BetterAuthActionButton } from "./better-auth-action-button";
import { UserX } from "lucide-react";

export default function ImpersonationIndicator() {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();

  if (session?.session.impersonatedBy == null) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <BetterAuthActionButton
        action={() =>
          authClient.admin.stopImpersonating(undefined, {
            onSuccess: () => {
              router.push("/admin");
              refetch();
            },
          })
        }
        variant="destructive"
        size="sm"
      >
        <UserX />
      </BetterAuthActionButton>
    </div>
  );
}
