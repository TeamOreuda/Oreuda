import axios from "axios";

export const GetFolderList = (ACCESS_TOKEN: any) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
