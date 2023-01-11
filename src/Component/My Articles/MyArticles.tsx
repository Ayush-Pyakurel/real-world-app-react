import axios from "axios";
import { useEffect, useState } from "react";
import stylesMyArticle from "./MyArticles.module.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Link } from "react-router-dom";

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

const MyArticles = () => {
  const [myArticles, setMyArticles] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  //@ts-ignore
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.realworld.io/api/articles/?author=${user.username}&limit=5&offset=0`,
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
  }, []);

  return (
    <div>
      {loading ? (
        <h5>loading articles...</h5>
      ) : (
        <article>
          {myArticles.map((myArticle: any, index: number) => {
            return (
              <div
                key={index}
                className={stylesMyArticle["myArticle-container"]}
              >
                <div className={stylesMyArticle["user-detail"]}>
                  <img src={myArticle.author.image} alt="user-image" />
                  <Link to={`/profile/${myArticle.author.username}`}>
                    {myArticle.author.username}
                  </Link>
                  
                </div>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};

export default MyArticles;