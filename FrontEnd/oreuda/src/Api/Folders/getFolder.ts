import axios from "axios";

export const GetFolder = (ACCESS_TOKEN: any, folderId: number) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder/${folderId}`,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
