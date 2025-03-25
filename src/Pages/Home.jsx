import DonatorsList from "../Components/Donations/DonatorsList";
import StoriesList from "../Components/Stories/StoriesList";
import Hero from "../Components/Hero";
import "../style/main.scss";

export default function Home() {
  return (
    <section className="main">
      <Hero />
      <div className="mainMiddle">
        <StoriesList />
        <DonatorsList />
      </div>
    </section>
  );
}
