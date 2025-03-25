import { useState } from "react";

export default function BurgerMenu({
  mobileMenu,
  setMobileMenu,
  clickedBars,
  setclickedBars,
}) {
  const handleClick = () => {
    // const newActive = !clickedBars;
    setclickedBars(!clickedBars);
    setMobileMenu(mobileMenu === null ? "active" : null);
  };
  return (
    <div
      className={`burger ${clickedBars ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
}
