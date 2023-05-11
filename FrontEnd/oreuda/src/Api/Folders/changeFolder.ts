import axios from "axios";

export const ChangeFolder = (ACCESS_TOKEN: any, folderId: number, order: number) => {
  console.log(folderId, order);

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder/rearrange`,
    { id: folderId, order: order },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
