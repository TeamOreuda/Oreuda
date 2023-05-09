import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const getUserInfo = async (atk) => {
  const response = await axios
    .get(`${url}/api/v1/users`, {
      headers: {
        Authorization: atk,
      },
    })
    return response.data;
};

export { getUserInfo };
