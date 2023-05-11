import axios from "axios";

export const DeleteFolder = (ACCESS_TOKEN: any, data: { folders: Array<number> }) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder/delete`,
    { data },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
