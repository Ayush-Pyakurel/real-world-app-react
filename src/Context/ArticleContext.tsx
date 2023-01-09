import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const slugContext = createContext([]);

const ArticleContext = ({ children }: Props) => {
  const [articleSlug, setArticleSlug] = useState([]);

  console.log(articleSlug, "slug");
  return (
    //@ts-ignore
    <slugContext.Provider value={[setArticleSlug, articleSlug]}>
      {children}
    </slugContext.Provider>
  );
};

export default ArticleContext;
