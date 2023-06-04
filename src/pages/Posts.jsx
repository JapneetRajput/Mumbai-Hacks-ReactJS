import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Axios from "axios";
import { useNavigate } from "react-router";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";
import {
  getPostsByCategories,
  getPostsByCities,
  getPostsByCountries,
  getPostsByStates,
  profileUser,
} from "../api/service";
import { AiFillPlusCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

function notifysuccess() {
  toast.success("Liked");
}
function notifyerror() {
  toast.error("Disiked");
}

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
  const [fixedPosts, setFixedPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [cities, setCities] = useState();
  const [states, setStates] = useState();
  const [countries, setCountries] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/posts/", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setFixedPosts(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
    profileInit();
  }, []);

  useEffect(() => {
    if (fixedPosts) {
      getByCategory();
    }
  }, [fixedPosts]);

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

  const getByCategory = () => {
    if (fixedPosts) {
      const cities = new Set();
      const states = new Set();
      const countries = new Set();
      const categories = new Set();
      fixedPosts.map(({ city, state, country, category }) => {
        cities.add(city);
        states.add(state);
        countries.add(country);
        categories.add(category);
      });
      // console.log(cities, states, countries, categories);
      setCities(cities);
      setStates(states);
      setCountries(countries);
      setCategories(categories);
    }
  };

  const [cityState, setCityState] = useState("");

  useEffect(() => {
    if (cityState !== "") {
      getPostsByCities(cityState)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [cityState]);

  const handleCityChange = (e) => {
    const citySt = e.target.value;
    console.log(citySt);
    setCityState(citySt);
  };

  const [categoryState, setCategoryState] = useState("");

  useEffect(() => {
    if (categoryState !== "") {
      getPostsByCategories(categoryState)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [categoryState]);

  const handleCategoryChange = (e) => {
    const categorySt = e.target.value;
    console.log(categorySt);
    setCategoryState(categorySt);
  };

  const [sutateState, setSutateState] = useState("");

  useEffect(() => {
    if (sutateState !== "") {
      getPostsByStates(sutateState)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [sutateState]);

  const handleSutateChange = (e) => {
    const sutateSt = e.target.value;
    console.log(sutateSt);
    setSutateState(sutateSt);
  };

  const [countryState, setCountryState] = useState("");

  useEffect(() => {
    if (countryState !== "") {
      getPostsByCountries(countryState)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [countryState]);

  const handleCountryChange = (e) => {
    const countrySt = e.target.value;
    console.log(countrySt);
    setCountryState(countrySt);
  };

  return (
    <>
      <Navbar />

      <div>
        <button
          className="fixed right-5 bottom-0  shadow-none text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10 my-4"
          onClick={() => navigate("/addPost")}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AiFillPlusCircle className="w-6 h-6 sm:w-6 sm:h-6 " /> &nbsp;
            Create Post
          </div>
        </button>

        <div className="pt-24 bg-[#010409] flex flex-wrap justify-center ">
          <div className="w-full">
            <div className="relative inline-block h-12 sm:w-1/5 mb-4 w-1/4">
              <select
                value={categoryState}
                onChange={handleCategoryChange}
                className="block appearance-none w-full bg-[#0d1117] border-[#161b22] border-2 text-[#d7dfe7] py-3 px-3 md:px-4 pr-8 rounded-md leading-tight focus:outline-none "
              >
                {categories &&
                  Array.from(categories).map((category) => (
                    <option value={category}>{category}</option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0  flex items-center pr-4 text-white">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="relative inline-block h-12 sm:w-1/5 mb-4 w-1/4">
              <select
                value={cityState}
                onChange={handleCityChange}
                className="block appearance-none w-full bg-[#0d1117] border-[#161b22] border-2 text-[#d7dfe7] py-3 px-3 md:px-4 pr-8 rounded-md leading-tight focus:outline-none "
              >
                {cities &&
                  Array.from(cities).map((city) => (
                    <option value={city}>{city}</option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0  flex items-center pr-4 text-white">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="relative inline-block h-12 sm:w-1/5 mb-4 w-1/4">
              <select
                value={sutateState}
                onChange={handleSutateChange}
                className="block appearance-none w-full bg-[#0d1117] border-[#161b22] border-2 text-[#d7dfe7] py-3 px-3 md:px-4 pr-8 rounded-md leading-tight focus:outline-none "
              >
                {states &&
                  Array.from(states).map((state) => (
                    <option value={state}>{state}</option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0  flex items-center pr-4 text-white">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="relative inline-block h-12 sm:w-1/5 mb-4 w-1/4">
              <select
                value={countryState}
                onChange={handleCountryChange}
                className="block appearance-none w-full bg-[#0d1117] border-[#161b22] border-2 text-[#d7dfe7] py-3 px-3 md:px-4 pr-8 rounded-md leading-tight focus:outline-none "
              >
                {countries &&
                  Array.from(countries).map((country) => (
                    <option value={country}>{country}</option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0  flex items-center pr-4 text-white">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          {posts &&
            posts.map((post) => (
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
                      onClick={() => {
                        handleLike(post._id);
                        notifysuccess();
                      }}
                      className="shadow-none  text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 mr-4  hover:bg-[#2ea043] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {post.likes.length}
                        <FaRegThumbsUp size={25} />
                      </div>
                    </button>

                    <Toaster position="top-center" reverseOrder={true} />
                    <button
                      onClick={() => {
                        handleDislike(post._id);
                        notifyerror();
                      }}
                      className="shadow-none  text-[#d7dfe7] bg-[#7e1f1f] font-bold py-2 px-4 hover:bg-[#a02e2e] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {post.dislikes.length}
                        <FaRegThumbsDown size={25} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          className="fixed right-5 bottom-0  shadow-none text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10 my-4"
          onClick={() => navigate("/addpost")}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AiFillPlusCircle className="w-6 h-6 sm:w-6 sm:h-6 " /> &nbsp;
            Create Post
          </div>
        </button>
        <Footer />
      </div>
    </>
  );
};

export default Posts;
