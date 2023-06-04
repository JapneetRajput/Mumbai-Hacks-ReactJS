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
            The city where local news are produced each day in every neighbourhood
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
            वह शहर जहां हर दिन हर मोहल्ले में स्थानीय समाचार बनते हैं
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title text-[#c9d1d9]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#c9d1d9]" data-swiper-parallax="-200">
            CAPITAL CITY OF MAHARASHTRA
          </div>
          <div className="text bg-[#161b22] bg-opacity-40 backdrop-filter backdrop-blur-lg text-[#c9d1d9] rounded-lg" data-swiper-parallax="-100">
            <p className="p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
