//react import
import { ReactElement, useEffect, useState } from "react";

//component imports
import Banner from "../../Component/Banner/Banner";
import Tags from "../../Component/Tags/Tags";
import Article from "../Article/Article";

import { useAuthContext } from "../../Hooks/useAuthContext";

import stylesHome from "./Home.module.css";
import { NavLink } from "react-router-dom";

//react router import
// import { NavLink, Outlet } from "react-router-dom";

import YourArticle from "../../Component/Your Article/YourArticle";
import GlobalArticle from "../../Component/Global Article/GlobalArticle";



const Home: React.FC = (): ReactElement => {
  const [component, setComponent] = useState<any>();
  const [active, setActive] = useState(false)

  //@ts-ignore
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    setActive(true);
    // handleArticleChange("your-feed");
    showFeedOnLogout('global-feed')
  }, []);

  const handleArticleChange = (component: any) => {
    setComponent(component);
    setActive(false);
  };

  const showFeedOnLogout = (id:any) => {
     setComponent(id);
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Banner />
          <div
            className={
              !isLoggedIn ? stylesHome["out-container"] : stylesHome.container
            }
          >
            <div className={stylesHome.line}>
              <div className={stylesHome["home-sub-menu"]}>
                <button
                  className={active ? stylesHome["alt-btn"] : stylesHome.btn}
                  onClick={() => showFeedOnLogout("global-feed")}
                >
                  Global Feed
                </button>
              </div>
            </div>
            <div className={stylesHome.articles}>
              {component === "global-feed" ? <GlobalArticle /> : ""}
            </div>
          </div>
          <Tags />
        </>
      ) : (
        <>
          <div className={stylesHome.container}>
            <div className={stylesHome.line}>
              <div className={stylesHome["home-sub-menu"]}>
                <button
                  className={active ? stylesHome["alt-btn"] : stylesHome.btn}
                  onClick={() => handleArticleChange("your-feed")}
                >
                  Your Feed
                </button>
                <button
                  className={stylesHome.btn}
                  onClick={() => handleArticleChange("global-feed")}
                >
                  Global Feed
                </button>
              </div>
            </div>
            <div className={stylesHome.articles}>
              {component === "global-feed" ? (
                <GlobalArticle />
              ) : (
                <YourArticle />
              )}
              {/* <span>No article are here... yet</span> */}
            </div>
          </div>
          {active && console.log("active", active)}
          <Tags />
        </>
      )}
    </>
  );
};

export default Home;
