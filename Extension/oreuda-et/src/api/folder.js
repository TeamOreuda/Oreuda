import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const getFolderList = async (atk) => {
  const response = await axios.get(`${url}/api/v1/folder`, {
    headers: {
      Authorization: atk,
    },
  });
  return response.data;
};

const rearrangeFolder = async (atk, id, order) => {
  const response = await axios.patch(
    `${url}/api/v1/folder/rearrange`,
    {
      id: id,
      order: order,
    },
    {
      headers: {
        Authorization: atk,
      },
    }
  );
  return response.data;
};

export { getFolderList, rearrangeFolder };
