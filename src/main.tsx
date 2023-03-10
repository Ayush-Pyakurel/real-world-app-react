import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { LoginContexProvider } from "./Context/LoginContext";

//react query import
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoginContexProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </LoginContexProvider>
  </React.StrictMode>
);
