import DonatorInList from "./DonatorInList";
import Data from "../../Contexts/Data";
import { useContext } from "react";

export default function DonatorsList() {
  const { donators } = useContext(Data);

  if (null === donators) {
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
        {donators.map((d, index) => (
          <DonatorInList key={index} donator={d} />
        ))}
      </ul>
    </div>
  );
}
