import React from "react";
import type { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import LoggedInLayout from "~/components/LoggedInLayout";
import LoggedOutLayout from "~/components/LoggedOutLayout";
const Layout = ({ children }: PropsWithChildren) => {
  const { data: sessionData, status } = useSession();

  if (sessionData && status === "authenticated") {
    return (
      <>
        <LoggedInLayout>{children}</LoggedInLayout>
      </>
    );
  } else if (!sessionData && status === "unauthenticated") {
    return (
      <>
        <LoggedOutLayout>{children}</LoggedOutLayout>
      </>
    );
  }
};

export default Layout;
