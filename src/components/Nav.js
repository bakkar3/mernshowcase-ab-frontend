import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext";

const Nav = () => {
  const { currentUserIsInGroup } = useContext(AppContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Welcome</NavLink>
        </li>
        <li>
          <NavLink to="login">
            {currentUserIsInGroup("loggedOutUsers") ? "Login" : "Logout"}
          </NavLink>
        </li>
        {currentUserIsInGroup("loggedOutUsers") && (
          <li>
            <NavLink to="register">Register</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
