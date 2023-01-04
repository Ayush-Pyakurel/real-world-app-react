import './App.css';

//pages imports
import Login from './Pages/login/Login';
import Signup from './Pages/SignUp/Signup';
import Home from './Pages/Home/Home';
import NewArticle from './Pages/New-Article/newArticle';
import Settings from './Pages/Setting-page/Settings';
import Article from './Pages/Article/Article';
import Profile from './Pages/Profile/Profile';

//react router import
import { Route, Routes } from 'react-router-dom';

//component import
import NavBar from './Component/NavBar/NavBar';
import YourArticle from './Component/Your Article/YourArticle';
import GlobalArticle from './Component/Global Article/GlobalArticle';

//login auth context import
import { useAuthContext } from './Hooks/useAuthContext';
import PrivateRoutes from './utils/PrivateRoute';

function App() {
  //@ts-ignore
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path='settings' element={<Settings />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/create-article' element={<NewArticle />} />
        </Route>
        <Route path='/article' />
        <Route path='*' element='Page Not Found' />
        {/* <Route path="global-feed" element={<GlobalArticle />} />
          <Route path="your-feed" element={<YourArticle />} /> */}
      </Routes>
    </>
  );
}

export default App;
