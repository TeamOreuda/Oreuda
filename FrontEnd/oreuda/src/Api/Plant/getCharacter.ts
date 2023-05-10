import axios from "axios";

export const GetCharacter = async (ACCESS_TOKEN: any) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plant`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
