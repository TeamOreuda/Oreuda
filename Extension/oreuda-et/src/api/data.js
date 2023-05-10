import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const renewalData = async (atk) => {
  await axios.patch(`${url}/api/v1/data`, {
    headers: {
      Authorization: atk,
    },
  });
};

export { renewalData };
