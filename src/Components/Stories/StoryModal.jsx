import { useContext, useEffect, useState } from "react";
import useDonations from "../../Hooks/useDonations";
import useStories from "../../Hooks/useStories";
import Data from "../../Contexts/Data";

export default function StoryInList({ modalStoryId }) {
  const { submitDonation, newDonation, setNewDonation } = useDonations();
  const { stories } = useStories();
  const [story, setStory] = useState(null);
  const { setModalStoryId } = useContext(Data);

  console.log("story", story);
  useEffect(() => {
    if (stories && modalStoryId) {
      const foundStory = stories.find((s) => s.id === modalStoryId);
      setStory(foundStory);
    }
  }, [stories, modalStoryId]);
  if (!story) {
    return <div>Loading...</div>; // Or handle the case where the story is not found
  }
  const widthStyle = {
    width: `${Math.round(
      (story.collected_amount * 100) / story.request_amount
    )}%`,
  };
  return (
    <div className="stories-list__story__modal">
      <div className="modal-dialog-centered">
        <div className="exitModal" onClick={(_) => setModalStoryId(null)}>
          X
        </div>
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
              <p> {story.remaining_amount}€</p>
            </div>
          </div>
        </div>
        <div className="stories-list__story__collected_amount">
          <div className="collection_bar">
            <div className="collected_bar" style={widthStyle}>
              <div className="stories-list__story__collected_amount__container">
                {story.collected_amount > 0 && <p>{story.collected_amount}€</p>}
              </div>
            </div>
          </div>
        </div>
        {story.remaining_amount > 0 && (
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
            <button
              className="submitDonation"
              onClick={(_) => submitDonation(story.id)}
            >
              Support
            </button>
          </div>
        )}

        <div className="stories-list__story__text">
          <p>{story.text}</p>
        </div>
      </div>
    </div>
  );
}
