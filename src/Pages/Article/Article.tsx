import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';

interface responseData {
  articles: [];
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: [];
  createdAt: string;
  updatedAt: string;
  favorited: string;
  favoriteCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

const Article: React.FC = (): ReactElement => {
  // let responseData: any = [];
  // console.log(responseData, 'baira');
  const [articles, setArticles] = useState<any>([]);

  console.log(articles, 'baira');

  useEffect(() => {
    const handleFetchArticle = async () => {
      await axios
        .get<any>('https://api.realworld.io/api/articles')
        .then((response: any) => {
          setArticles(response.data.articles);
          console.log(typeof response.data.articles);
          console.log(typeof articles);
        });
    };
    handleFetchArticle();
  }, []);

  console.log(articles, 'vitra-baira');

  return (
    <div>
      <>
        <h1>article</h1>
        {console.log(articles, 'jsx')}
        <article>
          {articles.map((item: any) => {
            return <p>{item}</p>;
          })}
        </article>
      </>
    </div>
  );
};

export default Article;
