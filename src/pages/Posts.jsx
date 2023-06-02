import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Axios from "axios";
import { useNavigate } from "react-router";
import { profileUser } from "../api/service";
import {FaThumbsUp, FaThumbsDown} from "react-icons/fa";
const Posts = () => {
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
    Axios.get("https://mumbai-hacks-express.vercel.app/api/posts/", {
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
      <div>
      <div className="pt-24 bg-[#010409] flex flex-wrap justify-center	">
          {posts &&
            posts.map(({ title, description, lat, lng, image, _id }) => (
              <div className="w-86 self-center pt-10  bg-[#0D1117] border-2 border-[#272e38] hover:border-[#bfc1c4] rounded-lg shadow  hover:bg-[#0d1117] cursor-pointer  mb-5 ml-2 mr-2">
              <div
                style={{ marginLeft: "5%", marginRight: "5%", alignItems: "center" }}
                className=" rounded overflow-hidden shadow-md self-center"
              >
                <img src={`${image}`} alt="" className=" self-center rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg inline" />
                <div className="px-6 py-4 ">
                  <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl font-semibold uppercase tracking-tight text-white"> Title : {title}</h5>
                    <br />
                    <p class="mb-3 font-medium text-[#c9d1d9]">Description : {description}
                    <br />
                    Lat : {lat} &nbsp; Lng : {lng}
                    <br />
                    Created by : {_id}
                    </p>
                  </div>
                  <button onClick={() => navigate("/posts")} className=" shadow-none  text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 mr-4  hover:bg-[#2ea043] rounded-xl w-16 h-10 my-4" > 
                  <div style={{display: "flex", justifyContent: "center" }}>
                    <FaThumbsUp size={25}/>
                  </div>
                  </button>

                  <button onClick={() => navigate("/posts")} className=" shadow-none  text-[#d7dfe7] bg-[#7e1f1f] font-bold py-2 px-4 hover:bg-[#a02e2e] rounded-xl w-16 h-10 my-4" > 
                  <div style={{display: "flex", justifyContent: "center" }}>
                    <FaThumbsDown size={25}/>
                  </div>
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
        <Footer/>
      </div>
    </>
  );
};

export default Posts;
