import { auth } from "@/lib/auth/auth";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import OrganizationSelect from "./_components/organization-select";
import CreateOrganizationButton from "./_components/create-organiztion-button";
import OrganizationTabs from "./_components/organization-tabs";

export default async function OrganizationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session === null) return redirect("/auth/login");
  return (
    <div className="container mx-auto my-6 px-4">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="size-4 mr-2" />
        Back to home
      </Link>

      <div className="flex items-center mb-8 gap-2">
        <OrganizationSelect />
        <CreateOrganizationButton />
      </div>

      <OrganizationTabs />
    </div>
  );
}
