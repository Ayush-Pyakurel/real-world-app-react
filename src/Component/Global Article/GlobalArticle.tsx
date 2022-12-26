import axios from "axios";
import React, { useEffect, useState } from "react";

import stylesGlobalFeed from "./GlobalArticle.module.css";

export interface Author {
  username: string;
  bio?: any;
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

export interface ArticleResponse {
  articles: Article[];
  articlesCount: number;
}

const GlobalArticle = () => {
  const [articles, setArticles] = useState<any>([]);

  useEffect(() => {
    const handleFetchArticle = async () => {
      await axios
        .get<ArticleResponse>("https://api.realworld.io/api/articles")
        .then((response: any) => {
          setArticles(response.data.articles);
        });
    };
    handleFetchArticle();
  }, []);

  return (
    <div>
      <article>
        {articles.map((item: Article, index: number) => {
          return (
            <>
              <div className={stylesGlobalFeed["article-container"]}>
                <div
                  key={index}
                  className={stylesGlobalFeed["username-container"]}
                >
                  <img src={item.author.image} alt="user-image" />
                  <div className={stylesGlobalFeed.usename}>
                    <p>{item.author.image}</p>
                    <p>{item.createdAt.toString()}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};

export default GlobalArticle;
