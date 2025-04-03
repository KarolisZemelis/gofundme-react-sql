import { useEffect, useState } from "react";
import useStories from "../../Hooks/useStories";

export default function StoryInListAdmin({ story }) {
  const collectedPercentage = Math.round(
    (story.collected_amount * 100) / story.request_amount
  );
  const remainingAmount = Number(story.request_amount - story.collected_amount);
  const widthStyle = { width: `${collectedPercentage}%` };
  const [checked, setChecked] = useState(story.status === 1);
  const { handleStatusChange } = useStories();

  useEffect(() => {
    setChecked(story.status === 1);
  }, [story.status]);
  return (
    <li className="admin__stories-list__story">
      <div className="admin__stories-list__story__name">
        <h3>{story.name}</h3>
      </div>
      <div className="admin__stories-list__story__container">
        <div className="admin__stories-list__story__container__image">
          <div style={{ backgroundImage: `url(${story.image})` }}></div>
        </div>
        <div className="admin__stories-list__story__container__amount">
          <div className="admin__stories-list__story__container__amount__requested_amount">
            <p>Requested Amount: </p>
            <p>{story.request_amount}€</p>
          </div>
          <div className="admin__stories-list__story__container__amount__remaining_amount">
            <p>Remaining Amount: </p>
            <p>{remainingAmount}€</p>
          </div>
          <div className="admin__stories-list__story__container__amount__collected_amount">
            <p>Collected Amount: </p>
            <p>{story.collected_amount}€</p>
          </div>
        </div>

        <div className="admin__stories-list__story__container__text">
          <p>{story.text}</p>
        </div>
        <div className="admin__stories-list__story__container__status">
          <p>Story status:</p>
          <div className="admin__stories-list__story__container__status__inputContainer">
            <input
              type="radio"
              id="storyStatusEnabled"
              name={`storyStatus-${story.id}`}
              checked={checked === true}
              onChange={() => setChecked(true)}
            />
            <label htmlFor="storyStatusEnabled">Enabled</label>
          </div>
          <div className="admin__stories-list__story__container__status__inputContainer">
            <input
              type="radio"
              id="storyStatusDisabled"
              name={`storyStatus-${story.id}`}
              checked={checked === false}
              onChange={() => setChecked(false)}
            />
            <label htmlFor="storyStatusDisabled">Disabled</label>
          </div>
          <button
            type="button"
            onClick={(_) => handleStatusChange(story.id, checked)}
            className="button"
          >
            Save
          </button>
        </div>
      </div>
    </li>
  );
}
