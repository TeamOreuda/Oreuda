import axios from "axios";

export const GetProfile = async (ACCESS_TOKEN: any) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
