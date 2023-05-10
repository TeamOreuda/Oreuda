import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const renewalDataFromGit = async (atk) => {
  const response = await axios.patch(`${url}/api/v1/data`, {}, {
    headers: {
      Authorization: atk,
    },
  });
  return response;
};

export { renewalDataFromGit };
