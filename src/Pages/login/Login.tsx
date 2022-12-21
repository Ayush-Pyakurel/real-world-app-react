import { FC, ReactElement } from "react";

import { Link } from "react-router-dom";

import loginStyles from "./Login.module.css";

const Login: FC = (): ReactElement => {
  return (
    <>
      <div className={loginStyles["login-container"]}>
        <div className={loginStyles["form-title"]}>
          <h1>Sign in</h1>
          <Link to={"/signup"}>
            {" "}
            <span>Need an account?</span>
          </Link>
        </div>
        <form className={loginStyles["login-form"]}>
          <label htmlFor="email"></label>
          <input type="email" placeholder="Email" id="email" />
          <label htmlFor="password"></label>
          <input type="password" placeholder="password" id="password" />
          <button className={loginStyles["login-btn"]}>Sign in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
