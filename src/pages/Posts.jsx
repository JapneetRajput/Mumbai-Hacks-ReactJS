import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Axios from "axios";
import { useNavigate } from "react-router";
import { profileUser } from "../api/service";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsArrowUpCircle, BsArrowUpCircleFill, BsArrowDownCircle, BsArrowDownCircleFill } from "react-icons/bs";
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
      <div>
      <button
          className="fixed right-5 bottom-0  shadow-none text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10 my-4"
          onClick={() => navigate("/addpost")}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
          <AiFillPlusCircle className="w-6 h-6 sm:w-6 sm:h-6 " /> &nbsp; Create Post
          </div>
        </button>

      <div className="pt-24 bg-[#010409] flex flex-wrap justify-center ">
          {posts &&
            posts.map(({ title, city, state, country, category, description, lat, lng, image, _id }) => (
              <div className="w-86 self-center pt-10 bg-[#0D1117] border-2 border-[#272e38]  rounded-lg shadow   cursor-pointer  mb-5 ml-2 mr-2 hover:-translate-y-1 hover:scale-90 hover:bg-[#212833] duration-300">
              <div
                style={{ marginLeft: "5%", marginRight: "5%", alignItems: "center" }}
                className=" rounded overflow-hidden shadow-md self-center "
              >
                <img src={`${image}`} alt="" className=" self-center rounded-t-lg object-contain w-40 h-40 md:rounded-none md:rounded-l-lg inline" />
                <div className="px-6 py-4 ">
                  <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl font-semibold uppercase tracking-tight text-white"> Title : {title}</h5>
                    <br />
                    <p class="mb-3 font-medium text-[#c9d1d9]">Description : {description}
                    <br /> {category}
                    <br/>
                    Lat : {lat} <br/> Lng : {lng} <br/>
                    City: {city} <br/>
                    State: {state} <br/>
                    Country: {country} 
                    <br />
                    Created by : {_id}
                    </p>
                  </div>
                 

 
    <input type="radio" name="hs-radio-group" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-1" checked/>
    <label for="hs-radio-group-1" class="text-sm text-gray-500 ml-2 dark:text-gray-400">
    <div style={{display: "flex", justifyContent: "center" }}>
                    <BsArrowUpCircle size={25}/>
                  </div>
    </label>
    <input type="radio" name="hs-radio-group" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-1" checked/>
    <label for="hs-radio-group-1" class="text-sm text-gray-500 ml-2 dark:text-gray-400">
    <div style={{display: "flex", justifyContent: "center" }}>
                    <BsArrowDownCircle size={25}/>
                  </div>
    </label>
                  </div>
                </div>
                
              </div>
            ))}
            
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Posts;