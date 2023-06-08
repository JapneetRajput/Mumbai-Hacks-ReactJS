import React, { useEffect, useState } from "react";
import { profileUser } from "../api/service";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import {FaStar} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";
import {MdEmail} from "react-icons/md";
const Profile = () => {
  let token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
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

  return (
    <>
      <Navbar />
      <div class="h-full p-12 bg-[#0d1117]  flex flex-wrap items-center justify-center">
  <div class="container max-w-lg bg-[#161b22] rounded shadow-lg transform duration-200 easy-in-out m-12">
    <div class="h-2/4 sm:h-64  overflow-hidden">
      <img class="w-full rounded-md "
        src="https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpdGh1YnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt="Cover" />
    </div>
    <div class="flex justify-start px-5 -mt-12 mb-5">
      <span clspanss="block relative h-32 w-32">
        <img alt="Profile"
          src="https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpdGh1YnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          class="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1" />
      </span>
    </div>
    <div class="">
      <div class="px-7 mb-8">
        <h2 class="text-3xl font-bold text-white dark:text-gray-300">{name}</h2>
        <p class="text-[#abacad] mt-2 text-xl dark:text-gray-400">{mobile}</p>
        <p class="mt-2 text-[#abacad] text-md dark:text-gray-300">
        ~ Bio Feature Coming Soon ~
        </p>
        <p class="mt-2 text-[#abacad] text-md dark:text-gray-300">
        Current Location: {}
        </p>
        <button
          class="justify-center px-4 py-2 cursor-pointer bg-green-900 max-w-min mx-auto mt-8 rounded-lg text-gray-300 hover:bg-green-800 shadow-none hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
          <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <MdEmail size={25} /> &nbsp;{email}
              </div>
        </button><br/> 
        
        <button
          class="justify-center px-4 py-2 cursor-pointer bg-green-900 max-w-min mx-auto mt-8 rounded-lg text-gray-300 hover:bg-green-800 shadow-none hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
          onClick={()=> navigate("/logout")}>
          <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {post.likes.length} */}
                <BiLogOut size={25} /> &nbsp;Logout
              </div>
        </button>
      </div>
    </div>
  </div>
</div>

      {/* <div className="pt-32 w-5/6 sm:w-2/3 flex flex-col m-auto items-center">
        
        <h1 className="text-xl text-center">Name : {name}</h1>
        <h1 className="text-xl text-center">Email : {email}</h1>
        <h1 className="text-xl text-center">Mobile Number : {mobile}</h1>
      </div> */}
    </>
  );
};

export default Profile;
