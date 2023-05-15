import axios from "axios";

export const MoveRepository = (
  ACCESS_TOKEN: any,
  data: {
    nowFolderId: number;
    filtering: string;
    moveFolderId: number;
    repositories: string[];
  }
) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/repository`,
    data,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
