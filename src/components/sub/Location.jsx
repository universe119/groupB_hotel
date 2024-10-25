import { useState } from "react";
import useLocation from "../../hooks/useLocation";
import Layout from "../common/Layout";

export default function Location() {
	const [Traffic, setTraffic] = useState(false);
	const [Roadview, setRoadview] = useState(false);

	const { ref_mapFrame, ref_viewFrame } = useLocation(Traffic, Roadview, setTraffic, setRoadview);

	return (
		<Layout title="Map">
			{" "}
			{/* Layout으로 Map 페이지 레이아웃 설정 */}
			<section className="map">
				<h2>Location</h2>

				{/* 맵과 로드뷰 프레임 */}
				<figure className="mapFrame">
					<article ref={ref_mapFrame} className={`mapFrame ${!Roadview && "on"}`}></article>
					<article ref={ref_viewFrame} className={`viewFrame ${Roadview && "on"}`}></article>
				</figure>

				{/* 컨트롤 버튼 모음 */}
				<nav className="btnSet">
					<ul className="btnToggleSet">
						<li onClick={() => setTraffic(!Traffic)} className={Traffic ? "on" : ""}>
							{`Traffic ${Traffic ? "OFF" : "ON"}`}
						</li>
						<li onClick={() => setRoadview(!Roadview)} className={Roadview ? "on" : ""}>
							{`Roadview ${Roadview ? "OFF" : "ON"}`}
						</li>
					</ul>
				</nav>
			</section>
		</Layout>
	);
}
