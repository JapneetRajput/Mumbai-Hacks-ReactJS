import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router";
import { profileUser, addBlog } from "../api/service";
import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";

const Addblogs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [user_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [loader, setLoader] = useState(false);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  let token = localStorage.getItem("token");
  let api_key = process.env.REACT_APP_REVGEO_API;
  const config = {
    headers: {
      authorization: token,
    },
  };
  

  const profileInit = () => {
    profileUser(token).then((req, res) => {
      
      if(req.data.status !== "failed"){
        console.log(req.data);
        setName(req.data.userValidation.name);
        setEmail(req.data.userValidation.email);
        setMobile(req.data.userValidation.mobile);
        setId(req.data.userValidation._id);
      } else {
        navigate("/blogs");
      }
    });
  };

  const getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        console.log(api_key);
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
    else{
      console.log('nahi hori location');
    }
  };

  useEffect(() => {
    console.log(lat)
    Axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&lang=fr&apiKey=${api_key}`).then((data)=>{
      const resp = data.data.features[0].properties
      setCountry(resp["country_code"]);
      setCity(resp["city"]);
      setStreet(resp["street"]);
      console.log(resp);
    });
    // console.log(data.data);
  }, [lat, long]);


  useEffect(() => {
    profileInit();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);


  const addblog = (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new blog
    console.log(title, description, typeof(street), typeof(city), typeof(country));
    if (title!=="" && description!==""){
      setLoader(false);
      const blog = {
        title: title,
        description: description,
        street: street,
        city: city,
        country: country,
        user_id: user_id,
      };
      setTitle("");
      setDescription("");
      // setStreet("");
      // setCity("");
      // setCountry("");
      console.log(blog);
      addBlog(blog)
      .then((req,res) => {
        console.log(req.data);
        const { status, message } = req.data;
        console.log(status, message);
        if (status === "failed") {
          alert(message);
        } else {
          // alert(message);
          navigate("/blogs");
        }
      })
      .catch((error) => {
        alert("Error in adding blog " + error.message);
      });

    } else{
      setLoader(false);
      alert("All fields are mandatory!");
    }
    
  };

  return (
    <>
      <Navbar />
      <div className="pt-24">Add Blogs</div>
      <form
        onSubmit={addblog}
        className="px-6 py-6 bg-white flex flex-col items-start border mt-12 sm:mt-6 border-[#D9D9D9] border-3px w-5/6 sm:w-1/3 rounded-xl"
      >
        <p className="text-2xl ml-2">Add new Blog</p>
        <TextBox
          text="text-md text-black"
          width="w-full"
          height="h-12"
          hint="Title"
          backgroundColor="bg-white"
          position="left-2 sm:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-8"
          type="text"
          setState={setTitle}
          value={title}
        />
        <TextBox
          text="text-md text-black"
          width="w-full"
          height="h-12"
          hint="Description"
          backgroundColor="bg-white"
          position="left-2 sm:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-6"
          type="text"
          setState={setDescription}
          value={description}
        />
        {/* <TextBox
          text="text-md text-black"
          width="w-full"
          height="h-12"
          hint="Location"
          backgroundColor="bg-white"
          position="left-2 sm:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-6"
          type="text"
          setState={setLocation}
          value={location}
        /> */}
        <button
          type="submit"
          className="w-full mb-4 text-white hover:text-[#2E0052] hover:border-[#2E0052] hover:border bg-[#2E0052] hover:bg-white rounded-lg h-12 mt-4"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Addblogs;