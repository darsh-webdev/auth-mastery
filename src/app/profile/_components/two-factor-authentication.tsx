"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const twoFactorAuthenticationSchema = z.object({
  password: z.string().min(1),
});

type TwoFactorAuthenticationForm = z.infer<
  typeof twoFactorAuthenticationSchema
>;
type TwoFactorData = {
  totpURI: string;
  backupCodes: string[];
};

export function TwoFactorAuthentication({ isEnabled }: { isEnabled: boolean }) {
  const [twoFactorData, setTwoFactorData] = useState<TwoFactorData | null>(
    null
  );
  const router = useRouter();
  const form = useForm<TwoFactorAuthenticationForm>({
    resolver: zodResolver(twoFactorAuthenticationSchema),
    defaultValues: { password: "" },
  });

  const { isSubmitting } = form.formState;

  async function handleDisableTwoFactorAuth(
    data: TwoFactorAuthenticationForm
  ) {}

  async function handleEnableTwoFactorAuth(data: TwoFactorAuthenticationForm) {}
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(
          isEnabled ? handleDisableTwoFactorAuth : handleEnableTwoFactorAuth
        )}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
          variant={isEnabled ? "destructive" : "default"}
        >
          <LoadingSwap isLoading={isSubmitting}>
            {isEnabled ? "Disable 2FA" : "Enable 2FA"}
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
