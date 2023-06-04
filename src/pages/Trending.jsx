import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { profileUser } from "../api/service";

const Trending = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const profileInit = () => {
    profileUser(token).then((req, res) => {
      console.log(req.data);
      if (req.data.status !== "failed") {
        console.log(req.data);
      } else {
        navigate("/home");
      }
    });
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/posts/", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
    profileInit();
  }, []);

  return <div>Trending</div>;
};

export default Trending;
