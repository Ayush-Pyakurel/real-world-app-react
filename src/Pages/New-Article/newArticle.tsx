import { ReactElement } from "react";

//styles import
import newArticleStyles from "./newArticle.module.css";

import { useLocation, useNavigate } from "react-router-dom";

//formik import
import { useFormik } from "formik";

//yup import
import * as YUP from "yup";
import axios from "axios";

//react-toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewArticle: React.FC = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  //function to handle article submission
  const createArticelSubmit = (inputValue: any) => {
    axios
      .post(
        "https://api.realworld.io/api/articles",
        {
          article: {
            title: inputValue.title,
            description: inputValue.about,
            body: inputValue.article,
            tagList: [inputValue.tags],
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
        toast.success("Created Your Article");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(response.data);
      });
  };

  //validation schema for form
  const validationSchema = YUP.object({
    title: YUP.string().required("Title is required!"),
    about: YUP.string().required("About field must not be empty!"),
    article: YUP.string().required("Article is required!"),
    tags: YUP.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      about: "",
      article: "",
      tags: "",
    },
    onSubmit: (value) => {
      createArticelSubmit(value);
    },
    validationSchema: validationSchema,
  });

  return (
    <div className={newArticleStyles.container}>
      <ToastContainer position="top-center" autoClose={1000} />

      <form
        className={newArticleStyles["article-form"]}
        onSubmit={formik.handleSubmit}
      >
        <h2 style={{ textAlign: "center" }}>New Article</h2>
        <input
          type="text"
          name="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={location.state ? location.state.title : formik.values.title}
          placeholder="Article Title"
        />
        <div className={newArticleStyles.error}>
          {formik.errors.title && formik.touched.title && formik.errors.title}
        </div>
        <input
          type="text"
          name="about"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={
            location.state ? location.state.description : formik.values.about
          }
          placeholder="About Article"
        />
        <div className={newArticleStyles.error}>
          {formik.errors.about && formik.touched.about && formik.errors.about}
        </div>
        <textarea
          name="article"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={location.state ? location.state.body : formik.values.article}
          placeholder="Write your article"
        />
        <div className={newArticleStyles.error}>
          {formik.errors.article &&
            formik.touched.article &&
            formik.errors.article}
        </div>
        <input
          type="text"
          name="tags"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={location.state ? location.state.tags : formik.values.tags}
          placeholder="Enter Tags"
        />
        <div className={newArticleStyles["btn-container"]}>
          <button className={newArticleStyles["submit-button"]}>
            Publish Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewArticle;
