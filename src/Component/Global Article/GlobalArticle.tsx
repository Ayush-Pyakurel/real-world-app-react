import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import stylesGlobalFeed from './GlobalArticle.module.css';

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
  const { username } = useParams();

  useEffect(() => {
    const handleFetchArticle = async () => {
      await axios
        .get<ArticleResponse>('https://api.realworld.io/api/articles')
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
              <div className={stylesGlobalFeed['article-container']}>
                <div key={index} className={stylesGlobalFeed['wrapper']}>
                  <img src={item.author.image} alt='user-image' />
                  <div className={stylesGlobalFeed.username}>
                    <Link to={`/profile/${item.author.username}`}>
                      {item.author.username}
                    </Link>
                    <p>{item.createdAt.toString().slice(0, 10)}</p>
                  </div>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                  <br />
                  <div className={stylesGlobalFeed['read-more']}>
                    <small>Read more...</small>
                    <small>Tags</small>
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
