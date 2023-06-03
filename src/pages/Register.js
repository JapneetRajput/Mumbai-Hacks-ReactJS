import React, { useState, useEffect } from "react";
import TextBox from "../components/TextBox";
import "../styles/login.css";
import Loader from "../components/Loader";
import { registerUser } from "../api/service";
import { useNavigate } from "react-router-dom";

// const googleTranslateElementInit = () => {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       autoDisplay: false
//     },
//     "google_translate_element"
//   );
// };

const Register = () => {
  // Init states
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new user
    if (name !== "" && mobileNumber !== "" && email !== "" && password !== "") {
      if (password !== confirmPassword) {
        setLoader(false);
        alert("Passwords do not match");
      } else {
        setLoader(false);
        const user = {
          name: name,
          mobile: Number(mobileNumber),
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
        setName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setConfirmPassword("");
        registerUser(user)
          .then((req, res) => {
            // navigate("/");
            console.log(req.data);
            const { status, message } = req.data;
            console.log(status, message);
            if (status === "failed") {
              alert(message);
            } else {
              // alert(message);
              navigate("/");
            }
          })
          .catch((error) => {
            alert("Error in creating user " + error.message);
          });
      }
    } else {
      setLoader(false);
      alert("All fields are mandatory!");
    }
  };

  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  return (
    <div className="flex flex-col items-center bg-[#0d1117] bg-cover ">
      {loader && (
        <div className="z-10 absolute flex flex-row items-center justify-center h-full w-full">
          <Loader />
        </div>
      )}
      <div className="flex mt-12 sm:mt-6">
        {/* <img src={logo} alt="logo" className="inline w-10 h-10" /> */}
        <h1 className=" text-[#d7dfe7] text-3xl ml-1 flex flex-row items-center font-bold">
          Mumbai
        </h1>
      </div>
      <form
        onSubmit={register}
        className="px-6 py-6 bg-[#161b22] flex flex-col items-start drop-shadow-2xl mt-16 md:mt-12 w-5/6 sm:w-1/2 lg:w-1/3 rounded-xl shadow-2xl"
      >
        <h2 class="text-[#c9d1d9] font-semibold mb-4 text-2xl self-center">
          REGISTER
        </h2>
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Name"
          backgroundColor="bg-[#0d1117]"
          position="left-2 sm:left-3 top-2.5"
          border="border-[#161b22] border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-8"
          type="text"
          setState={setName}
          value={name}
        />
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Mobile Number"
          backgroundColor="bg-[#0d1117]"
          position="left-2 sm:left-3 top-2.5"
          border="border-[#161b22] border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-6"
          type="text"
          setState={setMobileNumber}
          value={mobileNumber}
        />
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Email ID"
          backgroundColor="bg-[#0d1117]"
          position="left-2 sm:left-3 top-2.5"
          border="border-[#161b22] border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-6"
          type="email"
          setState={setEmail}
          value={email}
        />
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Password"
          backgroundColor="bg-[#0d1117]"
          position="left-2 sm:left-3 top-2.5"
          border="border-[#161b22] border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-6"
          type="password"
          setState={setPassword}
          value={password}
        />
        <TextBox
          textInput="text-md text-[#c9d1d9]"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Confirm Password"
          backgroundColor="bg-[#0d1117]"
          position="left-2 sm:left-3 top-2.5"
          border="border-[#161b22] border-2"
          span="px-1"
          input="px-3 sm:px-4"
          div="mt-6"
          type="password"
          setState={setConfirmPassword}
          value={confirmPassword}
        />
        <button
          type="submit"
          className="shadow-none w-full text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-xl h-10  my-4"
        >
          Continue
        </button>
        <h1 className=" text-[#d7dfe7] text-sm text-left mx-1">
          By continuing, you agree to Mumbai privacy notice and conditions of
          use.
        </h1>
      </form>
      <p className="text-[#d7dfe7] mt-4 font-semibold">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="underline cursor-pointer font-normal text-[#2f81e3]"
        >
          Sign in
        </span>
      </p>
      <div className=" bottom-0  bg-gray-500 bg-opacity-20 backdrop-filter backdrop-blur-lg flex flex-col items-center w-full h-10 pt-2">
        <span className="text-white">Mumbai | All rights reserved</span>
      </div>
    </div>
  );
};

export default Register;
