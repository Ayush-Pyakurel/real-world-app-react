import { FC, ReactElement, useState, useEffect } from "react";

import axios from "axios";
import stylesYourFeed from "./YourArticle.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const YourArticle: FC = (): ReactElement => {
  const [yourFeed, setYourFeed] = useState([]);
  const [loading, setLoading] = useState(false);



  //fetching your feed data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.realworld.io/api/articles/feed?limit=20&offset=0`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        console.log("🚀 ~ file: YourArticle.tsx:23 ~ .then ~ response", response.data.articles)
        setYourFeed(response.data.articles);
        setLoading(false);
      });
  }, []);
  console.log(yourFeed);

  return (
    <section className={stylesYourFeed.container}>
      {loading ? (
        <p>Loading your feed...</p>
      ) : (
        <article>
          {yourFeed.map((feed: any, index: number) => {
            return (
              <div
                className={stylesYourFeed["your-feed-container"]}
                key={index}
              >
                <div className={stylesYourFeed["username-wrapper"]}>
                  <figure className={stylesYourFeed["user-image"]}>
                    <img src={feed.author.image} alt="user-img" />
                    <figcaption className={stylesYourFeed["username-wrapper"]}>
                      <p>{feed.author.username}</p>
                      <small className={stylesYourFeed["feed-date"]}>
                        {feed.createdAt.toString().slice(0, 10)}
                      </small>
                    </figcaption>
                  </figure>
                  <div className={stylesYourFeed.likes}>
                    <FontAwesomeIcon icon={faHeart} />
                    {feed.favoritesCount}
                  </div>
                </div>
                <div className={stylesYourFeed["feed-body"]}>
                  <h3 className={stylesYourFeed["feed-title"]}>
                    {feed?.title}
                  </h3>
                  <span className={stylesYourFeed["feed-description"]}>
                    {feed?.description}
                  </span>
                  <br />
                  <div className={stylesYourFeed["read-more-tag-container"]}>
                    <Link to={`/article/${feed.slug}`}>Read more....</Link>
                    <ul>
                      {feed.tagList.map((tag: string, index: number) => {
                        return (
                          <li key={index}>{tag}</li>
                        )
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

export default YourArticle;
