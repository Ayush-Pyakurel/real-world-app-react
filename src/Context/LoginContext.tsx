import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";

type LoginContexContextProps = {
  children: ReactNode;
};

export const loginContext = createContext({});

export const loginReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state, user: action.payload, isLoggedIn: true })
      );
      return { ...state, user: action.payload, isLoggedIn: true };
    case "STORED":
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      return {
        ...state,
        user: stored.user,
        isLoggedIn: localStorage.getItem("user") ? true : false,
      };
    default:
      return state;
  }
};

export const LoginContexProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(loginReducer, {
    user: null,
    isLoggedIn: false,
  });

  //on every render STORED action is dispatched
  useEffect(() => {
    dispatch({ type: "STORED" });
  }, []);

  return (
    <loginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </loginContext.Provider>
  );
};
