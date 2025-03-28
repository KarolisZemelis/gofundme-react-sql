export default function StoryInListAdmin({ story }) {
  const collectedPercentage = Math.round(
    (story.collected_amount * 100) / story.request_amount
  );
  const remainingAmount = Number(story.request_amount - story.collected_amount);
  const widthStyle = { width: `${collectedPercentage}%` };

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

        <input type="radio" id="storyStatusEnabled" name="storyStatus" />
        <label htmlFor="storyStatus">Enabled</label>

        <input type="radio" id="storyStatusDisabled" name="storyStatus" />
        <label htmlFor="storyStatus">Disabled</label>
      </div>
    </li>
  );
}
