import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { profileUser, getBlogs, getBlog, deleteBlog } from "../api/service";
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

  const deleteblog = (blog_id) => {
    // console.log('blog id is');
    // console.log(blog_id);
    deleteBlog(blog_id)
    .then((req, res) => {
      navigate("/blogs");
    });
  };


  const editbutton = (id, blog_id) => {
    // console.log('editing');
    // console.log(blog_id._id);
    if (id.user_id === userid) {
      return (<><a class="btn btn-primary" role="button" aria-disabled="false" onClick={()=>navigate("/blogs/edit", {state: { myProp: blog_id}})}>Edit</a> &nbsp;
      <a class="btn btn-primary" role="button" aria-disabled="false" onClick={()=>deleteblog(blog_id._id)}>Delete</a> 
      </>
      )
    } else {
      return <a class="btn btn-primary disabled" role="button" aria-disabled="true">Cannot Edit</a>
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
      blogs.map(({_id, title, description, street, city, country, user_id}) => (
        <div class="container">
        <div class="card" style={{ width: "18rem;"}}>
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{description}</p>
          <p class="card-text">{street}</p>
          <p class="card-text">{city}</p>
          <p class="card-text">{country}</p>
            {/* <a href="/profile/" class={editbutton({user_id})}>edit</a> */}
            {editbutton({user_id}, {_id})}
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
