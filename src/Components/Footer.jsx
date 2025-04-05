import { NavLink, useLocation } from "react-router";
import { useContext } from "react";
import Auth from "../Contexts/Auth";
import { HIDE_FOOTER_PATHS } from "../Constants/main";
import logo from "../Components/images/logobg.png";
export default function Footer() {
  const { user } = useContext(Auth);
  const { pathname } = useLocation();
  if (HIDE_FOOTER_PATHS.includes(pathname)) {
    return null;
  }
  return (
    <div className="footer">
      <div className="footer__top">
        {" "}
        <div className="footer__top__logo-link">
          <NavLink to="/" end>
            <img src={logo} className="logo" alt="Home" />
          </NavLink>
        </div>
        <div className="footer__top__menu">
          <div className="footer__top__menu__left">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/newStory" end>
              Fundraise
            </NavLink>
            <NavLink to="/about" end>
              About Us
            </NavLink>
            {user.role === "guest" && (
              <NavLink to="/login" end>
                Login
              </NavLink>
            )}
            {user.role === "admin" && (
              <NavLink to="/admin" end>
                Admin
              </NavLink>
            )}
          </div>
          <div className="footer__top__menu__right">
            {user.role !== "guest" && (
              <span>
                {user.username},{" "}
                <NavLink to="/logout" end>
                  Logout
                </NavLink>
              </span>
            )}
          </div>
        </div>
      </div>

      <p>
        &copy; {new Date().getFullYear()} SupportSphere. All rights reserved.
      </p>
    </div>
  );
}
