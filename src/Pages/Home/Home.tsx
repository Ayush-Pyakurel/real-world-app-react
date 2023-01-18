//react import
import { ReactElement, useEffect, useState } from "react";

//component imports
import Banner from "../../Component/Banner/Banner";
import Tags from "../../Component/Tags/Tags";

import { useAuthContext } from "../../Hooks/useAuthContext";

import stylesHome from "./Home.module.css";

import YourArticle from "../../Component/Your Article/YourArticle";
import GlobalArticle from "../../Component/Global Article/GlobalArticle";

const Home: React.FC = (): ReactElement => {
  const [component, setComponent] = useState<any>("your-feed");
  const [active, setActive] = useState(true);

  //@ts-ignore
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      showFeedOnLogout("global-feed");
    } else {
      handleArticleChange("your-feed");
    }
  }, []);

  const handleArticleChange = (components: any) => {
    setComponent(components);
  };

  const showFeedOnLogout = (id: any) => {
    setComponent(id);
  };

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
                  className={
                    component === "your-feed"
                      ? stylesHome["alt-btn"]
                      : stylesHome.btn
                  }
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
            </div>
          </div>
          <Tags />
        </>
      )}
    </>
  );
};

export default Home;
