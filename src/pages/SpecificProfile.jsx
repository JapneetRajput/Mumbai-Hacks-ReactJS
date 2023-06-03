import React, { useEffect, useState } from "react";
import { profileUser } from "../api/service";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getPost } from "../api/service"
import { useNavigate } from "react-router";

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
    getPost(id).then((req,res) => {
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
  }

  useEffect(() => {
    postInit(id);
  }, [])

  return (
    <>
      <Navbar />
      <div className="pt-32 w-5/6 sm:w-2/3 flex flex-col m-auto items-center">
        
        <h1 className="text-xl text-center">Title : {title}</h1>
        <h1 className="text-xl text-center">Description : {description}</h1>
        <img src={`${image}`} alt="" className=" self-center rounded-t-lg object-contain w-40 h-40 md:rounded-none md:rounded-l-lg inline" />
        <h1 className="text-xl text-center">Likes : {likes}</h1>
        <h1 className="text-xl text-center">Dislikes : {dislikes}</h1>
        <h1 className="text-xl text-center">City : {city}</h1>
        <h1 className="text-xl text-center">State : {state}</h1>
        <h1 className="text-xl text-center">Country_code : {country}</h1>
        <h1 className="text-xl text-center">Category : {category}</h1>
        <h1 className="text-xl text-center">Created on : {created}</h1>
        <h1 className="text-xl text-center">Last Updated on : {updated}</h1>
      </div>
    </>
  );
};

export default SpecificProfile;
