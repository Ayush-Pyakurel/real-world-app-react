import axios from "axios";
import styleSettings from "./Settings.module.css";

import { useFormik } from "formik";
import * as YUP from "yup";
import { useEffect, useState } from "react";

const Settings = () => {
  //   const [values, setValues] = useState();

  //   useEffect(() => {
  //     updateCurrentUser(values);
  //   }, [values]);

  const updateCurrentUser = async (values: any) => {
    await axios.put(
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
    );
  };

  const formValidate: any = YUP.object({
    image: YUP.string(),
    username: YUP.string().required("Enter the username"),
    bio: YUP.string().optional(),
    email: YUP.string().required(),
    password: YUP.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      //@ts-ignore
      //   setValues(value);
      updateCurrentUser(value);
    },
    validationSchema: formValidate,
  });

  return (
    <main className={styleSettings.container}>
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
        <input
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
        />
        <textarea
          name="bio"
          onChange={formik.handleChange}
          value={formik.values.bio}
          placeholder="Short bio about you"
        />
        <input
          type="text"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
        <button>Update Settings</button>
      </form>
      <div className={styleSettings["logout-container"]}>
        <div className={styleSettings.line} />
        <button className={styleSettings.logout}>
          or Click here to logout
        </button>
      </div>
    </main>
  );
};

export default Settings;
