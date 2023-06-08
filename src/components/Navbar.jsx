import React, { useContext, useState } from "react";
import { AiOutlineMail, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BiHome } from "react-icons/bi";
import { AuthContext } from "../context/UserContext";
import Logo from "../assets/lOGO.gif";
import { useNavigate } from "react-router";
const Navbar = () => {
  let token = localStorage.getItem("token");
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  if (token) {
    setUserAuth(true);
  }

  return (
    <div className="fixed w-full h-16 bg-[#161b22] text-white tracking-wide mb-0  z-50">
      <div className="flex justify-between items-center w-full h-full px-7 2xl:px-16">
        <div
          className="flex flex-row cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img alt="BB" src={Logo} className="w-12 h-12 inline" />
          <h1 className="flex flex-col items-center mt-2 ml-2 text-2xl sm:text-2xl md:text-2xl pl-0 font-bold text-[#c9d1d9]">
            BOMBAY BULLETIN
          </h1>
        </div>
        <div>
          <ul className="hidden md:flex ">
            {/* <Link href='/' className='invisible ml-10 text-md font-bold uppercase'>
                        Home
                    </Link> */}
            <a href="/home" className="hover:text-[#babbbd]">
              <li className="font-semibold ml-10 text-md cursor-pointer">
                Home
              </li>
            </a>
            <a href="/posts" className="hover:text-[#babbbd]">
              <li className="font-semibold ml-10 text-md cursor-pointer">
                News
              </li>
            </a>
            <a href="/blogs" className="hover:text-[#babbbd]">
              <li className="font-semibold ml-10 text-md cursor-pointer">
                Blogs
              </li>
            </a>
            <a href="/maps" className="hover:text-[#babbbd]">
              <li className="font-semibold ml-10 text-md cursor-pointer">
                Maps
              </li>
            </a>

            <a href="/profile" className="hover:text-[#babbbd]">
              <li className="font-semibold ml-10 text-md cursor-pointer">
                Profile
              </li>
            </a>
            <a href="/logout" className="hover:text-[#babbbd]">
              <li className="font-semibold ml-10 text-md cursor-pointer">
                Logout
              </li>
            </a>
          </ul>
          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      <div
        className={nav ? "fixed left-0 top-0 w-full bg-gray/60" : ""}
      >
        {/* <div
          className={
            nav
              ? "fixed  w-[75%] sm:w-[60%] md:w-[45%] ease-in duration-500"
              : "hidden"
          }
        > */}
          
<div class={nav
              ?"fixed m:w-[60%] md:w-[45%] ease-in duration-500 z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-[#161B22] border border-[#0D1117]  bottom-0 left-1/2 " : "hidden"}>
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto" >
        <button data-tooltip-target="tooltip-home" type="button" class="shadow-none inline-flex flex-col items-center justify-center   hover:bg-gray-50  group border-1 border-[#0D1117]"
        onClick={() => navigate("/home")}>
            <svg class="w-6 h-6 mb-1 text-gray-500  group-hover:text-[#1f7e30] " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <BiHome size={20}/>
            </svg>
            <span class="sr-only">Home</span>
        </button>
        

        <button data-tooltip-target="tooltip-wallet" type="button" class="border-1 border-[#0D1117]  shadow-none inline-flex flex-col items-center justify-center  hover:bg-gray-50 group" onClick={() => navigate("/posts")}>
            <svg class="w-6 h-6 mb-1 text-gray-500  group-hover:text-[#1f7e30] " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <HiOutlineNewspaper size={20} />
            </svg>
            <span class="sr-only">News</span>
        </button>
        
        
        <div class="flex items-center justify-center shadow-none border-1 border-[#0D1117]">
            <button data-tooltip-target="tooltip-new" type="button" class="shadow-none inline-flex items-center justify-center w-10 h-10 font-medium bg-[#0D1117]  hover:bg-[#0D1117] group " onClick="https://github.com/JapneetRajput/Mumbai-Hacks-ReactJS">
            <img alt="BB" src={Logo} className="shadow-none w-10 h-10 inline" />
                {/* <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <img alt="BB" src={Logo} className="w-12 h-12" />
                </svg> */}
                <span class="sr-only">New item</span>
            </button>
        </div>
        
        
        <button data-tooltip-target="tooltip-settings" type="button" class="shadow-none inline-flex flex-col items-center justify-center  hover:bg-gray-50 group border-1 border-[#0D1117]" onClick={() => navigate("/maps")}>
            <svg class="w-6 h-6 mb-1 text-gray-500  group-hover:text-[#1f7e30] " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <FiMapPin size={20}/>
            </svg>
            <span class="sr-only">Maps</span>
        </button>
       
       
        <button data-tooltip-target="tooltip-profile" type="button" class="shadow-none inline-flex flex-col items-center justify-center   hover:bg-gray-50 d group border-1 border-[#0D1117]" onClick={() => navigate("/profile")}>
            <svg class="w-6 h-6 mb-1 text-gray-500  group-hover:text-[#1f7e30] " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <CgProfile size={20}/>
            </svg>
            <span class="sr-only">Profile</span>
        </button>
        
        
    </div>
</div>

          {/* <div>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-bold bg-clip-text text-white">
                BOMBAY BULLETIN
              </h1>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose size={15} />
              </div>
            </div>
            <div className="border-gray-300 my-4">
            </div>
          </div> */}
          {/* <div className="mt-10">
            <ul className="uppercase font-bold">
              <a href="/home">
                <li className="py-4 text-md cursor-pointer hover:text-[#babbbd]">
                  Home
                </li>
              </a>
              <a href="/posts">
                <li className="py-4 text-md cursor-pointer hover:text-[#babbbd]">
                  News
                </li>
              </a>
              <a href="/blogs">
                <li className="py-4 text-md cursor-pointer hover:text-[#babbbd]">
                  Blogs
                </li>
              </a>
              <a href="/maps">
                <li className="py-4 text-md cursor-pointer hover:text-[#babbbd]">
                  Maps
                </li>
              </a>
              <a href="/profile">
                <li className="py-4 text-md cursor-pointer hover:text-[#babbbd]">
                  Profile
                </li>
              </a>
              <a href="/logout">
                <li className="py-4 text-md cursor-pointer hover:text-[#babbbd]">
                  Logout
                </li>
              </a>
            </ul>
            <div className="pt-[99%]">
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <a
                  href="https://www.linkedin.com/in/japneetrajput/"
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href="https://github.com/JapneetRajput"
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="mailto:japneetrajput2804@gmail.com"
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <AiOutlineMail size={18} />
                </a>
                <a
                  href="tel:+918104235686"
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <BsFillPersonLinesFill size={18} />
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  );
};

export default Navbar;
