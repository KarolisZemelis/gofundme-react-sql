import Data from "../Contexts/Data";
import { useState, useContext, useEffect, useRef } from "react";
import getRandomInt from "../Constants/getRandomInt";
import capitalizeFirstLetters from "../Constants/capitalize";
import logo from "../Components/images/logobg.png";

export default function Hero() {
  const { stories } = useContext(Data);
  const [heroStory, setHeroStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(heroStory);

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
    }, 3000); // Change story every 10 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [stories]);

  if (isLoading) {
    return <div className="hero">Loading...</div>;
  }

  if (!stories || stories.length === 0 || heroStory === null) {
    return (
      <div className="hero">
        <div className="default">
          <h1>Fund your dreams!</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="hero">
      <div className="randomStory">
        {<h3>{capitalizeFirstLetters(heroStory.name)}</h3>}
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
            <p>{heroStory.collected_amount}/</p>
            <p>{heroStory.request_amount}</p>
          </div>
        }
      </div>

      <div className="sloganContainer">
        <h1>Fund your dreams!</h1>
        <img src={logo} alt="heroStory.name" />
      </div>
    </div>
  );
}
