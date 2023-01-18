import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import stylesGlobalFeed from "./GlobalArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    const handleFetchGlobalArticle = async () => {
      setLoading(true);
      await axios
        .get<ArticleResponse>("https://api.realworld.io/api/articles")
        .then((response: any) => {
          setArticles(response.data.articles);
          // console.log(response.data.articles);
          setLoading(false);
        });
    };
    handleFetchGlobalArticle();
  }, []);

  //console.log(articles)

  return (
    <section className={stylesGlobalFeed.container}>
      {loading ? (
        <p>Loading article...</p>
      ) : (
        <article>
          {articles.map((article: Article, index: number) => {
           return (
             <div
               className={stylesGlobalFeed["global-feed-container"]}
               key={index}
             >
               <div className={stylesGlobalFeed["username-wrapper"]}>
                 <figure className={stylesGlobalFeed["user-image"]}>
                   <img src={article.author.image} alt="user-img" />
                   <figcaption className={stylesGlobalFeed["username-wrapper"]}>
                     <p>{article?.author?.username}</p>
                     <small className={stylesGlobalFeed["global-feed-date"]}>
                       {article?.createdAt.toString().slice(0, 10)}
                     </small>
                   </figcaption>
                 </figure>
                 <div className={stylesGlobalFeed.likes}>
                   <FontAwesomeIcon icon={faHeart} />
                   {article.favoritesCount}
                 </div>
               </div>

               <div className={stylesGlobalFeed["global-feed-body"]}>
                 <h3 className={stylesGlobalFeed["global-feed-title"]}>{article?.title}</h3>
                 <span className={stylesGlobalFeed["global-feed-description"]}>
                   {article?.description}
                 </span>
                 <br />
                 <div className={stylesGlobalFeed["read-more-tag-container"]}>
                   <Link to={`/article/${article.slug}`}>Read more....</Link>
                   <ul>
                     {article.tagList.map((tag: string, index: number) => {
                       return <li key={index}>{tag}</li>;
                     })}
                   </ul>
                 </div>
               </div>
             </div>
           );
          })}
        </article>
      )}
    </section>
  );
};

export default GlobalArticle;
