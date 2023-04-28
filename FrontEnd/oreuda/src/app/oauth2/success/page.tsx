"use client";

import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Token() {
  const searchparams = useSearchParams();

  const ACCESS_TOKEN = searchparams.get("Authorization");
  const REFRESH_TOKEN = searchparams.get("RefreshToken");
  console.log(ACCESS_TOKEN);
  console.log(REFRESH_TOKEN);

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

  // if (ACCESS_TOKEN) {
  //   redirect("/");
  // }

  return <div></div>;
}
