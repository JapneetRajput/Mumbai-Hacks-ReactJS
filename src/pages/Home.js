import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { profileUser } from "../api/service";
import Axios from "axios";
import Chatbot from "../components/Chatbot";
import Slider from "../components/slider";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function notifysuccess() {
  toast.success("Liked");
}
function notifyerror() {
  toast.error("Disiked");
}

const Home = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const [lati, setLati] = useState();
  const [long, setLong] = useState();
  const [distances, setDistances] = useState([]);
  const [distance, setDistance] = useState(0);
  let api_key = process.env.REACT_APP_REVGEO_API;
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

  const getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLati(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
    else{
      console.log('nahi hori location');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance.toFixed(2); // Return distance rounded to 2 decimal places
  };

  const toRadians = (angle) => {
    return angle * (Math.PI / 180);
  };
  
  const calculateRadius = () => {
    // let distarr = [];
    if(posts && lati && long){


      const updatedPosts = posts.map(post => ({
        ...post,
        distance: calculateDistance(post.lat, post.lng, lati, long), // You need to implement this function
      }));
      setPosts(updatedPosts);

      // posts.map(({lat, lng}) => {
      //   console.log(lat, lng, lati, long);
      //   // distarr.push(calculateDistance(lat, lng, lati, long));
      //   setDistances((prevDistances) => [...prevDistances, calculateDistance(lat, lng, lati, long)])
      //   console.log('distance');
      //   console.log(calculateDistance(lat, lng, lati, long));
      // });
    }
    // console.log(distances);
    // setDistances(distarr);
  };
  useEffect(() => {
    console.log(distances);
  }, [distances])

  useEffect(() => {
    console.log(posts);
  }, [posts])

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
useEffect(()=>{
  profileInit();
}, []);

  useEffect(() => {
    calculateRadius();
    getLocation();
  }, [lati, long]);

  useEffect(() => {
    // window.location.reload();
    console.log("middle");
  }, [distance])

  
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
      <div className="pt-24 bg-[#0D1117]">
        <Chatbot/>
        <Carousel />
        <div className="pt-24 bg-[#010409] flex flex-wrap justify-center ">
          {posts && 
            posts.map((post) => (
              post.distance<5 &&
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
                      onClick={() => {handleLike(post._id); notifysuccess();}}
                      className="shadow-none  text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 mr-4  hover:bg-[#2ea043] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {post.likes.length}
                        <FaRegThumbsUp size={25} />
                      </div>
                    </button>
                   
                    <Toaster
                      position="top-center"
                      reverseOrder={true}
                    />
                    <button
                      onClick={() => {handleDislike(post._id); notifyerror();}}
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
        <Services />
        {/* <Slider distance={distance} setDistance={setDistance}/> */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
