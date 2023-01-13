import "./App.css";

//pages imports
import Login from "./Pages/login/Login";
import Signup from "./Pages/SignUp/Signup";
import Home from "./Pages/Home/Home";
import NewArticle from "./Pages/New-Article/newArticle";
import Settings from "./Pages/Setting-page/Settings";
import Article from "./Pages/Article/Article";
import Profile from "./Pages/Profile/Profile";

//react router import
import { Route, Routes } from "react-router-dom";

//component import
import NavBar from "./Component/NavBar/NavBar";


//private route import
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="settings" element={<Settings />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/create-article" element={<NewArticle />} />
          <Route path="/article/:slug" element={<Article />} />
        </Route>

        {/* Page not found */}
        <Route path="*" element="Page Not Found" />
      </Routes>
    </>
  );
}

export default App;
