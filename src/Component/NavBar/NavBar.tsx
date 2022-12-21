import { Link } from "react-router-dom";

import NavStyles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={NavStyles.navBar}>
      <div className={NavStyles.title}>
        <h3>Conduit</h3>
      </div>
      <div className={NavStyles.listContainer}>
        <ul className={NavStyles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
