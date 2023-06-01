import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import { profileUser } from "../api/service";
import Axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";

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
      <div className="pt-24">
        <div className="flex flex-row ">
          {posts &&
            posts.map(({ title, description, lat, lng, image, _id }) => (
              <div
                style={{ marginLeft: "5%", marginRight: "5%" }}
                className="sm:w-1/4 rounded overflow-hidden shadow-md"
              >
                <img src={`${image}`} alt="" className="w-full" />
                <div className="px-6 py-4 ">
                  <div className="font-semibold text-black text-xl mb-2">
                    Title : {title}
                    <br />
                    Description : {description}
                    <br />
                    Lat : {lat} &nbsp; Lng : {lng}
                    <br />
                    Created by : {_id}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Carousel/>
       
        <button
          className="fixed right-0 bottom-0 m-8 text-md shadow-none"
          onClick={() => navigate("/addPost")}
        >
          <AiFillPlusCircle className="w-12 h-12 sm:w-16 sm:h-16" />
        </button>
        
      </div>
    </>
  );
};

export default Home;
