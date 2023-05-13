import axios from "axios";

export const DeleteFolder = (ACCESS_TOKEN: any, folders: Array<number>) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder/delete`,
    folders,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
