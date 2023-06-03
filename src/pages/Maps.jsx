import React, { useState, useRef, useEffect, useContext } from "react";
import {
  MapContainer as Map,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "../styles/addPost.css";
import { mapConfig } from "../helper/mapConfig";
import { useNavigate } from "react-router";
import { getPosts, profileUser } from "../api/service";
import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import TextArea from "../components/TextArea";
import Footer from "../components/Footer";
import { TbConfetti } from "react-icons/tb";

import Axios from "axios";
// import { MapPinIcon } from "@heroicons/outline";
import { FaLocationArrow, FaEdit } from "react-icons/fa";

const API_KEY = "e9d8379d202a0ab45e4395390d3e5fa2";
const api_endpoint = `http://api.openweathermap.org/geo/1.0/reverse?`;

const markerIcon = new L.Icon({
  iconUrl: require("../assets/markerIcon.png"),
  iconSize: [40, 35],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const Maps = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const profileInit = () => {
    profileUser(token).then((req, res) => {
      console.log(req.data);
      if (req.data.status !== "failed") {
        console.log(req.data);
      } else {
        navigate("/");
      }
    });
  };

  const [posts, setPosts] = useState();

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
  }, []);

  const [center, setCenter] = useState({
    lat: 21.567545592626146,
    lng: 79.11035209894182,
  });
  const ZOOM_LEVEL = 4;
  const mapRef = useRef(null);
  useEffect(() => {
    profileInit();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen pt-24 bg-[#010409]">
        <div className="w-full text-center z-0">
          <div className="flex flex-col items-center">
            <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={mapConfig.maptiler.url}
                attribution={mapConfig.maptiler.attribution}
              />
              {posts &&
                posts.map((post, idx) => (
                  <Marker
                    position={[post.lat, post.lng]}
                    icon={markerIcon}
                    key={idx}
                  >
                    <Popup>
                      {post.title}
                      <br />
                      {post.city}, {post.country}
                    </Popup>
                  </Marker>
                ))}
            </Map>
            {/* <button onClick={() => console.log(position)}>Position</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Maps;
