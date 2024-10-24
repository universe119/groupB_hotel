import Pic from "../common/Pic";

export default function HomeVisual() {
	return (
		<figure className="homeVisual">
			<Pic
				className={"homeBg"}
				src={"./a.jpg"}
				style={{ width: "100%", height: "100%", position: "absolute", opacity: 0.8 }}
			/>

			<div className="slogan">
				<article>
					<h2>Experience the Difference</h2>
				</article>
			</div>
		</figure>
	);
}
