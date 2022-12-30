//react import
import { ReactElement, useContext, useEffect, useState } from "react";

//component imports
import Banner from "../../Component/Banner/Banner";
import Tags from "../../Component/Tags/Tags";
import Article from "../Article/Article";

import { useAuthContext } from "../../Hooks/useAuthContext";

//react router import
// import { NavLink, Outlet } from "react-router-dom";

interface navLinks {
  activeClassName: string;
}

const Home: React.FC = (): ReactElement => {
  //@ts-ignore

  const { isLoggedIn, user } = useAuthContext();
  console.log(user, isLoggedIn, "state");
  // const onGlobalFeedClick = () => {
  //   return <Article />;
  // };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Banner />
        </>
      ) : (
        <>
          <Article />
        </>
      )}
    </>
  );
};

export default Home;
