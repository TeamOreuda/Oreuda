"use client";

import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, selectIsLogin } from "@/store/modules/login";
import { useDispatch } from "react-redux";

export default function Token() {
  const searchParams = useSearchParams();
  const isLogin = useAppSelector(selectIsLogin);
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

  saveCookiesAndRedirect();
  dispatch(login());
  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      window.location.replace("/");
    }
  }, [saveCookiesAndRedirect, isLogin]);
}
