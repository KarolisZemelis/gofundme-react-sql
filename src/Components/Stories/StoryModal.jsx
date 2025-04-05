import { useContext, useEffect, useState } from "react";
import Data from "../../Contexts/Data";

export default function StoryModal({ modalStoryId, submitDonation }) {
  const [newDonation, setNewDonation] = useState({
    name: "",
    donation_amount: "0",
  });
  const { setModalStoryId, donations, stories } = useContext(Data);
  const [story, setStory] = useState(null);
  const [storyDonations, setStoryDonations] = useState([]);

  useEffect(() => {
    if (stories && modalStoryId) {
      setStory(stories.find((s) => s.id === modalStoryId));
    }
  }, [stories, modalStoryId, donations]);
  useEffect(() => {
    if (story && donations) {
      const filteredDonations = donations.filter(
        (s) => s.story_id === story.id
      );
      setStoryDonations(filteredDonations);
    }
  }, [donations, story]);

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story-modal">
      <div className="story-modal__dialog-centered">
        <div
          className="story-modal__exitModal"
          onClick={(_) => setModalStoryId(null)}
        >
          X
        </div>
        <div className="story-modal__dialog-centered__story__name">
          <h3>{story.name}</h3>
        </div>
        <div
          className="story-modal__dialog-centered__story__image"
          style={{ backgroundImage: `url(${story.image})` }}
        ></div>
        <div className="story-modal__dialog-centered__story__money">
          <div className="story-modal__dialog-centered__story__money__container">
            <div className="story-modal__dialog-centered__story__money__requested_amount">
              <p>Requested Amount: </p>
              <p> {story.request_amount}€</p>
            </div>
            <div className="story-modal__dialog-centered__story__money__remaining_amount">
              <p>Remaining Amount: </p>
              <p> {story.remaining_amount}€</p>
            </div>
          </div>
          <div className="story-modal__dialog-centered__story__money__collected_amount">
            <div className="story-modal__dialog-centered__story__money__collected_amount__collection_bar">
              {story.collected_amount > 0 && (
                <p className="story-modal__dialog-centered__story__money__collected_amount__collection_bar__text">
                  {story.collected_amount}€
                </p>
              )}
              <div
                className="story-modal__dialog-centered__story__money__collected_amount__collection_bar__collected_bar"
                style={{
                  width: `${Math.round(
                    (story.collected_amount * 100) / story.request_amount
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="stories-list__dialog-centered__story__text">
          <p>{story.text}</p>
        </div>
        {story.remaining_amount > 0 && (
          <div className="story-modal__dialog-centered__story__money__donate">
            <div className="story-modal__dialog-centered__story__money__donate__container">
              <div className="story-modal__dialog-centered__story__money__donate__container__input_name">
                <label htmlFor="donateName">Name</label>
                <input
                  type="text"
                  id="donateName"
                  maxLength="100"
                  value={
                    newDonation
                      ? newDonation.name
                        ? newDonation.name
                        : ""
                      : ""
                  }
                  onChange={(e) =>
                    setNewDonation({ ...newDonation, name: e.target.value })
                  }
                />
              </div>
              <div className="story-modal__dialog-centered__story__money__donate__container__input_donationAmount">
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
              className="button"
              onClick={(_) => submitDonation(story.id, newDonation)}
            >
              Support
            </button>
          </div>
        )}
        <div className="story-modal__dialog-centered__story__donations">
          <h2>People who donated to this story:</h2>
          {donations === null ? (
            <div>Loading donations...</div>
          ) : storyDonations ? (
            storyDonations.map((storyDonation) => (
              <div
                className="story-modal__dialog-centered__story__donations__container"
                key={storyDonation.id}
              >
                <div className="story-modal__dialog-centered__story__donations__container__name">
                  <p> {storyDonation.name} </p>
                </div>
                <div className="story-modal__dialog-centered__story__donations__container__amount">
                  <p> {storyDonation.donation_amount} €</p>
                </div>
              </div>
            ))
          ) : (
            <div>No donations yet.</div>
          )}
        </div>
        <button className="button" onClick={(_) => setModalStoryId(null)}>
          Close story
        </button>
      </div>
    </div>
  );
}
