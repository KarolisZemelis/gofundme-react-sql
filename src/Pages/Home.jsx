import DonatorsList from "../Components/Donations/DonatorsList";
import StoriesList from "../Components/Stories/StoriesList";
import Hero from "../Components/Hero";

export default function Home() {
  return (
    <section className="main">
      <Hero />
      <div className="mainMiddle">
        <DonatorsList />
        <StoriesList />
      </div>
    </section>
  );
}
