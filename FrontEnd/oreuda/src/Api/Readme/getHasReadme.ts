import axios from "axios";

export const GetHasReadme = (ACCESS_TOKEN: any) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/readme/어쩌구저쩌구`,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};
