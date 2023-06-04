import React, { useRef, useState } from "react";
import BB from "../images/BB.png";
import PL from "../images/PL.png";
import { useNavigate } from "react-router";
import Summary from "../components/Summary"
import Slider from "../components/slider"

export default function Services() {
  const navigate = useNavigate();
  return (
    <>
        <Summary/>

        <div class="p-20 bg-[#010409] Z-0">
        <h3 class="text-white font-bold mb-4 text-3xl">SERVICES</h3>
        
        <div class="bg-[#0D1117] border-[#161b22] border-2 rounded-lg shadow-2xl md:flex">
          <img
            alt="Bombay Ballot"
            src={BB}
            class="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
          <div class="p-6">
            <h2 class="font-bold text-xl md:text-3xl mb-2 text-white">
              Bombay Ballot
            </h2>
            <p class="text-white">
              Get Location specific news
              
            </p>
            <button
              className="md:w-1/3 shadow-none w-40 text-[#d7dfe7] bg-[#1f7e30] font-bold py-2 px-4 hover:bg-[#2ea043] rounded-md h-10  my-4"
              type="submit"
              onClick={() => navigate("/posts")}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                Explore
              </div>
            </button>
          </div>
        </div>
        </div>
    </>
  );
}
