import axios from "axios";

export const AddFolderAxios = (
  ACCESS_TOKEN: any,
  name: String,
  color: String,
  repositories: Array<String>
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder`,
    { name: name, color: color, repositories: repositories },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
