import axios from "axios";

export const GetUserRefresh = (ACCESS_TOKEN: any, REFRESH_TOKEN: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
    {},
    {
      headers: {
        Authorization: ACCESS_TOKEN,
        RefreshToken: REFRESH_TOKEN,
      },
    }
  );
};
