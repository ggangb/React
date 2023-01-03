import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "../CSS/Banner.css";
import "swiper/css";
import "swiper/css/navigation";

const Banner = () => {
  const items = [
    { src: "/images/banner1.jpg" },
    { src: "/images/banner2.jpg" },
    { src: "/images/banner3.jpg" },
    { src: "/images/banner4.png" },
  ];

  const settings = {
    slidesPerView: 1,
    spaceBetween: 40,
    autoplay: { delay: 2000 },
    loop: true,
    loopedSlides: 1,
    navigation: true,
  };

  SwiperCore.use([Navigation, Autoplay]);

  return (
    <>
      <Swiper {...settings} className="main_swiper">
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} className="main_swiper_banner" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="main_banner_content">
        <img className="main_banner_img2" src="/images/mainImg.png" />
        <img className="main_banner_img" src="/images//research.png" />
        <div className="main_info_banner">
          <img className="main_banner_img3" src="/images/mainImg3.png" />
          <img className="main_banner_img4" src="/images/mainImg4.png" />
          <div className="main_banner_video">
            <iframe
              width="660"
              height="335"
              src="https://www.youtube-nocookie.com/embed/qSLnb6q9nMc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
