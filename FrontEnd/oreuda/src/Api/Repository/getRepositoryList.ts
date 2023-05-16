import axios from "axios";

export const GetRepositoryLst = (ACCESS_TOKEN: any, folderId: number, filtering: String) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/repository/${folderId}?filtering=${filtering}`,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
