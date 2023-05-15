import axios from "axios";

export const getRegisteredUser = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/main/ru`);
};
