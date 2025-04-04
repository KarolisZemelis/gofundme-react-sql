import Data from "../Contexts/Data";
import { NavLink } from "react-router";
import { useState, useContext, useEffect } from "react";
import getRandomInt from "../Constants/getRandomInt";
import capitalizeFirstLetters from "../Constants/capitalize";

export default function Hero() {
  const { stories, setModalStoryId } = useContext(Data) || {};
  const [heroStory, setHeroStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectRandomStory = () => {
    const enabledStories = stories.filter((story) => story.status === 1);
    if (enabledStories && enabledStories.length > 0) {
      let randomStory =
        enabledStories[getRandomInt(0, enabledStories.length - 1)];
      const remainingAmount =
        randomStory.request_amount - randomStory.collected_amount;
      const collectedPercentage = Math.round(
        (randomStory.collected_amount * 100) / randomStory.request_amount
      );
      setHeroStory({
        ...randomStory,
        remainingAmount: remainingAmount,
        progressPercentage: collectedPercentage,
      });
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (stories && stories.length > 0) {
      selectRandomStory();
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [stories]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      selectRandomStory();
    }, 7000);

    return () => clearInterval(intervalId);
  }, [stories]);

  if (isLoading) {
    return <div className="hero">Loading...</div>;
  }

  if (!stories || stories.length === 0 || heroStory === null) {
    return (
      <div className="hero">
        <div className="default">
          <h1>Support your dreams!</h1>
        </div>
      </div>
    );
  }

  const openModal = () => {
    setModalStoryId(heroStory.id);
  };
  return (
    <div className="hero">
      <div className="hero__randomStoryContainer" onClick={openModal}>
        <div className="hero__randomStoryContainer__name">
          <h3>{capitalizeFirstLetters(heroStory.name)}</h3>
        </div>
        <div
          className="hero__randomStoryContainer__image"
          style={{ "--progress": `${heroStory.progressPercentage}%` }}
        >
          <img src={heroStory.image} alt={heroStory.name} />
        </div>

        <div className="hero__randomStoryContainer__amount">
          <h4>
            {heroStory.collected_amount} € <b>/</b> {heroStory.request_amount} €
          </h4>
        </div>

        <NavLink
          to="newStory"
          end
          className="hero__randomStoryContainer__heroButton"
        >
          <div>Create Your Story</div>
        </NavLink>
      </div>
    </div>
  );
}
