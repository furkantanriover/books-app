import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "./style.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface CarouselProps {
  data: any;
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <div className="swiper_container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {data.map((data: any) => (
          <SwiperSlide key={data.id} style={{ background: "transparent" }}>
            <div className="text-center">
              <img
                src={data.smallThumbnail}
                alt={data.title}
                className="swiper-slide-img"
              />
              {data.title && <h2 className="mt-4 text-lg">{data.title}</h2>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <FiArrowLeft />
        </div>
        <div className="swiper-button-next slider-arrow">
          <FiArrowRight />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default Carousel;
