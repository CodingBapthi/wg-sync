import { signOut, useSession } from "next-auth/react";
import React from "react";

const dashboard = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <p className="text-center text-base text-white">
            {sessionData && <span>Hello, {sessionData.user?.name}</span>}
          </p>
          <button
            className="w-3/12 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signOut()}
          >
            {" "}
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default dashboard;
