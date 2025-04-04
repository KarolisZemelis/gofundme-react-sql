import DonatorsList from "../Components/Donations/DonatorsList";
import StoriesList from "../Components/Stories/StoriesList";
import Hero from "../Components/Hero";
import Message from "../Components/Message";
import "../style/main.scss";

export default function Home() {
  return (
    <section className="main">
      <Message />
      <Hero />
      <div className="heroBodyBreak">
        <h2>
          With just a couple of clicks on <i>Supportsphere</i> get the help you
          need!
        </h2>
      </div>
      <div className="mainMiddle">
        <StoriesList />
        <DonatorsList />
      </div>
    </section>
  );
}
