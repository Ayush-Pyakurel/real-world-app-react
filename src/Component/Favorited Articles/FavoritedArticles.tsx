import axios from "axios";
import { FC, ReactElement, useEffect, useState } from "react";
import stylesFavoritedArticles from "./FavoritedArticles.module.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavoritedArticles: FC = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [favoritedArticles, setFavoritedArticles] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.realworld.io/api/articles/?favorited=${username}&limit=5&offset=0`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        setFavoritedArticles(response.data.articles);
        setLoading(false);
      });
  }, [username]);

  return (
    <section>
      {loading ? (
        <h5 className={stylesFavoritedArticles.loading}>loading articles...</h5>
      ) : (
        <article>
          {favoritedArticles.map((favoritedArticle: any, index: number) => {
            return (
              <div
                key={index}
                className={stylesFavoritedArticles["myArticle-container"]}
              >
                <img src={favoritedArticle.author.image} alt="user-image" />
                <div className={stylesFavoritedArticles["user-like-container"]}>
                  <div className={stylesFavoritedArticles["user-detail"]}>
                    <Link to={`/profile/${favoritedArticle.author.username}`}>
                      {favoritedArticle.author.username}
                    </Link>
                    <small>
                      {favoritedArticle.createdAt.toString().slice(0, 10)}
                    </small>
                  </div>
                  <div className={stylesFavoritedArticles.like}>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />{" "}
                      {favoritedArticle.favoritesCount}
                    </span>
                  </div>
                </div>
                <div className={stylesFavoritedArticles["article-body"]}>
                  <h3 className={stylesFavoritedArticles.title}>
                    {favoritedArticle.title}
                  </h3>
                  <span className={stylesFavoritedArticles.description}>
                    {favoritedArticle.description}
                  </span>
                  <Link to={`/article/${favoritedArticle.slug}`}>
                    Read More...
                  </Link>
                </div>
              </div>
            );
          })}
        </article>
      )}
    </section>
  );
};

export default FavoritedArticles;
