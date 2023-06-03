import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { profileUser, addBlog, updateBlog, getBlog } from "../api/service";
import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";

const Editblogs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [user_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);

  let token = localStorage.getItem("token");
  let api_key = process.env.REACT_APP_REVGEO_API;
  const config = {
    headers: {
      authorization: token,
    },
  };
  const location = useLocation();
  const blog_id = location.state.myProp._id;
  

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

  const blogInit = () => {
    getBlog(blog_id).then((req, res) => {
      
      if(req.data.status !== "failed"){
        console.log('blog Init');
        console.log(req.data);
        setTitle(req.data.title);
        setDescription(req.data.description);
      } else {
        navigate("/blogs");
      }
    });
  };

  useEffect(() => {
    profileInit();
  }, []);

  useEffect(() => {
    blogInit();
  }, []);


  const updateblog = (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new blog
    console.log(title, description);
    if (title!=="" || description!==""){
      setLoader(false);
      const blog = {
        title: title,
        description: description,
      }
      setTitle("");
      setDescription("");
      console.log(blog);
      updateBlog(blog, blog_id)
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
      <div className="pt-24">Update Blog</div>
      <form
        onSubmit={updateblog}
        className="px-6 py-6 bg-white flex flex-col items-start border mt-12 sm:mt-6 border-[#D9D9D9] border-3px w-5/6 sm:w-1/3 rounded-xl"
      >
        {/* <p className="text-2xl ml-2">Add new Blog</p> */}
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
          Update
        </button>
      </form>
    </>
  );
};

export default Editblogs;