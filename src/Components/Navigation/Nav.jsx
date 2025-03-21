import { NavLink, useLocation } from "react-router";
import { useState } from "react";
import "../../style/nav.scss";
import NavBurger from "./NavBurger";
import MobileNav from "./MobileNav";
import { HIDE_NAV_PATHS } from "../../Constants/main";
import { useContext } from "react";
import Auth from "../../Contexts/Auth";
import logo from "../images/logobg.png";

export default function Nav() {
  const [mobileMenu, setMobileMenu] = useState(null);

  const { pathname } = useLocation();

  const { user } = useContext(Auth);

  if (HIDE_NAV_PATHS.includes(pathname)) {
    return null;
  }
  return (
    <nav className="navContainer">
      <h1>GoFund!</h1>
      <img src={logo} alt="heroStory.name" />
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
      <div className="nav-right">
        {user.role === "guest" && (
          <NavLink to="/login" end>
            Login
          </NavLink>
        )}
        {user.role !== "guest" && (
          <>
            <div className="nav-right__username">{user.name}</div>
            <NavLink to="/logout" end>
              Logout
            </NavLink>
          </>
        )}
      </div>
      <NavBurger setMobileMenu={setMobileMenu} />
      {mobileMenu !== null ? <MobileNav setMobileMenu={setMobileMenu} /> : null}
    </nav>
  );
}
