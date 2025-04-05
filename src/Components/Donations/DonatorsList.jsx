import DonatorInList from "./DonatorInList";
import Data from "../../Contexts/Data";
import { useContext } from "react";
import { v4 } from "uuid";

export default function DonatorsList() {
  const { donators } = useContext(Data);

  if (null === donators) {
    return (
      <div className="donators__container">
        <h1>Donators loading...</h1>
      </div>
    );
  }
  return (
    <div className="donators__container">
      <h1>Top 10 Donators</h1>
      <ul className="donators__container__list">
        {donators.map((d) => (
          <DonatorInList key={v4()} donator={d} />
        ))}
      </ul>
    </div>
  );
}
