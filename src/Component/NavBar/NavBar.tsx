import { Link } from "react-router-dom";

import { FC, ReactElement } from "react";

import NavStyles from "./NavBar.module.css";

interface booleanProp {
  logStatus: boolean;
  username: string;
}

const NavBar: React.FC<booleanProp> = (prop): ReactElement => {
  return (
    <nav className={NavStyles.navBar}>
      <div>
        <Link to="/" className={NavStyles.title}>
          Conduit
        </Link>
      </div>
      {!prop.logStatus ? (
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
              <Link to="/article">New Article</Link>
            </li>
            <li>
              <Link to="/setting">Settings</Link>
            </li>
            <li>
              <Link to="/setting">{prop.username}</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
