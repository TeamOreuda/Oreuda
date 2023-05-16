import axios from "axios";

export const EditFolderInfo = (ACCESS_TOKEN: any, id: number, name: string, color: string) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder`,
    { id: id, name: name, color: color },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
