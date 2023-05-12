import axios from "axios";

export const MoveRepository = (
  ACCESS_TOKEN: any,
  folderId: number,
  filtering: string,
  moveFolderId: number,
  repositories: string[]
) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder/rearrange`,
    {
      nowFolderId: folderId,
      filtering: filtering,
      moveFolderId: moveFolderId,
      repositories: repositories,
    },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
