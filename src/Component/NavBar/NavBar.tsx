import { Link, NavLink } from "react-router-dom";

import { FC, ReactElement } from "react";

import NavStyles from "./NavBar.module.css";

import { useAuthContext } from "../../Hooks/useAuthContext";

import { faGear, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar: React.FC = (): ReactElement => {
  //@ts-ignore
  const { isLoggedIn, user } = useAuthContext();

  return (
    <nav className={NavStyles.navBar}>
      <div>
        <Link to="/" className={NavStyles.title}>
          Conduit
        </Link>
      </div>
      {!isLoggedIn ? (
        <div className={NavStyles.listContainer}>
          <ul className={NavStyles.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={NavStyles.listContainer}>
          <ul className={NavStyles.navList}>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#5cb85c" : "black",
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-article"
                style={({ isActive }) => ({
                  color: isActive ? "#5cb85c" : "black",
                })}
                className={NavStyles["new-article-icon"]}
              >
                <FontAwesomeIcon icon={faFileCirclePlus} />
                New Article
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                style={({ isActive }) => ({
                  color: isActive ? "#5cb85c" : "black",
                })}
              >
                <FontAwesomeIcon icon={faGear} />
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile/${user?.username}`}
                style={({ isActive }) => ({
                  color: isActive ? "#5cb85c" : "black",
                })}
              >
                <figure>
                  <img src={user?.image} alt="user" />
                  <figcaption>{user?.username}</figcaption>
                </figure>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
