import { useSession } from "next-auth/react";
import AddFlats from "~/components/flats/addFlats";

const Flats = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  return (
    <div>
      <h1>Flats</h1>
      <AddFlats />
    </div>
  );
};

export default Flats;
