"use client";

import { AccountProfileForm } from "@/components/forms/account-profile-form";
import { Separator } from "@/components/ui/separator";
import useSession from "@/hooks/use-session";

function AccountPage() {
  const { user } = useSession();

  return (
    <div>
      <section>
        <h3 className="text-lg font-semibold text-neutral-800">
          Account Profile
        </h3>
        <p className="text-neutral-500 text-sm">
          Fill in your information data personal.
        </p>
      </section>
      <Separator className="my-[20px]" />
      {user ? <AccountProfileForm user={user} /> : <p>Loading...</p>}
    </div>
  );
}

export default AccountPage;
