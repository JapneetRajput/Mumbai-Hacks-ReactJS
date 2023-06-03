import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Axios from "axios";
import { useNavigate } from "react-router";
import { profileUser } from "../api/service";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";

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
          className="fixed right-0 bottom-0 m-8 text-md shadow-none"
          onClick={() => navigate("/addPost")}
        >
          <AiFillPlusCircle className="w-12 h-12 sm:w-16 sm:h-16 invert" />
        </button>
      <div className="pt-24 bg-[#010409] flex flex-wrap justify-center ">
          {posts &&
            posts.map((post) => (
              <div className="w-86 self-center pt-10 bg-[#0D1117] border-2 border-[#272e38]  rounded-lg shadow   cursor-pointer  mb-5 ml-2 mr-2 hover:-translate-y-1 hover:scale-90 hover:bg-[#212833] duration-300">
              <div
                key={post._id}
                className="w-86 self-center pt-10  bg-[#0D1117] border-2 border-[#272e38] hover:border-[#bfc1c4] rounded-lg shadow  hover:bg-[#0d1117] cursor-pointer  mb-5 ml-2 mr-2"
              >
                <div
                  style={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    alignItems: "center",
                  }}
                  className=" rounded overflow-hidden shadow-md self-center"
                >
                  <img
                    src={`${post.image}`}
                    alt=""
                    className=" self-center rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg inline"
                  />
                  <div className="px-6 py-4 ">
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-semibold uppercase tracking-tight text-white">
                        Title: {post.title}
                      </h5>
                      <br />
                      <p className="mb-3 font-medium text-[#c9d1d9]">
                        Description: {post.description}
                        <br />
                        Lat: {post.lat} &nbsp; Lng: {post.lng}
                        <br />
                        Created by: {post._id}
                        <p className="mb-3 font-medium text-[#c9d1d9]">
                          <br />
                        </p>
                      </p>
                    </div>
                    <button
                      onClick={() => handleLike(post._id)}
                      className="shadow-none  text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 mr-4  hover:bg-[#2ea043] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {post.likes.length}
                        <FaThumbsUp size={25} />
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
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          className="fixed right-0 bottom-0 m-8 text-md shadow-none"
          onClick={() => navigate("/addPost")}
        >
          <AiFillPlusCircle className="w-12 h-12 text-white sm:w-16 sm:h-16" />
        </button>
        <Footer />
      </div>
    </>
  );
};

export default Posts;
