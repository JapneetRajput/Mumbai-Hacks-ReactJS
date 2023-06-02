import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { profileUser, getBlogs, getBlog } from "../api/service";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

const Blogs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userid, setId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState([]);

  let token = localStorage.getItem("token");

  const profileInit = () => {
    profileUser(token).then((req, res) => {
      if(req.data.status !== "failed"){
        console.log(req.data);
        setName(req.data.userValidation.name);
        setEmail(req.data.userValidation.email);
        setMobile(req.data.userValidation.mobile);
        setId(req.data.userValidation._id); 
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    profileInit();
  }, []);
  
  
  

  useEffect(() => {
    getBlogs()
    .then((req, res) => {
      //console.log(req.data);
      const newblogs = Object.values(req.data);
      //console.log(newblogs, typeof(newblogs));
      setBlogs(newblogs);
  }
  );
  });

  const editbutton = (id) => {
    if (id.user_id === userid) {
      return "link-primary"
    } else {
      return "link-danger disabled"
    }
  }
  return (
    <>
      <Navbar />
      
        
      <div className="pt-24">
        <div class="container">
        <a href="/blogs/add" class="btn btn-success">Add Blogs</a>
        </div>
        <h2>Blogs:</h2> 
      {blogs && 
      blogs.map(({_id, title, description, user_id, location}) => (
        <div class="container">
        <div class="card" style={{ width: "18rem;"}}>
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{description}</p>
            <a href="/profile/" class={editbutton({user_id})}>edit</a>
          
        </div>
        </div>
        </div>
      ))
      }
      </div>
      
    </>
  );
};

export default Blogs;
