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
              {story.collected_amount > 0 && <p>{story.collected_amount}€</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="stories-list__story__text">
        <p>{story.text}</p>
      </div>
      <div className="stories-list__story__status">
        <p>Story status:</p>

        <input
          type="radio"
          id="storyStatusEnabled"
          name={`storyStatus-${story.id}`}
          checked={checked === true}
          onChange={() => setChecked(true)}
        />
        <label htmlFor="storyStatusEnabled">Enabled</label>

        <input
          type="radio"
          id="storyStatusDisabled"
          name={`storyStatus-${story.id}`}
          checked={checked === false}
          onChange={() => setChecked(false)}
        />
        <label htmlFor="storyStatusDisabled">Disabled</label>

        <button
          type="button"
          onClick={(_) => handleStatusChange(story.id, checked)}
        >
          Save
        </button>
      </div>
    </li>
  );
}
