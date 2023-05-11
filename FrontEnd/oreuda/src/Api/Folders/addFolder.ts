import axios from "axios";

export const AddFolder = (
  ACCESS_TOKEN: any,
  data: { name: String; color: String; repositories: Array<String> }
) => {
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
