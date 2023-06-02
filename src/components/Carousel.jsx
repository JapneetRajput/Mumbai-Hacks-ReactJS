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
              "url(https://gcdnb.pbrd.co/images/3RdZwtkasR77.png?o=1)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="title  text-[#1f2937]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#1f2937]" data-swiper-parallax="-200">
            CITY OF DREAMS
          </div>
          <div className="text bg-[#ecf0f3] bg-opacity-20 backdrop-filter backdrop-blur-lg text-[#1f2937] rounded-lg" data-swiper-parallax="-100">
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
        <SwiperSlide>
          <div className="title text-[#1f2937]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#1f2937]" data-swiper-parallax="-200">
            MAYANAGRI
          </div>
          <div className="text bg-[#ecf0f3] bg-opacity-20 backdrop-filter backdrop-blur-lg text-[#1f2937] rounded-lg" data-swiper-parallax="-100">
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
        <SwiperSlide>
          <div className="title text-[#1f2937]" data-swiper-parallax="-300">
          मुंबई
          </div>
          <div className="subtitle text-[#1f2937]" data-swiper-parallax="-200">
            CAPITAL CITY OF MAHARASHTRA
          </div>
          <div className="text bg-[#ecf0f3] bg-opacity-20 backdrop-filter backdrop-blur-lg text-[#1f2937] rounded-lg" data-swiper-parallax="-100">
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
