import Image from "next/image";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import st from "./Loading.module.scss";

export default function Loading() {
  const tips = ["Tip: You can use the arrow keys to navigate"];
  const characters = [
    "Soil",
    "Sprout",
    "Sapling",
    "Blossom",
    "Apple",
    "Rainbow",
    "Volcano",
    "Ice",
    "Earth",
  ];
  const characterSlide = characters.map((character: string) => (
    <SwiperSlide key={character}>
      <Image
        src={`/images/character/${character}.svg`}
        alt={character}
        width={400}
        height={400}
        priority
      />
    </SwiperSlide>
  ));
  return (
    <div className={st.body}>
      <div className={st.header}>
        <div className={st.tip}>
          {tips[Math.floor(Math.random() * tips.length)]}
        </div>
      </div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={true}
      >
        {characterSlide}
      </Swiper>
    </div>
  );
}
