import { FC, ReactElement } from "react";

import bannerStyles from "./Banner.module.css";

const Banner: FC = (): ReactElement => {
  return (
    <div className={bannerStyles.bannerContainer}>
      <h1>Conduit</h1>
      <span>A place to share your knowledge.</span>
    </div>
  );
};

export default Banner;
