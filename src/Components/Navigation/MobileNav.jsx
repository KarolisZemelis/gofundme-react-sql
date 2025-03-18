import { NavLink, useLocation } from "react-router";
import "../../style/nav.scss";
import { HIDE_NAV_PATHS } from "../../Constants/main";

export default function MobileNav({ setMobileMenu }) {
  const { pathname } = useLocation();

  if (HIDE_NAV_PATHS.includes(pathname)) {
    return null;
  }
  return (
    <nav className="navContainerMobile">
      <button className="close-btn" onClick={() => setMobileMenu(null)}>
        X
      </button>
      <div className="menu">
        <NavLink to="/" end onClick={() => setMobileMenu(null)}>
          Home
        </NavLink>
        <NavLink to="/newStory" end onClick={() => setMobileMenu(null)}>
          Fundraise
        </NavLink>
        <NavLink to="/about" end onClick={() => setMobileMenu(null)}>
          About Us
        </NavLink>
        <NavLink to="/login" end>
          Login
        </NavLink>
      </div>
    </nav>
  );
}
