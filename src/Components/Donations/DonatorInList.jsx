export default function DonatorInList({ donation }) {
  console.log(donation);
  return (
    <li className="donators-list__donator">
      <div className="donators-list__donator__name">{donation.name}</div>
      <div className="donators-amount">{donation.donation_amount} €</div>
    </li>
  );
}
