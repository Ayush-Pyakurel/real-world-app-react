//react import
import { ReactElement, useEffect, useState } from "react";

//component imports
import Banner from "../../Component/Banner/Banner";
import Tags from "../../Component/Tags/Tags";
import Article from "../Article/Article";
//axios imports
import axios from "axios";

//react router import
// import { NavLink, Outlet } from "react-router-dom";

interface booleanProps {
  loggedin: boolean;
}

interface navLinks {
  activeClassName: string;
}

const Home: React.FC<booleanProps> = ({ loggedin }): ReactElement => {
  // const onGlobalFeedClick = () => {
  //   return <Article />;
  // };

  return (
    <>
      {!loggedin ? (
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
