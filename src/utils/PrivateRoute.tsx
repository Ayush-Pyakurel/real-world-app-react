import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes: FC = () => {
  let auth = localStorage.getItem("Token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
