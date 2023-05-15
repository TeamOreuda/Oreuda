"use client";

import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Token() {
  const searchParams = useSearchParams();
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
    window.location.replace("/");
  }, [saveCookiesAndRedirect]);
}
