import { useContext, useState } from "react";
import Data from "../../Contexts/Data";

export default function StoryInList({ story, submitDonation }) {
  const { setModalStoryId } = useContext(Data);
  const [newDonation, setNewDonation] = useState({
    name: "",
    donation_amount: "0",
  });

  if (story.status === 0) {
    return;
  }
  const widthStyle = {
    width: `${Math.round(
      (story.collected_amount * 100) / story.request_amount
    )}%`,
  };
  const MAX_LENGTH = 100;
  const truncatedText =
    story.text.length > MAX_LENGTH
      ? story.text.substring(0, MAX_LENGTH) + "..."
      : story.text;
  const openModal = () => {
    setModalStoryId(story.id);
  };
  return (
    <li className="stories-list__story">
      <div
        className="stories-list__story__name"
        style={{ backgroundImage: `url(${story.image})` }}
      >
        <div className="stories-list__story__name__container">
          <h3>{story.name}</h3>
          <div className="stories-list__story__name__container__requested_amount">
            <p>Requested Amount: </p>
            <p> {story.request_amount}€</p>
          </div>
          <div className="stories-list__story__name__container__remaining_amount">
            <p>Remaining Amount: </p>
            <p> {story.remaining_amount}€</p>
          </div>
        </div>
      </div>
      <div className="stories-list__story__collected_amount">
        <div className="stories-list__story__collected_amount__collection_bar">
          {story.collected_amount > 0 && (
            <p className="stories-list__story__collected_amount__collection_bar__text">
              {story.collected_amount}€
            </p>
          )}
          <div
            className="stories-list__story__collected_amount__collection_bar__collected_bar"
            style={widthStyle}
          ></div>
        </div>
      </div>
      {story.remaining_amount > 0 && (
        <div className="stories-list__story__donate">
          <div className="stories-list__story__donate__container">
            <div className="stories-list__story__donate__container__input_name">
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
            <div className="stories-list__story__donate__container__input_donationAmount">
              <label htmlFor="donation_amount">Amount</label>
              <input
                type="number"
                id="donation_amount"
                min={1}
                max={story.remaining_amount}
                value={newDonation?.donation_amount || ""}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  const validatedValue =
                    inputValue <= story.remaining_amount ? inputValue : "";

                  setNewDonation({
                    ...newDonation,
                    donation_amount: validatedValue,
                  });
                }}
              />
            </div>
          </div>
          <button
            className="button support"
            onClick={(_) => submitDonation(story.id, newDonation)}
          >
            Support
          </button>
        </div>
      )}
      <div className="stories-list__story__container">
        <div className="stories-list__story__container__text">
          {truncatedText} {story.text.length > MAX_LENGTH}
        </div>
      </div>

      <button
        type="button"
        className="button bottomButton"
        style={{ backgroundColor: "#333333" }}
        onClick={openModal}
      >
        Read more
      </button>
    </li>
  );
}
