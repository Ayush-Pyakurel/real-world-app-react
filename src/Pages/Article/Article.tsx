import axios from "axios";
import { ReactElement, FC, useEffect, useState, SyntheticEvent } from "react";

import stylesArticle from "./Article.module.css";
import { useNavigate, useParams } from "react-router-dom";

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
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<MainArticle>(`https://api.realworld.io/api/articles/${slug}`)
      .then((response) => {
        setArticles(response.data);
      });
  }, []);

  const handleCommentsubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleArticleEdit = () => {
    navigate("/create-article", {
      state: {
        title: articles?.article.title,
        description: articles?.article?.description,
        body: articles?.article?.body,
        tags: [articles?.article?.tagList]
      },
    });
  };

  return (
    <>
      {/* banner section */}
      <main className={stylesArticle.banner}>
        <h1>{articles?.article.title}</h1>
        <div className={stylesArticle["banner-user-detail"]}>
          <figure className={stylesArticle["banner-user-image"]}>
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
          <button
            className={stylesArticle["edit-btn"]}
            onClick={handleArticleEdit}
          >
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

      {/* article body */}
      <article className={stylesArticle["article-body"]}>
        <p>{articles?.article?.body}</p>
        {articles?.article?.tagList.map((tag: any, index: number) => {
          return (
            <ul key={index}>
              <li>{tag}</li>
            </ul>
          );
        })}
        <div />
      </article>

      {/* comment section */}
      <section className={stylesArticle["section-wrapper"]}>
        <div className={stylesArticle["section-user-detail"]}>
          <figure className={stylesArticle["section-user-image"]}>
            <img src={articles?.article?.author?.image} alt="user-image" />
            <figcaption>
              <span className={stylesArticle.username}>
                {articles?.article?.author?.username}
              </span>
              <br />
              <span className={stylesArticle["section-date"]}>
                {articles?.article?.createdAt.toString().slice(0, 10)}
              </span>
            </figcaption>
          </figure>
          <button className={stylesArticle["section-edit-btn"]}>
            <span className={stylesArticle["section-edit-icon-text-wrapper"]}>
              <FontAwesomeIcon icon={faPen} />
              <span>Edit Article</span>
            </span>
          </button>
          <button className={stylesArticle["section-delete-btn"]}>
            <span className={stylesArticle["section-delete-icon-text-wrapper"]}>
              <FontAwesomeIcon icon={faTrashCan} />
              <span>Delete Article</span>
            </span>
          </button>
        </div>
        <form
          onSubmit={handleCommentsubmit}
          className={stylesArticle["comment-form"]}
        >
          <div className={stylesArticle["comment-wrapper"]}>
            <textarea
              className={stylesArticle.comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Write a comment..."
            />

            <footer className={stylesArticle["btn-section"]}>
              <figure>
                <img src={articles?.article?.author?.image} alt="user-image" />
              </figure>
              <button className={stylesArticle["comment-btn"]}>
                Post Comment
              </button>
            </footer>
          </div>
        </form>
      </section>
    </>
  );
};

export default Article;
