import axios from "axios";
import { ReactElement, useEffect, useState } from "react";

import stylesArticle from "./Article.module.css";
import YourArticle from "../../Component/Your Article/YourArticle";
import GlobalArticle from "../../Component/Global Article/GlobalArticle";
import { NavLink, Outlet } from "react-router-dom";
import Tags from "../../Component/Tags/Tags";

const Article: React.FC = (): ReactElement => {
  return (
    <div className={stylesArticle.container}>
      <div className={stylesArticle.line}>
        <div className={stylesArticle["sub-menu"]}>
          <NavLink
            to="article/your-feed"
            style={({ isActive }) => {
              return isActive ? { color: "#5cb85c" } : {};
            }}
          >
            Your Feed
          </NavLink>
          <NavLink
            to="article/global-feed"
            style={({ isActive }) => ({
              color: isActive ? "#5cb85c" : "black",
            })}
          >
            Global Feed
          </NavLink>
        </div>
      </div>
      <div className={stylesArticle.articles}>
        <span>No article are here... yet</span>
      </div>
    </div>
  );
};

export default Article;
