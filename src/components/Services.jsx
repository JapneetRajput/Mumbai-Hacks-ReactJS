import React, { useRef, useState } from "react";
import BB from '../images/BB.png';
import PL from '../images/PL.png';

export default function Services(){
    return(
        <>
           <div class="p-20 bg-orange-200">
          <h3 class="text-orange-400 font-bold mb-4 text-3xl">SERVICES</h3>
          <div class="bg-white rounded-lg shadow-2xl md:flex">
            <img src={BB} class="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
            <div class="p-6">
              <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Bombay Ballot</h2>
              <p class="text-orange-700">
              et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc
              </p>
              <button className="md:w-1/3 text-white bg-orange-400 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-orange-700 rounded h-14 w-40  my-4"
          type="submit" onClick="/addpost">
             <div style={{display: "flex", justifyContent: "center" }}>
          Enroll Here
        </div>
        </button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-2xl md:flex mb-12 mt-12">
            <img src={PL} class="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
            <div class="p-6">
              <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Plot Lock</h2>
              <p class="text-orange-700">
              et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc
              </p>
              <button className="md:w-1/3 text-white bg-orange-400 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-orange-700 rounded h-14 w-40  my-4"
          type="submit" onClick="/addpost">
             <div style={{display: "flex", justifyContent: "center" }}>
          Book Here
        </div>
        </button>
            </div>
        </div>
          
          <div class="bg-white rounded-lg shadow-2xl md:flex mb-12 mt-12">
            <img src={BB} class="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
            <div class="p-6">
              <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Bombay Ballot</h2>
              <p class="text-orange-700">
              et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc
              </p>
              <button className="md:w-1/3 text-white bg-orange-400 font-bold py-2 px-4 border-b-4 border-r-2 border-gray-600 hover:border-gray-400 hover:bg-orange-700 rounded h-14 w-40  my-4"
          type="submit" onClick="/addpost">
             <div style={{display: "flex", justifyContent: "center" }}>
          Enroll Here
        </div>
        </button>
            </div>
          </div>
        </div>


        </>
    );
}