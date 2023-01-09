import axios from "axios";
import { useEffect, useState } from "react";
import stylesMyArticle from "./MyArticles.module.css";
import { useParams } from "react-router-dom";

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
  const { slug } = useParams();
  const [myArticles, setMyArticles] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.realworld.io/api/articles/${slug}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response: any) => {
        console.log(setMyArticles(response.data.articles));
        console.log(myArticles);
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
              <div className={stylesMyArticle["myArticle-container"]}>
                <div className={stylesMyArticle["user-detail"]}>
                  <img src={myArticle.author.image} alt="user-image" />
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
