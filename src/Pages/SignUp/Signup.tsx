import signupStyles from "./Signup.module.css";

import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className={signupStyles["signup-container"]}>
        <div className={signupStyles["form-title"]}>
          <h1>Sign up</h1>
          <Link to={"/login"}>
            {" "}
            <span>Have an account?</span>
          </Link>
        </div>
        <form className={signupStyles["signup-form"]}>
          <label htmlFor="username"></label>
          <input type="text" placeholder="username" id="username" />
          <label htmlFor="email"></label>
          <input type="email" placeholder="Email" id="email" />
          <label htmlFor="password"></label>
          <input type="password" placeholder="password" id="password" />
          <button className={signupStyles["signup-btn"]}>Sign in</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
