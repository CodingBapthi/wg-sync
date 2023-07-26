import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function LoginPage() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const handleSignIn = async () => {
    if (status === "unauthenticated") {
      await signIn();
    }
  };
  console.log("Router", router);
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard").catch((error) => {
        console.error("Fehler beim Weiterleiten zur Startseite:", error);
      });
    }
  }, [status, router]);
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex w-1/2 items-center justify-center gap-1">
          <p className="text-center text-base text-white">Hello, flat Mate!</p>
        </div>
        <button
          onClick={handleSignIn}
          className="w-1/2 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
