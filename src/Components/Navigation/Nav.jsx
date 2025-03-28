import { NavLink, useLocation } from "react-router";
import { useState, useContext } from "react";
import "../../style/nav.scss";
import NavBurger from "./NavBurger";
import MobileNav from "./MobileNav";
import { HIDE_NAV_PATHS } from "../../Constants/main";
import Auth from "../../Contexts/Auth";
import logo from "../images/logobg.png";

export default function Nav() {
  const [mobileMenu, setMobileMenu] = useState(null);
  const [clickedBars, setclickedBars] = useState(false);

  const { pathname } = useLocation();
  const { user } = useContext(Auth);

  if (HIDE_NAV_PATHS.includes(pathname)) {
    return null;
  }
  return (
    <nav className="navContainer">
      <img src={logo} className="logo" />
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
        {user.role === "admin" && (
          <NavLink to="/admin" end>
            Admin
          </NavLink>
        )}
      </div>
      <div className="login_logout">
        {user.role === "guest" && (
          <NavLink to="/login" end>
            Login
          </NavLink>
        )}
        {user.role !== "guest" && (
          <div className="logout">
            <div className="nav-right__username">{user.username}</div>
            <NavLink to="/logout" end>
              Logout
            </NavLink>
          </div>
        )}
      </div>
      <NavBurger
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        clickedBars={clickedBars}
        setclickedBars={setclickedBars}
      />
      {mobileMenu !== null ? (
        <MobileNav
          setMobileMenu={setMobileMenu}
          setclickedBars={setclickedBars}
        />
      ) : null}
    </nav>
  );
}
