import { useContext } from "react";
import { loginContext } from "../Context/LoginContext";

export const useAuthContext = () => {
  const context = useContext(loginContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be inside the scope of AuthContextProvider!"
    );
  }

  return context;
};
