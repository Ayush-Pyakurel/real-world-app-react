import { useContext } from "react";
import { slugContext } from "../Context/ArticleContext";

const useArticleContext = () => {
  const articleSlugContext = useContext(slugContext);
  if (!articleSlugContext) {
    throw new Error(
      "useArticleContext must be inside the scope of ArticleContext!!"
    );
  }
  return articleSlugContext;
};

export default useArticleContext;
