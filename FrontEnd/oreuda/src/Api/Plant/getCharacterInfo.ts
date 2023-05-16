import axios from "axios";

export const GetCharacterInfo = async (ACCESS_TOKEN: any) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plant/info`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
