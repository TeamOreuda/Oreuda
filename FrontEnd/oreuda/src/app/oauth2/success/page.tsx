"use client";

import { useCallback, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

export default function Token() {
  const searchparams = useSearchParams();

  const ACCESS_TOKEN = searchparams.get("Authorization");
  const REFRESH_TOKEN = searchparams.get("RefreshToken");

  const saveCookiesAndRedirect = useCallback(async () => {
    if (ACCESS_TOKEN) {
      setCookie("Authorization", ACCESS_TOKEN, {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });
    }
    if (REFRESH_TOKEN) {
      setCookie("RefreshToken", REFRESH_TOKEN, {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    saveCookiesAndRedirect().then(() => {
      window.location.replace("/");
    });
  }, [saveCookiesAndRedirect]);
}