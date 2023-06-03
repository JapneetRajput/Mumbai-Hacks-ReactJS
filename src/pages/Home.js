import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { profileUser } from "../api/service";
import Axios from "axios";

const Home = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const profileInit = () => {
    profileUser(token).then((req, res) => {
      console.log(req.data);
      if (req.data.status !== "failed") {
        console.log(req.data);
      } else {
        navigate("/");
      }
    });
  };

  const [posts, setPosts] = useState();

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/posts/", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    profileInit();
  }, []);
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-[#0D1117]">
        <Carousel/>
       
        {/* <button
          className="fixed right-0 bottom-0 m-8 text-md shadow-none"
          onClick={() => navigate("/addPost")}
        >
          <AiFillPlusCircle className="w-12 h-12 sm:w-16 sm:h-16" />
        </button> */}
        <Services/>

        <Footer/>
      </div>
    </>
  );
};

export default Home;
