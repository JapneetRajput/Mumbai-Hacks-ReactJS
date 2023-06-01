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

        <div class="p-20 bg-orange-200">
          <h3 class="text-orange-400 font-bold mb-4 text-3xl">SERVICES</h3>
          <div class="bg-white rounded-lg shadow-2xl md:flex">
            <img src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8" class="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
            <div class="p-6">
              <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Bombay Ballot</h2>
              <p class="text-orange-700">
              et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc
              </p>
              <button className="text-white bg-orange-400 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-gray-400 rounded h-14 w-48  my-4"
          type="submit" onClick="/addpost">
             <div style={{display: "flex", justifyContent: "center" }}>
          Enroll Here
        </div>
        </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
