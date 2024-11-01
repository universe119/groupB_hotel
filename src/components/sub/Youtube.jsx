import Layout from "../common/Layout";
import Pic from "../common/Pic";
import useShortenText from "../../hooks/useShortenText";
import useCombineText from "../../hooks/useCombineText";
import { Link } from "react-router-dom";
import Content from "../common/Content";
import { useYoutubeQuery } from "../../hooks/useYoutube";
import { useEffect, useRef, useState } from "react";

export default function Youtube() {
	const shortenText = useShortenText();
	const combineText = useCombineText();

	// const ref_wrap = useRef(null);
	// const ref_posArr = useRef([]);

	// const MS = {
	// 	init: { opacity: 0, x: 200 },
	// 	active: { opacity: 1, x: 0 },
	// 	end: { opacity: 0, x: 200 }
	// }; customMotion={MS}
	// const evenMS = {
	// 	transform: `translateX(500px)`
	// };

	// const oddMS = {
	// 	transform: `translateX(-500px)`
	// };
	//${idx % 2 === 0 ? "evenMS" : "oddMS"} style={idx % 2 === 0 ? evenMS : oddMS}

	const { data: Vids, isPending } = useYoutubeQuery({ type: "A" });

	const [Scroll, setScroll] = useState(0);
	console.log(Scroll);

	const handleScroll = () => {
		setScroll(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Layout title={"YOUTUBE"}>
			<Content>
				{isPending && <p>Loading...</p>}
				<>
					{Vids?.map((vid, idx) => (
						<article key={idx} className={`youtubeBody`}>
							<h3 className={idx % 2 === 0 ? "evenTit" : "oddTit"}>
								<Link to={`/youtube/${vid.id}`}>{shortenText(vid.snippet.title, 60)}</Link>
							</h3>
							<div className={idx % 2 === 0 ? "evenTxt" : "oddTxt"}>
								<p>{shortenText(vid.snippet.description, 150)}</p>
								<span>{combineText(vid.snippet.publishedAt.split("T")[0], "-", ".")}</span>
							</div>
							<div className={idx % 2 === 0 ? "evenBox" : "oddBox"}></div>
							<Pic
								style={{ position: "absolute" }}
								className={idx % 2 === 0 ? "evenThumb" : "oddThumb"}
								src={vid.snippet.thumbnails.high.url}
							/>
						</article>
					))}
				</>
			</Content>
		</Layout>
	);
}
