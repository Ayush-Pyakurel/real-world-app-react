//react import
import { ReactElement, useEffect, useState } from "react";

//component imports
import Banner from "../../Component/Banner/Banner";
import homeStyles from "./Home.module.css";

//axios imports
import axios from "axios";

//react router import
import { NavLink } from "react-router-dom";

interface booleanProps {
  loggedin: boolean;
}

interface navLinks {
  activeClassName: string;
}

const Home: React.FC<booleanProps> = ({ loggedin }): ReactElement => {
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
    <>
      {!loggedin ? (
        <Banner />
      ) : (
        <div className={homeStyles.container}>
          <div className={homeStyles.line}>
            <div className={homeStyles["sub-menu"]}>
              <NavLink
                to="#"
                style={({ isActive }) => {
                  return isActive ? { color: "#5cb85c" } : {};
                }}
              >
                Your Feed
              </NavLink>
              <NavLink
                to="#"
                style={({ isActive }) => ({
                  color: isActive ? "#5cb85c" : "black",
                })}
              >
                Global Feed
              </NavLink>
            </div>
          </div>
          <div className={homeStyles.articles}>
            <span>No article are here... yet</span>
          </div>
          <div className={homeStyles.tags}>
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
      )}
    </>
  );
};

export default Home;
