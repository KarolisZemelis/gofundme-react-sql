import StoriesList from "../Components/Stories/StoriesList";
import Auth from "../Contexts/Auth";
import "../style/main.scss";
import { useContext } from "react";

export default function Admin() {
  const { user } = useContext(Auth);
  if (user.role !== "admin") {
    return;
  }
  return (
    <section className="main">
      <div className="heroBodyBreak">
        <h2>Supportsphere Admin</h2>
      </div>
      <div className="mainMiddle">
        <StoriesList />
      </div>
    </section>
  );
}
