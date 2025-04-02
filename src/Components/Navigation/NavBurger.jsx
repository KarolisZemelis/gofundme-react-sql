export default function BurgerMenu({
  mobileMenu,
  setMobileMenu,
  clickedBars,
  setclickedBars,
}) {
  const handleClick = () => {
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
