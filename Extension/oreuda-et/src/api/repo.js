import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const getRepoList = async (atk, id) => {
  const response = await axios.get(
    `${url}/api/v1/repository/${id}?filtering=recent`,
    {
      headers: {
        Authorization: atk,
      },
    }
  );
  console.log(response)
  return response.data;
};

const moveFolder = async (atk, currentFolderID, targetFolderID, repoList) => {
  const response = await axios.patch(
    `${url}/api/v1/repository`,
    {
      nowFolderId: currentFolderID,
      filtering: "recent",
      moveFolderId: targetFolderID,
      repositories: repoList,
    },
    {
      headers: {
        Authorization: atk,
      },
    }
  );
  return response.data;
};

export { getRepoList, moveFolder };
