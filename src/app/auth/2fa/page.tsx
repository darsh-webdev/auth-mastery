import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TotpForm } from "./_components/totp-form";
import { BackupCodeForm } from "./_components/backup-code-form";

export default async function TwoFactorAuthPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session !== null) return redirect("/");

  return (
    <div className="my-6 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="totp">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="totp">Authenticator </TabsTrigger>
              <TabsTrigger value="backupCodes">Backup Code</TabsTrigger>
            </TabsList>

            <TabsContent value="totp">
              <TotpForm />
            </TabsContent>

            <TabsContent value="backupCodes">
              <BackupCodeForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
