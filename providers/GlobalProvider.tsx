"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import * as React from "react";

const GlobalProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
