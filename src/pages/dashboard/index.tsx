import { useSession } from "next-auth/react";

const dashboard = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex w-1/2 items-center justify-center gap-1">
        <p className="text-center text-base text-white">
          {sessionData && <span>Hello, {sessionData.user?.name}</span>}
        </p>
      </div>
    </div>
  );
};

export default dashboard;
