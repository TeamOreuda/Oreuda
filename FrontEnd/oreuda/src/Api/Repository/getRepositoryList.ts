import axios from "axios";

export const GetRepositoryLst = async (ACCESS_TOKEN: any, folderId: number, filtering: String) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/repository/${folderId}?filtering=recent`,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};

// param	filtering	String	"필터링
// - recent(최신순)
// - commit(커밋순)
// - name(이름순)
// - star(별점순)"
