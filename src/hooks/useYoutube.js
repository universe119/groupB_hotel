import { useQuery } from "@tanstack/react-query";

const fetchYoutube = async ({ queryKey }) => {
	const api_key = import.meta.env.VITE_YOUTUBE_API;
	const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";
	const pidA = "PL7dKBcBdt1ldrNpVr08MqwqqpWiADDMI0";
	const num = 10;
	let url = "";
	const urlA = `${baseURL}?part=snippet&playlistId=${pidA}&key=${api_key}&maxResults=${num}`;

	//전달된 queryKey 옵션값에 따라서 최종 요청 url변형후 fetch요청
	queryKey[1].type === "A" && (url = urlA);

	const data = await fetch(url);
	const json = await data.json();
	return json.items;
};

//useQuery기능이 내장된 실제 호출될 커스텀훅
export const useYoutubeQuery = (opt = { type: "A" }) => {
	return useQuery({
		//결과적으로 커스텀훅 호출시 옵션값을 쿼리키 배열의 두번쨰요소에 등록하면, 해당 옵션값에 따른 고유쿼리키가 자동 생성
		queryKey: ["youtubeList", opt],
		queryFn: fetchYoutube,
		staleTime: 1000 * 60,
		gcTime: 1000 * 60
	});
};
