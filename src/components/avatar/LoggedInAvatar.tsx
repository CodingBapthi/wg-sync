import { Button } from "~/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoggedInAvatar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      {sessionData?.user?.image ? (
        <img
          src={sessionData?.user.image}
          className="mx-auto h-24 w-24 rounded-full"
        />
      ) : (
        <p>Kein Bild vorhanden</p>
      )}
      <div className="flex justify-center gap-4">
        <p className="my-auto justify-center text-base text-white">
          {sessionData && <span>Hello, {sessionData.user?.name}</span>}
        </p>
        <Button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default LoggedInAvatar;
