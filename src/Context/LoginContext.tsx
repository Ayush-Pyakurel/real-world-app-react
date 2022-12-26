import { createContext, useReducer, ReactNode, useEffect } from "react";

type LoginContexContextProps = {
  children: ReactNode;
};

export const loginContext = createContext({});

export const loginReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isLoggedIn: true };

    default:
      return state;
  }
};

export const LoginContexProvider = ({ children }: any) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(loginReducer, {
    user: null,
    isLoggedIn: false,
  });
  //@ts-ignore
  useEffect(() => {
    dispatch({ type: "IS_LOGIN" });
  }, []);

  console.log(state);

  return (
    <loginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </loginContext.Provider>
  );
};
