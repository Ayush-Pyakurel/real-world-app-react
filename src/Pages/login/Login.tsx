import { FC, ReactElement, useState } from "react";

//router elememts import
import { Link } from "react-router-dom";

//styles import
import loginStyles from "./Login.module.css";

//formik imports
import { useFormik } from "formik";

//yup imports
import * as YUP from "yup";
// import { useQuery } from "react-query";

//react-toastify import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { useAuthContext } from "../../Hooks/useAuthContext";

import { useNavigate } from "react-router-dom";

//interface for axios response
interface loginResponse {
  user: {
    email: string;
    token: any;
    username: string;
    bio: string;
    image: string;
  };
}

interface funcProps {
  toggles(): void;
  username(username: string): void;
}

const Login: React.FC<funcProps> = (prop): ReactElement => {
  const navigate = useNavigate();

  //@ts-ignore
  const { dispatch } = useAuthContext();

  const loginSubmit = async (inputValue: any) => {
    try {
      await axios
        .post<loginResponse>(
          "https://api.realworld.io/api/users/login",
          {
            user: {
              email: inputValue.email,
              password: inputValue.password,
            },
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("Token")}`,
            },
          }
        )
        .then((res) => {
          toast.success("Loggedin Successfully");
          //localStorage.setItem("Token", res.data.user.token);
          prop.username(res.data.user.username);
          prop.toggles();
          dispatch({ type: "LOGIN", payload: res.data.user });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } catch (err: any) {
      toast.error(
        err.message === "Request failed with status code 403"
          ? "Invalid Credential"
          : "Unable to Login"
      );
    }
  };

  //const query = useQuery("login", (inputValue) => {});

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      loginSubmit(value);
    },
    validationSchema: YUP.object({
      email: YUP.string().required("Email is required").email("Invalid email!"),
      password: YUP.string().required("Password is required"),
    }),
  });

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <div className={loginStyles["login-container"]}>
        <>
          <div className={loginStyles["form-title"]}>
            <h1>Sign in</h1>
            <Link to={"/signup"}>
              {" "}
              <span>Need an account?</span>
            </Link>
          </div>
          <form
            className={loginStyles["login-form"]}
            onSubmit={formik.handleSubmit}
          >
            <label></label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className={loginStyles.error}>
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </div>
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className={loginStyles.error}>
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </div>
            <button className={loginStyles["login-btn"]} type="submit">
              Sign in
            </button>
          </form>
        </>
      </div>
    </>
  );
};

export default Login;
