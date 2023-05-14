"use client";

import "swiper/css";
import "swiper/css/autoplay";
import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import st from "./page.module.scss";

export default function Token() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const ACCESS_TOKEN = searchParams.get("Authorization");
  const REFRESH_TOKEN = searchParams.get("RefreshToken");

  const saveCookiesAndRedirect = useCallback(() => {
    if (ACCESS_TOKEN && REFRESH_TOKEN) {
      Cookies.set("Authorization", ACCESS_TOKEN, {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "None",
        readOnly: false,
      });
      Cookies.set("RefreshToken", REFRESH_TOKEN, {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "None",
        readOnly: false,
      });
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    saveCookiesAndRedirect();
    // window.location.replace("/");
  }, [saveCookiesAndRedirect]);

  return (
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
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
}
