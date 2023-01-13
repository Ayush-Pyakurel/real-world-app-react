import axios from "axios";
import { FC, ReactElement, useEffect, useState } from "react";
import stylesMyArticle from "./MyArticles.module.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Link, useParams } from "react-router-dom";
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

const MyArticles: FC = (): ReactElement => {
  const [myArticles, setMyArticles] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.realworld.io/api/articles/?author=${username}&limit=5&offset=0`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response: any) => {
        setMyArticles(response.data.articles);
        setLoading(false);
      });
  }, [username]);

  return (
    <section>
      {loading ? (
        <h5 className={stylesMyArticle.loading}>loading articles...</h5>
      ) : (
        <article>
          {myArticles.map((myArticle: any, index: number) => {
            return (
              <div
                key={index}
                className={stylesMyArticle["myArticle-container"]}
              >
                <img src={myArticle.author.image} alt="user-image" />

                <div className={stylesMyArticle["user-like-container"]}>
                  <div className={stylesMyArticle["user-detail"]}>
                    <Link to={`/profile/${myArticle.author.username}`}>
                      {myArticle.author.username}
                    </Link>
                    <small>{myArticle.createdAt.toString().slice(0, 10)}</small>
                  </div>
                  <div className={stylesMyArticle.like}>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />
                      {myArticle.favoritesCount}
                    </span>
                  </div>
                </div>
                <div className={stylesMyArticle["article-body"]}>
                  <h3 className={stylesMyArticle.title}>{myArticle.title}</h3>
                  <span className={stylesMyArticle.description}>
                    {myArticle.description}
                  </span>
                  <Link to={`article/${myArticle.slug}`}>Read More...</Link>
                </div>
              </div>
            );
          })}
        </article>
      )}
    </section>
  );
};

export default MyArticles;
