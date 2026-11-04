import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { auth } from "@/lib/auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div  className="min-h-screen bg-muted/40 lg:flex">
        <Sidebar />

      <main className="flex-2">{children}</main>
      
    </div>
  );
};

export default layout;
