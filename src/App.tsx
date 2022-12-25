import "./App.css";

//pages imports
import Login from "./Pages/login/Login";
import Signup from "./Pages/SignUp/Signup";
import Home from "./Pages/Home/Home";
import NewArticle from "./Pages/New-Article/newArticle";
//react router import
import { Route, Routes } from "react-router-dom";

//component import
import NavBar from "./Component/NavBar/NavBar";
import { useState } from "react";
import Article from "./Pages/Article/Article";

function App() {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const toggle = () => {
    setLoggedin(true);
  };

  return (
    <>
      <NavBar logStatus={loggedin} username={username} />
      <Routes>
        <Route path="/" element={<Home loggedin={loggedin} />} />
        <Route
          path="/login"
          element={<Login toggles={toggle} username={setUsername} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-article" element={<NewArticle />} />
        <Route path="/article/feed" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
