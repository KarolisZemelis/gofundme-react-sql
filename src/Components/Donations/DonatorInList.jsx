export default function DonatorInList({ donator }) {
  return (
    <li className="donators-list__donator">
      <div className="donators-list__donator__name">{donator.name}</div>
      <div className="donators-amount">{donator.donation_amount} €</div>
    </li>
  );
}
