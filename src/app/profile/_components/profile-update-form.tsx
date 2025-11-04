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
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { NumberInput } from "@/components/ui/number-input";
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type ProfileUpdateFormProps = {
  name: string;
  email: string;
  favouriteNumber: number;
};

const profileUpdateSchema = z.object({
  email: z.email().min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),

  favouriteNumber: z.number().int(),
});

type ProfileUpdateForm = z.infer<typeof profileUpdateSchema>;

export function ProfileUpdateForm({ user }: { user: ProfileUpdateFormProps }) {
  const router = useRouter();
  const form = useForm<ProfileUpdateForm>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: user,
  });

  const { isSubmitting } = form.formState;

  const handleProfileUpdate = async (data: ProfileUpdateForm) => {
    const promises = [
      authClient.updateUser({
        name: data.name,
        favouriteNumber: data.favouriteNumber,
      }),
    ];
    if (data.email !== user.email) {
      promises.push(
        authClient.changeEmail({
          newEmail: data.email,
          callbackURL: "/profile",
        })
      );
    }

    const res = await Promise.all(promises);

    const updateUserResult = res[0];
    const emailResult = res[1] ?? { error: false };

    if (updateUserResult.error) {
      toast.error(updateUserResult.error.message || "Failed to update profile");
    } else if (emailResult.error) {
      toast.error(emailResult.error.message || "Failed to update email");
    } else {
      if (data.email !== user.email) {
        toast.success(
          "Verify your new email address to complete the profile update."
        );
      } else {
        toast.success("Profile updated successfully");
      }
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} type="text" />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} type="email" />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="favouriteNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favourite Number</FormLabel>
              <FormControl>
                <NumberInput {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          <LoadingSwap isLoading={isSubmitting}>Update Profile</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
