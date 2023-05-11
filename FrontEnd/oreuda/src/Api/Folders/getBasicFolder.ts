import axios from "axios";

export const GetBasicFolder = (ACCESS_TOKEN: any) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/repository/base`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
