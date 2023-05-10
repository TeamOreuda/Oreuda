import axios from "axios";

export const DeleteFolderList = async (ACCESS_TOKEN: any, data: { folders: Array<number> }) => {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder/delete`,
    { data },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
