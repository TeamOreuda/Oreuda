import Cookies from "js-cookie";
import { cookies } from "next/headers";

import Landing from "@/Component/Landing/Landing";

export default function LandingPage() {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("Authorization");
  const ACCESS_TOKEN = Cookies?.get("Authorization");
  const REFRESH_TOKEN = Cookies?.get("RefreshToken");

  if (hasCookie && ACCESS_TOKEN && REFRESH_TOKEN) {
    Cookies.set("Authorization", ACCESS_TOKEN, {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "None",
      expires: Date.now(),
    });

    Cookies.set("RefreshToken", REFRESH_TOKEN, {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "None",
      expires: Date.now(),
    });
  }

  return <Landing />;
}
