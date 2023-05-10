import Cookies from "js-cookie";

export const saveCookiesAndRedirect = (
  ACCESS_TOKEN: any,
  REFRESH_TOKEN: any
) => {
  if (ACCESS_TOKEN && REFRESH_TOKEN) {
    Cookies.set("Authorization", ACCESS_TOKEN, {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    Cookies.set("RefreshToken", REFRESH_TOKEN, {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
  }
};
