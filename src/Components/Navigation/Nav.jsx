import { NavLink, useLocation } from "react-router";
import { useState } from "react";
import "../../style/nav.scss";
import NavBurger from "./NavBurger";
import MobileNav from "./MobileNav";
import { HIDE_NAV_PATHS } from "../../Constants/main";

export default function Nav() {
  const [mobileMenu, setMobileMenu] = useState(null);
  const { pathname } = useLocation();

  if (HIDE_NAV_PATHS.includes(pathname)) {
    return null;
  }
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
        <NavLink to="/login" end>
          Login
        </NavLink>
      </div>
      <NavBurger setMobileMenu={setMobileMenu} />
      {mobileMenu !== null ? <MobileNav setMobileMenu={setMobileMenu} /> : null}
    </nav>
  );
}
