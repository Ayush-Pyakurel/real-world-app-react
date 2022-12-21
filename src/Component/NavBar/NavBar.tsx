import { Link } from "react-router-dom";

import { FC, ReactElement } from "react";

import NavStyles from "./NavBar.module.css";

const NavBar: FC = (): ReactElement => {
  return (
    <nav className={NavStyles.navBar}>
      <div>
        <Link to="/" className={NavStyles.title}>
          Conduit
        </Link>
      </div>
      <div className={NavStyles.listContainer}>
        <ul className={NavStyles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="login">Sign in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
