import Pic from "../common/Pic";

export default function Visual() {
	return (
		<figure className="visual">
			{/* 이미지 추가해야함 */}
			<Pic className={"homeBg"} src={"./morning.jpg"} style={{ width: "100%", height: "100%", opacity: 0.7 }} />

			<div className="slogan">
				<article>
					<h2>Experience the Difference</h2>
				</article>
			</div>
		</figure>
	);
}
