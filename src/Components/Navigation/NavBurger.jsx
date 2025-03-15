import React from "react";

export default function BurgerMenu({ setMobileMenu }) {
  return (
    <div className="burger" onClick={(_) => setMobileMenu("active")}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
}
