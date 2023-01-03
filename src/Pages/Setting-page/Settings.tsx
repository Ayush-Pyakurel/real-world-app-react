//axios import
import axios from "axios";
//style module import
import styleSettings from "./Settings.module.css";

//formik import
import { useFormik } from "formik";
import * as YUP from "yup";

//react-toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//react imports
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

//context import
import { useAuthContext } from "../../Hooks/useAuthContext";

//interface for user
export interface User {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface RootObject {
  user: User;
}

const Settings: FC = (): ReactElement => {
  //@ts-ignore
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  //function to handle the update of the setting
  const updateCurrentUser = async (values: any) => {
    console.log("first");
    await axios
      .put(
        "https://api.realworld.io/api/user",
        {
          user: {
            email: values.email,
            password: values.password,
            username: values.username,
            bio: values.bio,
            image: values.image,
          },
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem("user");
        dispatch({ type: "UPDATE", payload: response.data.user });
        toast.success("Your Settings are Updated!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Token");
    toast.success("Logged Out!");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 2000);
  };

  //validation schema for form
  const formValidate: any = YUP.object({
    image: YUP.string(),
    username: YUP.string().required("Enter the username"),
    bio: YUP.string().optional(),
    email: YUP.string().required().email("Invalid email"),
    password: YUP.string().required("Enter the password"),
  });

  //hook to handle formik
  const formik = useFormik({
    initialValues: {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      updateCurrentUser(value);
    },
    validationSchema: formValidate,
  });

  return (
    <main className={styleSettings.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <h1>Your Settings</h1>
      <form
        onSubmit={formik.handleSubmit}
        className={styleSettings["update-form"]}
      >
        <input
          type="text"
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image}
          placeholder="URL of profile picture"
        />
        <div className={styleSettings.errors}>
          {formik.errors.image && formik.touched.image && formik.errors.image}
        </div>

        <input
          name="username"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
        />
        <div className={styleSettings.errors}>
          {formik.errors.username &&
            formik.touched.username &&
            formik.errors.username}
        </div>
        <textarea
          name="bio"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.bio}
          placeholder="Short bio about you"
        />
        <div className={styleSettings.errors}>
          {formik.errors.bio && formik.touched.bio && formik.errors.bio}
        </div>
        <input
          type="text"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <div className={styleSettings.errors}>
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </div>
        <input
          type="password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
        <div className={styleSettings.errors}>
          {formik.errors.password &&
            formik.touched.password &&
            formik.errors.password}
        </div>
        <button>Update Settings</button>
      </form>
      <div className={styleSettings["logout-container"]}>
        <div className={styleSettings.line} />
        <button className={styleSettings.logout} onClick={handleLogout}>
          or Click here to logout
        </button>
      </div>
    </main>
  );
};

export default Settings;
