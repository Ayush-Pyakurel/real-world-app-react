import axios from "axios";
import React, { useEffect, useState } from "react";

import stylesTag from "./Tags.module.css";

const Tags = () => {
  const [tag, setTags] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://api.realworld.io/api/tags")
      .then((response) => {
        setLoading(true);
        setTags(response.data.tags);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <div className={stylesTag.tags}>
        <p>Popular Tags</p>
        <div>
          {!loading &&
            tag.map((item: string, index: number) => {
              return (
                <ul key={index}>
                  <li>{item}</li>
                </ul>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tags;
