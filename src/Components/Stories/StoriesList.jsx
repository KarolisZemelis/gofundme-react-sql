import { useContext } from "react";
import Data from "../../Contexts/Data";
import StoryInList from "./StoryInList";
import StoryInListAdmin from "./StoryInListAdmin";

export default function StoriesList() {
  const { stories } = useContext(Data);
  const currentPath = window.location.pathname;

  if (null === stories) {
    return (
      <div className="bin">
        <h1>Stories loading...</h1>
      </div>
    );
  }
  return (
    <div className="stories-bin">
      <h1>Stories</h1>
      <ul className="stories-list">
        {currentPath !== "/admin" &&
          stories.map((s) => <StoryInList key={s.id} story={s} />)}
        {currentPath === "/admin" &&
          stories.map((s) => <StoryInListAdmin key={s.id} story={s} />)}
      </ul>
    </div>
  );
}
