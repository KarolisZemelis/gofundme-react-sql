import { NavLink } from "react-router";
import "../../style/nav.scss";

export default function MobileNav({ setMobileMenu }) {
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
      </div>
    </nav>
  );
}
