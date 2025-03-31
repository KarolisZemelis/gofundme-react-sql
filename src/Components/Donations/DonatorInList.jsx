export default function DonatorInList({ donator }) {
  return (
    <li className="donators__container__list__donator">
      <div className="donators__container__list__donator__name">
        {donator.name}
      </div>
      <div className="donators__container__list__donator__amount">
        {donator.total_donated} €
      </div>
    </li>
  );
}
