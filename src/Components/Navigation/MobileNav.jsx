import { NavLink, useLocation } from "react-router";
import { useContext } from "react";
import { HIDE_NAV_PATHS } from "../../Constants/main";
import Auth from "../../Contexts/Auth";

export default function MobileNav({ setMobileMenu, setclickedBars }) {
  const { pathname } = useLocation();
  const { user } = useContext(Auth);

  if (HIDE_NAV_PATHS.includes(pathname)) {
    return null;
  }

  const handleClick = () => {
    setclickedBars(null);
    setMobileMenu(null);
  };
  return (
    <nav className="navContainerMobile">
      <div className="menu">
        <NavLink to="/" end onClick={() => handleClick()}>
          Home
        </NavLink>
        <NavLink to="/newStory" end onClick={() => handleClick()}>
          Fundraise
        </NavLink>
        <NavLink to="/about" end onClick={() => handleClick()}>
          About Us
        </NavLink>
        {user.role === "admin" && (
          <NavLink to="/admin" end onClick={() => handleClick()}>
            Admin
          </NavLink>
        )}
        {user.role === "guest" && (
          <NavLink to="/login" end onClick={() => handleClick()}>
            Login
          </NavLink>
        )}
        {user.role !== "guest" && (
          <div className="logout">
            <NavLink to="/logout" end onClick={() => handleClick()}>
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
