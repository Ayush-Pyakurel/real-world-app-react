import axios from "axios";
import React, { useEffect, useState, FC, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styleProfile from "./Profile.module.css";

const Profile: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [profile, setProfile] = useState({
    bio: "",
    follow: false,
    image: "",
    username: "",
  });

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/profiles/${username}`)
      .then((response) => {
        setProfile((prev): any => {
          return {
            ...prev,
            bio: response.data.profile.bio,
            follow: response.data.profile.follow,
            image: response.data.profile.image,
            username: response.data.profile.username,
          };
        });
      });
  }, []);

  const handleRedirectionToSettings = () => {
    navigate("/settings");
  };

  return (
    <section className={styleProfile["banner-wrapper"]}>
      <img src={profile.image} alt="user-profile-image" />
      <h3 className={styleProfile.username}>{profile.username}</h3>
      <span className={styleProfile.bio}>{profile.bio}</span>
      <div className={styleProfile["btn-wrapper"]}>
        <button
          className={styleProfile.btn}
          onClick={handleRedirectionToSettings}
        >
          Edit Profile Settings
        </button>
      </div>
    </section>
  );
};

export default Profile;
