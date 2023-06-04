import React, { useEffect, useState } from "react";
import { profileUser } from "../api/service";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getPost } from "../api/service";
import { useNavigate } from "react-router";
import { FaThumbsUp, FaThumbsDown, FaCity, FaFlag } from "react-icons/fa";
import { MdCategory, MdTimer } from "react-icons/md";
import Footer from "../components/Footer"

const SpecificProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");

  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log(id);
  const profileInit = () => {
    profileUser(token).then((req, res) => {
      console.log(req.data);
      if (req.data.status !== "failed") {
        console.log(req.data);
        setName(req.data.userValidation.name);
        setEmail(req.data.userValidation.email);
        setMobile(req.data.userValidation.mobile);
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    profileInit();
  }, []);

  const postInit = (id) => {
    getPost(id).then((req, res) => {
      console.log(req.data.likes);
      setTitle(req.data.title);
      setDescription(req.data.description);
      setImage(req.data.image);
      setCity(req.data.city);
      setState(req.data.state);
      setCountry(req.data.country);
      setCategory(req.data.category);
      setLikes(req.data.likes.length);
      setDislikes(req.data.dislikes.length);
      setCreated(req.data.createdAt);
      setUpdated(req.data.updatedAt);
    });
  };

  useEffect(() => {
    postInit(id);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#010409] ">
        <div className="bg-[#161B22] pt-32 lg:w-[80%] sm:w-2/3 flex flex-col m-auto items-center">
          <img
            src={`${image}`}
            alt=""
            className=" self-center rounded-t-lg object-contain w-full  h-40 md:rounded-none md:rounded-l-lg inline"
          />

          <h1 className="text-2xl font-bold text-center mb-3 text-white uppercase">
            Title : <span className="text-[#2e49a0]">{title}</span> 
          </h1>
          <h1 className=" font-semibold p-10 bg-[#0D1117] bg-opacity-70 backdrop-filter backdrop-blur-lg text-[#c9d1d9]">
            Description : {description} <br/> 
            <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#2ea043] border-2 rounded-xl w-52 h-14 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <FaThumbsUp size={25} /> &nbsp;
                Likes : {likes}
              </div>
            </button>
            <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#a02e2e] border-2 rounded-xl w-52 h-14 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <FaThumbsDown size={25} /> &nbsp;
                Dislikes : {dislikes} 
              </div>
            </button>
            
            <br />
            <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#2e49a0] border-2 rounded-xl w-64 h-14 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <FaCity size={25} /> &nbsp;
                City : {city} 
              </div>
            </button>
            <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#2e49a0] border-2 rounded-xl w-64 h-14 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <FaCity size={25} /> &nbsp;
                State : {state}
              </div>
            </button>
             <br />
             <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#2e49a0] border-2 rounded-xl w-64 h-14 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <FaFlag size={25} /> &nbsp;
                Country_code : {country}
              </div>
            </button>
             <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#2e49a0] border-2 rounded-xl w-64 h-14 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <MdCategory size={25} /> &nbsp;
                Category : {category}
              </div>
            </button>
             <br />
             <button className=" shadow-none text-[#d7dfe7] bg-transparent font-bold py-2 px-4 mr-4  hover:border-[#2e49a0] border-2 rounded-xl w-96 h-24 my-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <MdTimer size={25} /> &nbsp;
                Created on : {created} <br />Last Updated on : {updated}
              </div>
            </button>
            
          </h1>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SpecificProfile;
