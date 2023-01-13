import axios from "axios";
import { ReactElement, FC, useEffect, useState } from "react";

import stylesArticle from "./Article.module.css";
import { useParams } from "react-router-dom";

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
    <main className={stylesArticle.banner}>
      <h2>{articles?.article.title}</h2>
      <div className={stylesArticle["user-detail"]}>
        <figure>
          <img src={articles?.article?.author?.image} alt="user-image" />
          <figcaption>
            <span className={stylesArticle.username}>{articles?.article?.author?.username}</span>
            <br />
            <span className={stylesArticle.date}>{articles?.article?.createdAt.toString().slice(0, 10)}</span>
          </figcaption>
        </figure>
        <button className={stylesArticle['edit-btn']}>edit</button>
        <button className={stylesArticle['delete-btn']}>delete</button>
      </div>
    </main>
  );
};

export default Article;
