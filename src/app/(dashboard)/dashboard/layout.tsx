import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toast";

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

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Toaster>{children}</Toaster>
      </main>
      
    </div>
  );
};

export default layout;
