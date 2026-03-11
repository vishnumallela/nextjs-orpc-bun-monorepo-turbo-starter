"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/clients/auth";
import { createQueryClient } from "@/lib/clients/query-client";
import { SidebarWrapper } from "./components/sidebar/sidebar-wrapper";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createQueryClient());
  const { data: session, isPending, error } = authClient.useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!session) {
    redirect("/");
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarWrapper>{children}</SidebarWrapper>
    </QueryClientProvider>
  );
}
