import React, { useEffect, useState } from "react";
// import logo from "../assets/logoMusicart.png";
import TextBox from "../components/TextBox";
import "../styles/login.css";
import Loader from "../components/Loader";
import { loginUser } from "../api/service";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";
// import { MouseParallax, ScrollParallax } from "react-just-parallax";
/*
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
*/
// const googleTranslateElementInit = () => {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       autoDisplay: false
//     },
//     "google_translate_element"
//   );
// };
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
            navigate("/home");
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
      navigate("/home");
    } else {
      setUserAuth(false);
    }
    // var addScript = document.createElement("script");
    // addScript.setAttribute(
    //   "src",
    //   "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    // );
    // document.body.appendChild(addScript);
    // window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-[#0d1117] bg-cover">
      {loader && (
        <div className="z-10 absolute flex flex-row items-center justify-center h-screen w-full">
          <Loader />
        </div>
      )}

      <div className="flex mt-16 md:mt-12 ">
        {/* <img src={logo} alt="logo" className="inline w-10 h-10" /> */}
        <h1 className="text-4xl sm:text-2xl md:text-4xl cursor-pointer pl-0 font-bold bg-clip-text text-[#c9d1d9]">
          Bombay Bulletin
        </h1>
      </div>
      {invalidflag && (
        <div class="alert alert-danger" role="alert">
          Invalid Login Credentials
        </div>
      )}

      <form
        onSubmit={login}
        className="p-6 bg-[#161b22] flex flex-col items-start drop-shadow-2xl mt-16 md:mt-12 w-5/6 sm:w-1/2 lg:w-1/3 rounded-xl shadow-2xl"
      >
        <h2 class="text-[#c9d1d9] font-semibold mb-4 text-2xl self-center">
          LOGIN
        </h2>
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Email ID"
          backgroundColor="bg-[#0d1117]"
          position="left-2 md:left-3 top-2.5"
          border="border-[#161b22] border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          setState={setEmail}
          value={email}
          type="email"
        />
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Password"
          backgroundColor="bg-[#0d1117]"
          position="left-2 md:left-3 top-2.5"
          border="border-[#0d1117] border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="password"
          setState={setPassword}
          value={password}
        />
        <button
          type="submit"
          className="shadow-none w-full text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10  my-4"
        >
          Continue
        </button>

        <h1 className="text-[#d7dfe7] text-sm text-left mx-1">
          By continuing, you agree to Bombay Bulletin's privacy notice and conditions of
          use.
        </h1>
      </form>
      <div className="mt-8 text-xs md:text-sm sm:w-1/2 lg:w-full flex items-center w-full md:px-1 px-9">
        <hr className="border-t w-full border-[#d7dfe7] flex-grow" />
        <span className=" text-[#d7dfe7] w-full">New to Bombay Bulletin?</span>
        <hr className="border-t w-full border-[#d7dfe7] flex-grow" />
      </div>
      <button
        onClick={() => navigate("/register")}
        className=" shadow-none w-82 text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10 my-4"
      >
        Create your Bombay Bulletin account
      </button>
      <div className=" bottom-0  bg-gray-500 bg-opacity-20 backdrop-filter backdrop-blur-lg flex flex-col items-center w-full h-10 pt-2">
        <span className="text-white">Bombay Bulletin | All rights reserved</span>
      </div>
    </div>
  );
};

export default Login;
