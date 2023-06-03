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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/posts/", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
    profileInit();
  }, []);
  const handleLike = async (postId) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/like`,
        null,
        {
          headers: {
            authorization: token,
          },
        }
      );

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: response.data.likes };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDislike = async (postId) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/dislike`,
        null,
        {
          headers: {
            authorization: token,
          },
        }
      );

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, dislikes: response.data.dislikes };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };
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
            posts.map((post) => (
              <div
                key={post._id}
                className="w-86 self-center pt-10  bg-[#0D1117] border-2 border-[#272e38] hover:border-[#bfc1c4] rounded-lg shadow  hover:bg-[#0d1117] cursor-pointer  mb-5 ml-2 mr-2"
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


                  
                  {/* <button onClick={() => navigate("/posts")} className=" shadow-none  text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 mr-4  hover:bg-[#2ea043] rounded-xl w-16 h-10 my-4" > 
                  <div style={{display: "flex", justifyContent: "center" }}>
                    <BsArrowUpCircle size={25}/>
                  </div>
                  </button>

                    <button
                      onClick={() => handleDislike(post._id)}
                      className="shadow-none  text-[#d7dfe7] bg-[#7e1f1f] font-bold py-2 px-4 hover:bg-[#a02e2e] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {post.dislikes.length}
                        <FaThumbsDown size={25} />
                      </div>
                    </button> */}
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
