import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carousel.css";
import { Parallax, Pagination, Navigation } from "swiper";
// import img1 from "../images/c1.png"
export default function Carousel() {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          "background": "#0d1117",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            "background-image":
              "url(https://gcdnb.pbrd.co/images/XcBH3e51fW5C.png?o=1)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="title  text-[#c9d1d9]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#c9d1d9]" data-swiper-parallax="-200">
            CITY OF DREAMS
          </div>
          <div className="text bg-[#161b22] bg-opacity-40 backdrop-filter backdrop-blur-lg text-[#c9d1d9] rounded-lg" data-swiper-parallax="-100">
            <p className="p-4">
            Mumbai, the financial and entertainment capital of India, is a vibrant and bustling city that never fails to leave a lasting impression on its residents and visitors. Situated on the west coast of India, Mumbai is known for its iconic landmarks, diverse culture, and a spirit that never sleeps.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title text-[#c9d1d9]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#c9d1d9]" data-swiper-parallax="-200">
            MAYANAGRI
          </div>
          <div className="text bg-[#161b22] bg-opacity-40 backdrop-filter backdrop-blur-lg text-[#c9d1d9] rounded-lg" data-swiper-parallax="-100">
            <p className="p-4">
            Mumbai is a melting pot of cultures, welcoming people from all corners of India and the world. Its cosmopolitan vibe is reflected in its diverse cuisine, which ranges from mouth-watering street food like vada pav and pav bhaji to high-end restaurants offering global culinary delights. 
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title text-[#c9d1d9]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#c9d1d9]" data-swiper-parallax="-200">
          महाराष्ट्राची राजधानी
          </div>
          <div className="text bg-[#161b22] bg-opacity-40 backdrop-filter backdrop-blur-lg text-[#c9d1d9] rounded-lg" data-swiper-parallax="-100">
            <p className="p-4">
            While Mumbai is a city of dreams and opportunities, it also faces challenges like any other metropolis. Traffic congestion, overcrowding, and monsoon-related issues are some of the hurdles that Mumbaikars navigate on a daily basis. However, the indomitable spirit of its residents, known as "Mumbaikars," shines through as they face these challenges with resilience and a sense of community.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
