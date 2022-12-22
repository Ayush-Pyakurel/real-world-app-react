//styles imports
import signupStyles from "./Signup.module.css";

//router imports
import { Link } from "react-router-dom";

//formik hook import
import { useFormik } from "formik";

//yup import
import * as YUP from "yup";

//axios import
import axios from "axios";

//react-toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//router import
import { useNavigate } from "react-router-dom";

//axios response type
interface signupResponse {
  user: {
    email: "string";
    token: "string";
    username: "string";
    bio: "string";
    image: "string";
  };
}

const Signup = () => {
  const navigate = useNavigate();

  const signUpSubmit = async (inputValue: any) => {
    await axios
      .post<signupResponse>(
        "https://api.realworld.io/api/users",
        {
          user: {
            username: inputValue.username,
            email: inputValue.email,
            password: inputValue.password,
          },
        },
        {
          headers: {
            "context-type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("User created successfully", { position: "top-center" });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        // console.log(err.status);
        // console.log(err.message);
        toast.error(
          err.message === "Request failed with status code 422"
            ? "This user is already created"
            : "Could not register new user"
        );
      });
  };

  //formik hook for form validation
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      signUpSubmit(value);
    },
    validationSchema: YUP.object({
      email: YUP.string()
        .required("Email is required!")
        .email("Invalid email!"),
      username: YUP.string().required("Username is required!"),
      password: YUP.string().required("Password is required!"),
    }),
  });
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className={signupStyles["signup-container"]}>
        <div className={signupStyles["form-title"]}>
          <h1>Sign up</h1>
          <Link to={"/login"}>
            {" "}
            <span>Have an account?</span>
          </Link>
        </div>
        <form
          className={signupStyles["signup-form"]}
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="username"></label>
          <input
            type="text"
            placeholder="username"
            id="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className={signupStyles.error}>
            {formik.errors.username &&
              formik.touched.username &&
              formik.errors.username}
          </div>
          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className={signupStyles.error}>
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </div>
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className={signupStyles.error}>
            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}
          </div>
          <button className={signupStyles["signup-btn"]} type="submit">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
