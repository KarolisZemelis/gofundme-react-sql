import { NavLink } from "react-router";
import { useContext } from "react";
import Auth from "../Contexts/Auth";
import logo from "../Components/images/logobg.png";
export default function Footer() {
  const { user } = useContext(Auth);
  return (
    <div className="footer">
      <div className="footer__logo-link">
        <NavLink to="/" end>
          <img src={logo} className="logo" alt="Home" />
        </NavLink>
      </div>
      <div className="footer__menu">
        <div className="footer__menu__left">
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
        <div className="footer__menu__right">
          {user.role !== "guest" && (
            <span>
              {user.username},{" "}
              <NavLink to="/logout" end>
                Logout
              </NavLink>
            </span>
          )}
        </div>

        {/* 
        <div className="login_logout">
          {user.role === "guest" && (
            <NavLink to="/login" end>
              Login
            </NavLink>
          )}
          {user.role !== "guest" && (
            <div className="logout">
              {user.username}
              <NavLink to="/logout" end>
                Logout
              </NavLink>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
