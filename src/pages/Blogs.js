import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { profileUser, getBlog } from "../api/service";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AiOutlineConsoleSql } from "react-icons/ai";

const Blogs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [blogs, setBlogs] = useState([]);

  let token = localStorage.getItem("token");

  const profileInit = () => {
    profileUser(token).then((req, res) => {
      if(req.data.status !== "failed"){
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
  
  
  

  useEffect(() => {
    getBlog()
    .then((req, res) => {
      console.log(req.data);
      const newblogs = Object.values(req.data);
      console.log(newblogs, typeof(newblogs));
      setBlogs(newblogs);
      console.log(blogs);
      console.log(req.data);
  }
  );
  });

  return (
    <>
      <Navbar />
      <div className="pt-24">Blogs: 
      {blogs && 
      blogs.map(({title, description, user_id}) => (
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{description}</p>
          <a href="/profile/" class="btn btn-primary">{user_id}</a>
        </div>
        </div>
      ))
      }</div>
      <div class="container">
      <p><a href="/blogs/add" class="link-info">Add Blogs</a></p>
      </div>
    </>
  );
};

export default Blogs;