import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { profileUser, getBlogs, getBlog, deleteBlog } from "../api/service";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { VscNewFile } from "react-icons/vsc";
import BB from "../images/BB.png";
import { AiFillPlusCircle } from "react-icons/ai";

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
      if (req.data.status !== "failed") {
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
    getBlogs().then((req, res) => {
      //console.log(req.data);
      const newblogs = Object.values(req.data);
      //console.log(newblogs, typeof(newblogs));
      setBlogs(newblogs);
    });
  });

  const deleteblog = (blog_id) => {
    // console.log('blog id is');
    // console.log(blog_id);
    deleteBlog(blog_id).then((req, res) => {
      navigate("/blogs");
    });
  };

  const editbutton = (id, blog_id) => {
    // console.log('editing');
    // console.log(blog_id._id);
    if (id.user_id === userid) {
      return (
        <>
          {/* <a class="btn btn-primary" role="button" aria-disabled="false" 
      onClick={()=>navigate("/blogs/edit", {state: { myProp: blog_id}})}>
        Edit</a> &nbsp; */}
          {/* <a class="btn btn-primary" role="button" aria-disabled="false" onClick={()=>deleteblog(blog_id._id)}>Delete</a>  */}
          <button
            className="md:w-1/3 shadow-none w-8 text-[#d7dfe7] bg-[#2a72d8] font-bold py-2 px-4 hover:bg-[#2F81F7] rounded-md h-10  my-4"
            type="submit"
            onClick={() =>
              navigate("/blogs/edit", { state: { myProp: blog_id } })
            }
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              Edit
            </div>
          </button>{" "}
          &nbsp;
          <button
            className="md:w-1/3 shadow-none w-8 text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-md h-10  my-4"
            type="submit"
            onClick={() => deleteblog(blog_id._id)}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              Delete
            </div>
          </button>
        </>
      );
    } else {
      return (
        <a class="btn btn-primary disabled" role="button" aria-disabled="true">
          Cannot Edit
        </a>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-[#010409] flex flex-wrap justify-center ">
        <button
          className="fixed right-5 bottom-0  shadow-none text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10 my-4"
          onClick={() => navigate("/blogs/add")}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AiFillPlusCircle className="w-6 h-6 sm:w-6 sm:h-6 " /> &nbsp;
            Create Blog
          </div>
        </button>
        {blogs &&
          blogs.map(
            ({ _id, title, description, street, city, country, user_id }) => (
              <div className="w-86 self-center pt-10 bg-[#0D1117] border-2 border-[#272e38]  rounded-lg shadow   cursor-pointer  mb-5 ml-2 mr-2 hover:-translate-y-1 hover:scale-90 hover:bg-[#212833] duration-300">
                <div
                  style={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    alignItems: "center",
                  }}
                  className=" rounded overflow-hidden shadow-md self-center "
                >
                  <img
                    src={BB}
                    alt=""
                    className=" self-center rounded-t-lg object-contain w-40 h-40 md:rounded-none md:rounded-l-lg inline"
                  />
                  <div className="px-6 py-4 ">
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 class="mb-2 text-2xl font-semibold uppercase tracking-tight text-white">
                        {" "}
                        Title : {title}
                      </h5>
                      <br />
                      <p class="mb-3 font-medium text-[#c9d1d9] grid grid-row-3">
                        Description : {description}
                        <br />
                        <br />
                        Street: {street} <br />
                        City: {city} <br />
                        Country: {country}
                        <br />
                        Created by : {user_id}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => navigate("/blogs")}
                      className=" shadow-none  text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 mr-4  hover:bg-[#2ea043] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        Edit
                      </div>
                    </button>

                    <button
                      onClick={() => navigate("/blogs")}
                      className=" shadow-none  text-[#d7dfe7] bg-[#7e1f1f] font-bold py-2 px-4 hover:bg-[#a02e2e] rounded-xl w-16 h-10 my-4"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        Del
                      </div>
                    </button> */}
                    {editbutton({ user_id }, { _id })}
                  </div>
                </div>
              </div>
            )
          )}
      </div>

      {/* <div className="pt-24 bg-[#010409] flex flex-wrap justify-center ">
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
            <a href="/profile/" class={editbutton({user_id})}>edit</a>
            {editbutton({user_id}, {_id})}
        </div>
        </div>
        </div>
      ))
      } */}
    </>
  );
};

export default Blogs;
