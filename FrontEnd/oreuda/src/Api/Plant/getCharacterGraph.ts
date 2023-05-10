import axios from "axios";

export const GetCharacterGraph = async (ACCESS_TOKEN: any) => {
  const res = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plant/graph`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });

  return res;
};
