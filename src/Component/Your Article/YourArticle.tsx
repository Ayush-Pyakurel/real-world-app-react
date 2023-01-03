import axios from "axios";
import React, { useEffect } from "react";

const YourArticle = () => {
  useEffect(() => {
    axios.get("https://api.realworld.io/api/articles/feed?limit=20&offset=0");
  }, []);

  return <h1>Your article</h1>;
};

export default YourArticle;
