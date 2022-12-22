import { FC, ReactElement } from "react";

//router elememts import
import { Link } from "react-router-dom";

//styles import
import loginStyles from "./Login.module.css";

//formik imports
import { useFormik } from "formik";

//yup imports
import * as YUP from "yup";

const Login: FC = (): ReactElement => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (value: any) => {
    console.log("onSubmit", value);
  };

  const validationSchema = YUP.object({
    email: YUP.string().required("Email is required").email("Invalid email!"),
    password: YUP.string().required("Password is required"),
  });

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      console.log("onSubmit", value);
    },
    validationSchema: YUP.object({
      email: YUP.string().required("Email is required").email("Invalid email!"),
      password: YUP.string().required("Password is required"),
    }),
  });

  return (
    <>
      <>
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
              <button className={loginStyles["login-btn"]}>Sign in</button>
            </form>
          </>
        </div>
      </>
    </>
  );
};

export default Login;
