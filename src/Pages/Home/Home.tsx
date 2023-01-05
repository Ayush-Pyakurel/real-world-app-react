//react import
import { ReactElement, useContext, useEffect, useState } from 'react';

//component imports
import Banner from '../../Component/Banner/Banner';
import Tags from '../../Component/Tags/Tags';
import Article from '../Article/Article';

import { useAuthContext } from '../../Hooks/useAuthContext';

import stylesHome from './Home.module.css';
import { NavLink } from 'react-router-dom';

//react router import
// import { NavLink, Outlet } from "react-router-dom";

import YourArticle from '../../Component/Your Article/YourArticle';
import GlobalArticle from '../../Component/Global Article/GlobalArticle';

interface navLinks {
  activeClassName: string;
}

const Home: React.FC = (): ReactElement => {
  const [component, setComponent] = useState<any>();

  //@ts-ignore
  const { isLoggedIn, user } = useAuthContext();

  const handleChange = (id: any) => {
    setComponent(id);
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Banner />
          <div
            className={
              !isLoggedIn ? stylesHome['out-container'] : stylesHome.container
            }
          >
            <div className={stylesHome.line}>
              <div className={stylesHome['sub-menu']}>
                <button
                  className={stylesHome.btn}
                  onClick={() => handleChange('global-feed')}
                >
                  Global Feed
                </button>
              </div>
            </div>
            <div className={stylesHome.articles}>
              {component === 'global-feed' ? <GlobalArticle /> : ''}
            </div>
          </div>
          <Tags />
        </>
      ) : (
        <>
          <div className={stylesHome.container}>
            <div className={stylesHome.line}>
              <div className={stylesHome['sub-menu']}>
                <button
                  className={stylesHome.btn}
                  onClick={() => handleChange('your-feed')}
                >
                  Your Feed
                </button>
                <button
                  className={stylesHome.btn}
                  onClick={() => handleChange('global-feed')}
                >
                  Global Feed
                </button>
              </div>
            </div>
            <div className={stylesHome.articles}>
              {component === 'your-feed' ? <YourArticle /> : <GlobalArticle />}
              {/* <span>No article are here... yet</span> */}
            </div>
          </div>
          <Tags />
        </>
      )}
    </>
  );
};

export default Home;
