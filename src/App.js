import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
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

const Privateroute = () => {
  const auth = localStorage.getItem("token");
  const { userAuth } = useContext(AuthContext);
  return <>{userAuth || auth ? <Outlet /> : <Navigate replace to={"/"} />}</>;
};

const LocationContext = createContext();
function App() {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);
  return (
    <div className="App">
      <LocationContext.Provider value={location}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Privateroute />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/home" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile />} />
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
