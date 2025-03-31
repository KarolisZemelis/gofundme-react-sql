import Data from "../Contexts/Data";
import { useState, useContext, useEffect } from "react";
import getRandomInt from "../Constants/getRandomInt";
import capitalizeFirstLetters from "../Constants/capitalize";

export default function Hero() {
  const { stories, setModalStoryId } = useContext(Data);
  const [heroStory, setHeroStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectRandomStory = () => {
    if (stories && stories.length > 0) {
      let randomStory = stories[getRandomInt(0, stories.length - 1)];
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
      setIsLoading(false);
    }
  }, [stories]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      selectRandomStory();
    }, 7000); // Change story every 10 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup interval on unmount
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
      <div className="randomStory" onClick={openModal}>
        {
          <div className="storyNameContainer">
            <h3 className="randomStoryName">
              {capitalizeFirstLetters(heroStory.name)}
            </h3>
          </div>
        }
        {
          <div
            className="round-image-container"
            style={{ "--progress": `${heroStory.progressPercentage}%` }}
          >
            {<img src={heroStory.image} alt={heroStory.name} />}
          </div>
        }
        {
          <div className="amountContainer">
            <h4>
              {heroStory.collected_amount} € <b>/</b>
            </h4>

            <h4>{heroStory.request_amount} €</h4>
          </div>
        }
      </div>
    </div>
  );
}
