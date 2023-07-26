import React from "react";
import { signOut } from "next-auth/react";
import type { PropsWithChildren } from "react";

import Navigation from "~/components/navigation/navigation";
const LoggedInLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <Navigation />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          WG <span className="text-[hsl(280,100%,70%)]">-</span> Sync
        </h1>
        <button
          className="w-3/12 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signOut()}
        >
          {" "}
          Sign Out
        </button>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
      </main>
    </>
  );
};

export default LoggedInLayout;
