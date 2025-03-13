import DonatorsList from "../Components/Donations/DonatorsList";
import StoriesList from "../Components/Stories/StoriesList";

export default function Home() {
  return (
    <section className="main">
      <DonatorsList />
      <StoriesList />
    </section>
  );
}
