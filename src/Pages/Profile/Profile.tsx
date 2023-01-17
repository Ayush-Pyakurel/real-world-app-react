import axios from "axios";
import { useEffect, useState, FC, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyArticles from "../../Component/My Articles/MyArticles";

import styleProfile from "./Profile.module.css";
import FavoritedArticles from "../../Component/Favorited Articles/FavoritedArticles";

export interface IProfile {
  profile: { username: string; bio: string; image: string; follow: boolean };
}

const initialProfileState = {
  profile: {
    bio: "",
    follow: false,
    image: "",
    username: "",
  },
};

const Profile: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [component, setComponent] = useState();
  const [profile, setProfile] = useState<IProfile>(initialProfileState);

  const email = JSON.parse(localStorage.getItem("user") || "{}");
 

  useEffect(() => {
    axios
      .get<IProfile>(`https://api.realworld.io/api/profiles/${username}`)
      .then((response) => {
        setProfile(response.data);
      });
  }, []);

  const handleRedirectionToSettings = () => {
   return navigate("/settings", {
     state: {
       image: profile?.profile?.image,
       username: profile?.profile?.username,
       bio: profile?.profile?.bio,
       email: email.user.email,
     },
   });
  };

  const handleClick = (component: any) => {
    setComponent(component);
  };

  return (
    <>
      <section className={styleProfile["banner-wrapper"]}>
        <img src={profile?.profile?.image} alt="user-profile-image" />
        <h3 className={styleProfile.username}>{profile?.profile?.username}</h3>
        <span className={styleProfile.bio}>{profile?.profile?.bio}</span>
        <div className={styleProfile["btn-wrapper"]}>
          <button
            className={styleProfile.btn}
            onClick={handleRedirectionToSettings}
          >
            Edit Profile Settings
          </button>
        </div>
      </section>
      <section className={styleProfile["article-wrapper"]}>
        <div className={styleProfile.line}>
          <div className={styleProfile["sub-menu"]}>
            <button
              className={styleProfile["menu-btn"]}
              onClick={() => handleClick("my-article")}
            >
              My Articles
            </button>
            <button
              className={styleProfile["menu-btn"]}
              onClick={() => handleClick("favorited-articles")}
            >
              Favorited Articles
            </button>
          </div>
        </div>
      </section>
      {component === "favorited-articles" ? (
        <FavoritedArticles />
      ) : (
        <MyArticles />
      )}
    </>
  );
};

export default Profile;
