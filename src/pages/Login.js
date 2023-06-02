import React, { useEffect, useState } from "react";
// import logo from "../assets/logoMusicart.png";
import TextBox from "../components/TextBox";
import "../styles/login.css";
import Loader from "../components/Loader";
import { loginUser } from "../api/service";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";
/*
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
*/
const googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      autoDisplay: false
    },
    "google_translate_element"
  );
};

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [invalidflag, setInvalidFlag] = useState(false);
  const navigate = useNavigate();
  const { setUserAuth } = React.useContext(AuthContext);
  const auth = localStorage.getItem("token");
  const login = async (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new user
    if (email !== "" && password !== "") {
      setLoader(false);
      const user = {
        email: email,
        password: password,
      };
      setEmail("");
      setPassword("");
      await loginUser(user)
        .then((req, res) => {
          const { status, message } = req.data;
          if (status === "failed") {
            setInvalidFlag(true);
          } else {
            localStorage.setItem("token", req.data.token);
            setUserAuth(true);
            navigate("/profile");
          }
        })
        .catch((err) => alert(err));
    } else {
      setLoader(false);
      alert("All fields are mandatory!");
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/profile");
    } else {
      setUserAuth(false);
    }
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="flex flex-col items-center bg-[url('https://gcdnb.pbrd.co/images/3RdZwtkasR77.png?o=1')]  bg-cover" id="google_translate_element">
      {loader && (
        <div className="z-10 absolute flex flex-row items-center justify-center h-full w-full">
          <Loader />
        </div>
      )}
      <div className="flex mt-16 md:mt-12 ">
        {/* <img src={logo} alt="logo" className="inline w-10 h-10" /> */}
        <h1 className="text-4xl sm:text-2xl md:text-4xl cursor-pointer pl-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
          MUMBAI
        </h1>
      </div>
      {invalidflag &&
        <div class="alert alert-danger" role="alert">
        Invalid Login Credentials
        </div>
      }
      
      <form
        onSubmit={login}
        className="p-6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-start border mt-16 md:mt-12 border-[#D9D9D9] border-3px w-5/6 sm:w-1/2 lg:w-1/3 rounded-xl shadow-2xl"
      >
       <h2 class="text-orange-400 font-bold mb-4 text-2xl">LOGIN</h2>
        <TextBox
          text="text-md text-black"
          width="w-full"
          height="h-12"
          hint="Email ID"
          backgroundColor="bg-white"
          position="left-2 md:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          setState={setEmail}
          value={email}
          type="email"
        />
        <TextBox
          text="text-md text-black"
          width="w-full"
          height="h-12"
          hint="Password"
          backgroundColor="bg-white"
          position="left-2 md:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="password"
          setState={setPassword}
          value={password}
        />
        <button
          type="submit"
          className="w-full  text-white bg-orange-400 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-orange-700 rounded h-14  my-4"
        >
          Continue
        </button>
        <h1 className="text-sm text-left mx-1">
          By continuing, you agree to Mumbai privacy notice and conditions of
          use.
        </h1>
      </form>
      <div className="mt-8 text-xs md:text-sm sm:w-1/2 lg:w-1/3 flex items-center w-full md:px-1 px-9">
        <hr className="border-t w-full border-white flex-grow" />
        <span className=" text-white w-full">New to Mumbai?</span>
        <hr className="border-t w-full border-white flex-grow" />
      </div>
      <button
        onClick={() => navigate("/register")}
        className=" text-white bg-orange-400 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-orange-700 rounded h-14  my-4"
      >
        Create your Mumbai account
      </button>
      <div className=" bottom-0  bg-orange-900 bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center w-full h-10 pt-2">
        <span className="text-white">Mumbai | All rights reserved</span>
      </div>
    </div>
  );
};

export default Login;
