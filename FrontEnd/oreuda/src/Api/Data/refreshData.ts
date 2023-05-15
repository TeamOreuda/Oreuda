import axios from "axios";

export const RefreshData = (ACCESS_TOKEN: any) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data`,
    {},
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
