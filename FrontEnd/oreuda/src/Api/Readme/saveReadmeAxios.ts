import axios from "axios";

export const saveReadmeAxios = (ACCESS_TOKEN: any, arr: any[]) => {
  return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/readme`, arr, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
