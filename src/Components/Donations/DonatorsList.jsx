import DonatorInList from "./DonatorInList";
import Data from "../../Contexts/Data";
import { useContext } from "react";

export default function DonatorsList() {
  const { donations } = useContext(Data);

  if (null === donations) {
    return (
      <div className="bin bin-30">
        <h1>Donators loading...</h1>
      </div>
    );
  }
  return (
    <div className="bin bin-30">
      <h1>Top donators</h1>
      <ul className="donators-list">
        {donations.map((d) => (
          <DonatorInList key={d.id} donator={d} />
        ))}
      </ul>
    </div>
  );
}
