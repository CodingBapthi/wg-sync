import React from "react";
import type { PropsWithChildren } from "react";

const LoggedOutLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex min-h-screen w-1/3 flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          WG <span className="text-[hsl(280,100%,70%)]">-</span> Sync
        </h1>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
      </main>
    </>
  );
};

export default LoggedOutLayout;
