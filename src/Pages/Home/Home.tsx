import { useEffect, useState } from "react";
import Banner from "../../Component/Banner/Banner";

import homeStyles from "./Home.module.css";

import axios from "axios";

const Home = () => {
  const [tag, setTags] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // axios.get("https://api.realworld.io/api/tags").then((response) => {
  //   //setTags(response.data.tags);
  // });

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
      <Banner />
      <div>
        <h1>Home</h1>
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
    </>
  );
};

export default Home;
