export default function StoryInList({ story }) {
  const collectedPercentage = Math.round(
    (story.collected_amount * 100) / story.request_amount
  );
  const widthStyle = { width: `${collectedPercentage}%` };
  const MAX_LENGTH = 100;
  const truncatedText =
    story.text.length > MAX_LENGTH
      ? story.text.substring(0, MAX_LENGTH) + "..."
      : story.text;
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
