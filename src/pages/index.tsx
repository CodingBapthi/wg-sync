import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HomePage from "~/pages/homePage";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status == "unauthenticated") {
    router.push("/login").catch((error) => {
      console.error("Fehler beim Weiterleiten zur Login-Seite:", error);
    });
    return null;
  }
}
