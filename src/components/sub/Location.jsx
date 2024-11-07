import { useState } from "react";
import useLocation from "../../hooks/useLocation";
import Layout from "../common/Layout";
import Content from "../common/Content";

export default function Location() {
	const [Traffic, setTraffic] = useState(false);
	const [Roadview, setRoadview] = useState(false);

	// useLocation을 호출할 때 Traffic과 Roadview 상태를 객체로 전달
	const { ref_mapFrame, ref_viewFrame } = useLocation({ Traffic, Roadview });

	return (
		<Layout title="LOCATION">
			<Content>
				{/* Layout으로 Map 페이지 레이아웃 설정 */}
				<section className="location">
					{/* 맵과 로드뷰 프레임 */}
					<figure className={`mapFrame-wrap ${Roadview && "viewOn"}`}>
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
					<article>
						<h1>오시는 길</h1>
						<div className="transportation">
							<div className="subway">
								<h2>지하철역</h2>

								<div className="detailSub">
									<h3>성수역 2번 출구</h3>
									<p>도보 1분</p>
									<h3>뚝섬역 4번 출구</h3>
									<p>도보 15분</p>
								</div>
							</div>

							<div className="bus">
								<h2>버스정류장</h2>
								<div className="detailBus">
									<h3>왕십리역 9번 출구</h3>
									<p>2016번 10분</p>
									<h3>건대입구역 2번 출구</h3>
									<p>2016번 10분</p>
								</div>
							</div>
						</div>
						<div className="reservation">
							<h2>Reservation</h2>
							<p>e-mail: resevation@psyhhotel.com</p>
							<p>tel: 02-123-4567</p>
						</div>
					</article>
				</section>
			</Content>
		</Layout>
	);
}
