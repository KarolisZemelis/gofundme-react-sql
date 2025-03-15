import StoriesList from "../Components/Stories/StoriesList";
import { useState, useEffect } from "react";

export default function Hero() {
  const [heroStory, setHeroStory] = useState(null);
  return (
    <div className="hero">
      <div className="default">
        <h1>Fund your dreams!</h1>
      </div>
    </div>
  );
}
