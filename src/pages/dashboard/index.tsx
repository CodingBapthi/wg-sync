import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

import LoggedInAvatar from "~/components/avatar/LoggedInAvatar";

const Dashboard = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData?.user.isOwner);
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Dashboard
        </h1>
        <LoggedInAvatar />

        <div className="flex w-full flex-col rounded-[4px] bg-gray-400 p-1 text-left">
          <h1>My Flats:</h1>
          <p>
            Ich bin{" "}
            {sessionData?.user.isOwner ? (
              <>
                <span>Owner</span>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/flats"
                >
                  Deine Wg
                </Link>
              </>
            ) : (
              <>
                <span>nicht Owner</span>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/flats"
                >
                  Erstelle eine WG
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
