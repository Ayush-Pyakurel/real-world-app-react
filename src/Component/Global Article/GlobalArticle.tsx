import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import stylesGlobalFeed from "./GlobalArticle.module.css";
import useArticleContext from "../../Hooks/useArticleContext";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [ setArticleSlug ]: any = useArticleContext();

  useEffect(() => {
    const handleFetchArticle = async () => {
      setLoading(true);
      await axios
        .get<ArticleResponse>("https://api.realworld.io/api/articles")
        .then((response: any) => {
          setArticles(response.data.articles);
          setLoading(false);
          console.log(setArticleSlug(response.data.articles), "slugsssss");
        });
    };
    handleFetchArticle();
  }, []);

  return (
    <div>
      {loading ? (
        <h5 className={stylesGlobalFeed.loading}>Loading articles...</h5>
      ) : (
        <article>
          {articles.map((item: Article, index: number) => {
            return (
              <>
                <div
                  key={index}
                  className={stylesGlobalFeed["article-container"]}
                >
                  <div className={stylesGlobalFeed["wrapper"]}>
                    <img src={item.author.image} alt="user-image" />
                    <div className={stylesGlobalFeed.username}>
                      <Link to={`/profile/${item.author.username}`}>
                        {item.author.username}
                      </Link>
                      <p>{item.createdAt.toString().slice(0, 10)}</p>
                    </div>
                    <h3>{item.title}</h3>
                    <span>{item.description}</span>
                    <br />
                    <div className={stylesGlobalFeed["read-more"]}>
                      <small>Read more...</small>
                      <small>Tags</small>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </article>
      )}
    </div>
  );
};

export default GlobalArticle;
