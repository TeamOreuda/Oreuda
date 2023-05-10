"use client";

import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Token() {
  const searchparams = useSearchParams();

  const ACCESS_TOKEN = searchparams.get("Authorization");
  const REFRESH_TOKEN = searchparams.get("RefreshToken");

  const saveCookiesAndRedirect = useCallback(() => {
    if (ACCESS_TOKEN && REFRESH_TOKEN) {
      Cookies.set("Authorization", ACCESS_TOKEN, {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });
      Cookies.set("RefreshToken", REFRESH_TOKEN, {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    saveCookiesAndRedirect();
    window.location.replace("/");
  }, [saveCookiesAndRedirect]);
}
