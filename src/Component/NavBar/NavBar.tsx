import { Link } from "react-router-dom";

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faFileCirclePlus} />
              <Link
                to="/create-article"
                className={NavStyles["new-article-icon"]}
              >
                New Article
              </Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faGear} />{" "}
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <img src={user.image} alt="user" />{" "}
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
