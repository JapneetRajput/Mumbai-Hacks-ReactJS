import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SpecificProfile from "./pages/SpecificProfile";
import Blogs from "./pages/Blogs";
import Addblogs from "./pages/Addblogs";
import Editblogs from "./pages/Editblogs";
import Logout from "./pages/Logout";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/UserContext";
import Error404 from "./pages/Error404";
import AddPost from "./pages/AddPost";
import Posts from "./pages/Posts";
import Chat from "./pages/Chat";
import Maps from "./pages/Maps";
import Trending from "./pages/Trending";

const Privateroute = () => {
  const auth = localStorage.getItem("token");
  const { userAuth } = useContext(AuthContext);
  return <>{userAuth || auth ? <Outlet /> : <Navigate replace to={"/"} />}</>;
};

const LocationContext = createContext();
function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);
  return (
    <div className="App">
      <LocationContext.Provider latitude={latitude} longitude={longitude}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Privateroute />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/home" element={<Home />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts/:id" element={<SpecificProfile />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<Addblogs />} />
            <Route path="/blogs/edit" element={<Editblogs />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addPost" element={<AddPost />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </LocationContext.Provider>
    </div>
  );
}

export default App;
