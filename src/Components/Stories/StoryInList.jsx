export default function StoryInList({ story }) {
  console.log(story);
  return (
    <li className="stories-list__story">
      <div
        className="stories-list__story__name"
        style={{ backgroundImage: `url(${story.image})` }}
      >
        {story.name}
      </div>
      <div className="stories-list__story__text">{story.text}</div>
      <div className="stories-list__story__request_amount">
        {story.request_amount}
      </div>
      <div className="stories-list__story__collected_amount">
        {story.collected_amount}
      </div>
    </li>
  );
}
