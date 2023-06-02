import React, { useState, useRef, useEffect } from "react";
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
import { FaLocationArrow, FaEdit } from 'react-icons/fa';

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
    setTitle("");
    setDescription("");
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
        alert("Post Created Successfully")
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

  const addMarkerAtCurrentLocation = async () => {
    if (marker) {
      mapRef.current.removeLayer(marker);
    }
    await mapRef.current.locate();
    console.log(position);
  };

  useEffect(() => {
    profileInit();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-red-200 to-blue-200">
      <form
        onSubmit={handleFormSubmit}
        className="pt-20 flex flex-col items-center"
      >
        <h1 className="text-center text-3xl font-bold py-8 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-900">CREATE A POST</h1>
        <TextBox 
          text="text-md text-black"
          width="w-full"
          height="h-12"
          hint="Title"
          backgroundColor="bg-white"
          position="left-2 md:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 md:px-4"
          div=" sm:w-5/12 mb-4 w-3/4"
          setState={setTitle}
          value={title}
          type="text"
        />
        <TextArea
          text="text-md text-black"
          width="w-full"
          height="h-36"
          hint="Description"
          backgroundColor="bg-white"
          position="left-2 md:left-3 top-2.5"
          border="border-gray border-2"
          span="px-1"
          input="px-3 md:px-4"
          div=" sm:w-5/12 mb-4 w-3/4"
          setState={setDescription}
          value={description}
          type="text"
        />
        <label className="block mb-4">
          <span className="text-gray-700 pl-11 font-bold text-lg">
            Upload Image :{" "}
          </span>
          <input
            type="file"
            onChange={handleFileInputChange}
            className="mt-1 w-3/5"
          />
        </label>
        <button
          type="button"
          className="text-white bg-blue-500 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-gray-400 rounded h-14 w-40 my-4  "
          onClick={addMarkerAtCurrentLocation} 
        > 
        <div style={{display: "flex", justifyContent: "center" }}>
          <FaLocationArrow size={25}/> &nbsp; Locate
        </div>
        {/* <MapPinIcon class="h-6 w-6 text-gray-500" /> */}
        {/* <UilMapPin size ="30" color="#ffffff" className="flex ml-6"/> */}
         
        </button>
        <div className="w-full text-center z-0">
          <div className="flex flex-col items-center">
            <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef} >
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
          className="text-white bg-blue-500 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-gray-400 rounded h-14 w-48  my-4"
          type="submit">
             <div style={{display: "flex", justifyContent: "center" }}>
          <FaEdit size={25}/> &nbsp; Create a Post
        </div>
        </button>
      </form>
      <Footer/>
      </div>
    </>
  );
};

export default AddPost;
