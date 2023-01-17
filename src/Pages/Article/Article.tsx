import axios from "axios";
import { ReactElement, FC, useEffect, useState } from "react";

import stylesArticle from "./Article.module.css";
import { useParams } from "react-router-dom";

//font-awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

//interface for article response
export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface MainArticle {
  article: Article;
}

const Article: FC = (): ReactElement => {
  const { slug } = useParams();
  const [articles, setArticles] = useState<MainArticle>();

  useEffect(() => {
    axios
      .get<MainArticle>(`https://api.realworld.io/api/articles/${slug}`)
      .then((response) => {
        setArticles(response.data);
      });
  }, []);

  return (
    <>
      <main className={stylesArticle.banner}>
        <h1>{articles?.article.title}</h1>
        <div className={stylesArticle["user-detail"]}>
          <figure>
            <img src={articles?.article?.author?.image} alt="user-image" />
            <figcaption>
              <span className={stylesArticle.username}>
                {articles?.article?.author?.username}
              </span>
              <br />
              <span className={stylesArticle.date}>
                {articles?.article?.createdAt.toString().slice(0, 10)}
              </span>
            </figcaption>
          </figure>
          <button className={stylesArticle["edit-btn"]}>
            <span className={stylesArticle["edit-icon-text-wrapper"]}>
              <FontAwesomeIcon icon={faPen} />
              <span>Edit Article</span>
            </span>
          </button>
          <button className={stylesArticle["delete-btn"]}>
            <span className={stylesArticle["delete-icon-text-wrapper"]}>
              <FontAwesomeIcon icon={faTrashCan} />
              <span>Delete Article</span>
            </span>
          </button>
        </div>
      </main>
      <article className={stylesArticle['article-body']}>
          <p>{articles?.article?.body}</p>
          <div/>
      </article>
    </>
  );
};

export default Article;
