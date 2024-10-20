import ky from "ky";
import { useQuery} from "react-query";

type Response = {
    music_url:         string;
    video_author:      string;
    video_description: string;
    filename:          string;
    slides_url:        string[];
}

export function useGetData(url: string) {
  return useQuery(
    ["shots", url],
    async () =>
      await ky
        .get<Response>(
          `https://tikslides-scraper.vercel.app/from-slideshow?url=${url}`
        )
        .then((res) => res.json()),
    // fetch(
    //   `https://api.dribbble.com/v2/user/shots?access_token=${access_token}&page=${input.page}&per_page=4`
    // ).then((res) => res.json())
  );
}