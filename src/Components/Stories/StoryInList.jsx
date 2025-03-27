import useDonations from "../../Hooks/useDonations";

export default function StoryInList({ story }) {
  const collectedPercentage = Math.round(
    (story.collected_amount * 100) / story.request_amount
  );
  const remainingAmount = Number(story.request_amount - story.collected_amount);
  const widthStyle = { width: `${collectedPercentage}%` };
  const MAX_LENGTH = 100;
  const truncatedText =
    story.text.length > MAX_LENGTH
      ? story.text.substring(0, MAX_LENGTH) + "..."
      : story.text;

  const { submitDonation, newDonation, setNewDonation } = useDonations();
  return (
    <li className="stories-list__story">
      <div
        className="stories-list__story__name"
        style={{ backgroundImage: `url(${story.image})` }}
      >
        <div className="stories-list__story__name__container">
          <h3>{story.name}</h3>
          <div className="stories-list__story__name__requested_amount">
            <p>Requested Amount: </p>
            <p> {story.request_amount}€</p>
          </div>
          <div className="stories-list__story__name__requested_amount">
            <p>Remaining Amount: </p>
            <p> {remainingAmount}€</p>
          </div>
        </div>
      </div>
      <div className="stories-list__story__collected_amount">
        <div className="collection_bar">
          <div className="collected_bar" style={widthStyle}>
            <div className="stories-list__story__collected_amount__container">
              <p>{story.collected_amount}€</p>
            </div>
          </div>
        </div>
      </div>
      <div className="donate">
        <div className="input_name">
          <label htmlFor="donateName">Name</label>
          <input
            type="text"
            id="donateName"
            maxLength="100"
            value={
              newDonation ? (newDonation.name ? newDonation.name : "") : ""
            }
            onChange={(e) =>
              setNewDonation({ ...newDonation, name: e.target.value })
            }
          />
        </div>
        <div className="input_donation_amount">
          <label htmlFor="donation_amount">Amount</label>
          <input
            type="number"
            id="donation_amount"
            min={1}
            max={remainingAmount}
            value={newDonation?.donation_amount || ""}
            onChange={(e) => {
              const inputValue = parseInt(e.target.value);
              const validatedValue =
                inputValue <= remainingAmount ? inputValue : "";

              setNewDonation({
                ...newDonation,
                donation_amount: validatedValue,
              });
            }}
          />
        </div>
        <button
          className="submitDonation"
          onClick={(_) => submitDonation(story.id)}
        >
          Support
        </button>
      </div>
      <div className="stories-list__story__text">
        <p>
          {truncatedText}{" "}
          {story.text.length > MAX_LENGTH && (
            <a href={`/story/${story.id}`} className="read-more">
              Read more
            </a>
          )}
        </p>
      </div>
    </li>
  );
}
