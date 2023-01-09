import axios from 'axios';
import { useEffect, useState } from 'react';
import styleMyArticles from './MyArticles.module.css';

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
  const [myArticles, styleMyArticles] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.realworld.io/api/articles/feed', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      })
      .then((response) => {
        styleMyArticles(response.data.articles);
      });
  }, []);

  return <div>MyArticles</div>;
};

export default MyArticles;
