import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

const Addblogs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="pt-24">Add Blogs</div>
    </>
  );
};

export default Addblogs;