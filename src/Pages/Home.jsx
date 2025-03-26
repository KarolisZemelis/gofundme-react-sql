import DonatorsList from "../Components/Donations/DonatorsList";
import StoriesList from "../Components/Stories/StoriesList";
import Hero from "../Components/Hero";
import "../style/main.scss";

export default function Home() {
  return (
    <section className="main">
      <Hero />
      <div className="heroBodyBreak">
        <h2>
          With just a couple of clicks on{" "}
          <b>
            <i>Supportsphere</i>
          </b>{" "}
          get the help you need!
        </h2>
      </div>
      <div className="mainMiddle">
        <StoriesList />
        <DonatorsList />
      </div>
    </section>
  );
}
