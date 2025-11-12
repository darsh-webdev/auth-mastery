"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Passkey } from "better-auth/plugins/passkey";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { Trash2 } from "lucide-react";

const passkeySchema = z.object({
  code: z.string().length(6),
});

type PasskeyForm = z.infer<typeof passkeySchema>;

export function PasskeyManagement({ passkeys }: { passkeys: Passkey[] }) {
  const router = useRouter();
  const form = useForm<PasskeyForm>({
    resolver: zodResolver(passkeySchema),
    defaultValues: {
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  function handleAddPasskey(data: PasskeyForm) {}

  function handleDeletePasskey(passkeyId: string) {}

  return (
    <div className="space-y-6">
      {passkeys.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No passkeys yet</CardTitle>
            <CardDescription>
              Add your first passkey for secure, passwordless authentication.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          {passkeys.map((passkey) => (
            <Card key={passkey.id}>
              <CardHeader className="flex gap-2 items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{passkey.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(passkey.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
                <BetterAuthActionButton
                  requireAreYouSure
                  variant="destructive"
                  size="icon"
                  action={() => handleDeletePasskey(passkey.id)}
                >
                  <Trash2 />
                </BetterAuthActionButton>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleAddPasskey)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <LoadingSwap isLoading={isSubmitting}>Verify</LoadingSwap>
          </Button>
        </form>
      </Form>
    </div>
  );
}
