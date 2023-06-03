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
import { profileUser } from "../api/service";
import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import TextArea from "../components/TextArea";
import Footer from "../components/Footer";

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

function LocationMarker({ position, setPosition, marker, setMarker }) {
  const map = useMapEvents({
    click(e) {
      const { latlng } = e;
      if (marker) {
        map.removeLayer(marker);
      }
      const newMarker = L.marker(latlng, { icon: markerIcon }).addTo(map);
      setPosition(latlng);
      console.log(latlng);
      setMarker(newMarker);
      map.flyTo(latlng, map.getZoom());
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 15);
    },
  });

  useEffect(() => {
    if (position && marker) {
      marker.setLatLng(position);
    }
  }, [position]);

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const AddPost = () => {
  // const location = useContext(LocationContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("post", selectedFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("lat", position.lat);
    formData.append("lng", position.lng);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("category", selectedCategory);
    setTitle("");
    setDescription("");
    setCity("");
    setState("");
    setCountry("");
    setSelectedCategory("");
    setSelectedFile(null);
    const config = {
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    };
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/posts/save",
      formData,
      config
    )
      .then((res) => {
        console.log(res.data);
        // navigate("/home");
        alert("Post Created Successfully");
      })
      .catch((err) => console.log(err));
  };

  const [center, setCenter] = useState({
    lat: 21.567545592626146,
    lng: 79.11035209894182,
  });
  const ZOOM_LEVEL = 4;
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [position, setPosition] = useState(null); // New state for position
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tech");

  const addMarkerAtCurrentLocation = async () => {
    if (marker) {
      mapRef.current.removeLayer(marker);
    }
    await mapRef.current.locate();
    // console.log(position);
  };

  useEffect(() => {
    if (!position) return;

    Axios.get(
      `${api_endpoint}lat=${position.lat}&lon=${position.lng}&limit=1&appid=${API_KEY}`
    ).then((res) => {
      console.log(res.data);
      setCity(res.data[0].name);
      setState(res.data[0].state);
      setCountry(res.data[0].country);
    });
  }, [position]);

  useEffect(() => {
    profileInit();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" bg-[#010409]">
        <form
          onSubmit={handleFormSubmit}
          className="pt-20 flex flex-col items-center "
        >
          <h1 className="text-center text-3xl font-bold py-8 bg-clip-text text-white">
            CREATE A POST
          </h1>
          <TextBox
            textInput="text-md text-[#c9d1d9]"
            textLabel="text-md text-white"
            width="w-full"
            height="h-12"
            hint="Title"
            backgroundColor="bg-[#0d1117]"
            position="left-2 md:left-3 top-2.5"
            border="border-[#161b22] border-2"
            span="px-1"
            input="px-3 md:px-4"
            div=" sm:w-5/12 mb-4 w-3/4"
            setState={setTitle}
            value={title}
            type="text"
          />
          <TextArea
            textInput="text-md text-[#c9d1d9]"
            textLabel="text-md text-white"
            width="w-full"
            height="h-36"
            hint="Description"
            backgroundColor="bg-[#0d1117]"
            position="left-2 md:left-3 top-2.5"
            border="border-[#161b22] border-2"
            span="px-1"
            input="px-3 md:px-4"
            div=" sm:w-5/12 mb-4 w-3/4"
            setState={setDescription}
            value={description}
            type="text"
          />
          <label className="block mb-4 ">
            <span className="text-[#d7dfe7] pl-11 font-semibold text-lg">
              Upload Image :{" "}
            </span>
            <input
              type="file"
              onChange={handleFileInputChange}
              className="mt-1 w-3/5 font-semibold rounded-md border-[#161b22] border-2 text-[#d7dfe7] bg-[#0d1117]"
            />
          </label>
          <div className="relative inline-block sm:w-5/12 mb-4 w-3/4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block appearance-none w-full bg-[#0d1117] border-[#161b22] border-2 text-[#d7dfe7] py-3 px-3 md:px-4 pr-8 rounded-md leading-tight focus:outline-none "
            >
              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
              <option value="Literature">Literature</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0  flex items-center pr-4 text-white">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button
            type="button"
            className=" shadow-none w-32 text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 hover:bg-[#2ea043] rounded-md h-12 mb-4"
            onClick={addMarkerAtCurrentLocation}
          >
            <div
              style={{ display: "flex", margin: 0, justifyContent: "center" }}
            >
              <FaLocationArrow className="mt-1" size={16} /> &nbsp; Locate
            </div>
            {/* <MapPinIcon class="h-6 w-6 text-gray-500" /> */}
            {/* <UilMapPin size ="30" color="#ffffff" className="flex ml-6"/> */}
          </button>
          <div className="w-full text-center z-0">
            <div className="flex flex-col items-center">
              <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer
                  url={mapConfig.maptiler.url}
                  attribution={mapConfig.maptiler.attribution}
                />
                <LocationMarker
                  position={position}
                  setPosition={setPosition}
                  marker={marker}
                  setMarker={setMarker}
                />
              </Map>
              {/* <button onClick={() => console.log(position)}>Position</button> */}
            </div>
          </div>
          <button
            className="shadow-none text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-md h-14 w-48 my-4 "
            type="submit"
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FaEdit size={25} /> &nbsp; Create a Post
            </div>
          </button>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default AddPost;
