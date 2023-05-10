import axios from "axios";

export const GetFolderList = async (ACCESS_TOKEN: any) => {
  console.log("access", ACCESS_TOKEN);

  //   return await axios.get("http://192.168.31.233:9000/api/v1/users", {
  //     headers: {
  //       Authorization: ACCESS_TOKEN,
  //     },
  //   });
  //   return await axios.get("http://192.168.31.233:8070/api/v1/folder", {
  //     headers: {
  //       userId: "3a16c603-75ba-4b57-8628-cf155bd181ad",
  //     },
  //   });
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/folder`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
};
