import axios from "axios";

export const GetFolderList = async (ACCESS_TOKEN: any) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
