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
	const evenMS = {
		transform: `translateX(${Scroll * 2 <= 0 ? Scroll * 2 : -Scroll * 2}px)`,
		opacity: `${Scroll * 1 <= 0 ? 1 + Scroll / 700 : 1 - Scroll / 500}`
	};

	const oddMS = {
		transform: `translateX(${-Scroll * 2 >= 0 ? -Scroll * 2 : Scroll * 2}px)`,
		opacity: `${Scroll * 1 <= 0 ? 1 + Scroll / 700 : 1 - Scroll / 500}`
	};
	return (
		<Layout title={"youtube"}>
			<Content delay={1}>
				{isPending && <p>Loading...</p>}
				<>
					{Vids?.map((vid, idx) => (
						<article
							key={idx}
							className={`youtubeBody ${idx % 2 === 0 ? "evenMS" : "oddMS"}`}
							style={idx % 2 === 0 ? evenMS : oddMS}>
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
