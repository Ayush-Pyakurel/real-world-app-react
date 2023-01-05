import axios from 'axios';
import React, { useEffect, useState } from 'react';

import stylesTag from './Tags.module.css';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Tags = () => {
  const [tag, setTags] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  //@ts-ignore
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.realworld.io/api/tags')
      .then((response) => {
        setTags(response.data.tags);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <div
        className={isLoggedIn ? stylesTag['logged-tags'] : stylesTag['tags']}
      >
        <p>Popular Tags</p>
        <div>
          {!loading
            ? tag.map((item: string, index: number) => {
                return (
                  <ul key={index}>
                    <li>{item}</li>
                  </ul>
                );
              })
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default Tags;
