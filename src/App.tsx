import "./App.css";

//pages imports
import Login from "./Pages/login/Login";
import Signup from "./Pages/SignUp/Signup";
import Home from "./Pages/Home/Home";

//react router import
import { Route, Routes } from "react-router-dom";

//component import
import NavBar from "./Component/NavBar/NavBar";
import { useState } from "react";

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
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login toggles={toggle} username={setUsername} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
