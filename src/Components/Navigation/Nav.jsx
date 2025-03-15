import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import "../../style/nav.scss";
import NavBurger from "./NavBurger";
import MobileNav from "./MobileNav";

export default function Nav() {
  const [mobileMenu, setMobileMenu] = useState(null);
  return (
    <nav className="navContainer">
      <h1>GoFund!</h1>
      <div className="menu">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/newStory" end>
          Fundraise
        </NavLink>
        <NavLink to="/about" end>
          About Us
        </NavLink>
      </div>
      <NavBurger setMobileMenu={setMobileMenu} />
      {mobileMenu !== null ? <MobileNav setMobileMenu={setMobileMenu} /> : null}
    </nav>
  );
}
