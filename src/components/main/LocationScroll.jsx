import useLocation from "../../hooks/useLocation";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function LocationScroll({ Sc, pos }) {
	const currentScroll = Sc - pos || 0;

	const locationTxtMs = {
		transform: `translateY(${currentScroll / 1.5 <= 0 ? currentScroll / 1.5 : 0}px)`,
		opacity: `${currentScroll / 1.5 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

	const mapFrameMS = {
		transform: `translateY(${currentScroll / 1.5 <= 0 ? currentScroll / 1.5 : 0}px)`,
		opacity: `${currentScroll / 1.5 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

	const centerPosition = new window.kakao.maps.LatLng(37.545453, 127.057083); // 원하는 위치
	const zoomLevel = 3; // 고정 확대 값

	// useLocation에서 Traffic, Roadview를 false로 설정하고 UI 비활성화 옵션을 켬
	const { ref_mapFrame } = useLocation({
		Traffic: false,
		Roadview: false,
		centerPosition: centerPosition,
		zoomLevel: zoomLevel,
		disableUI: true
	});

	return (
		<section className="locationScroll">
			<div className="locationTxt" style={locationTxtMs}>
				<h2>Location</h2>
				<Link to={"/location"} className={"locationLink"}>
					Details
					<FaRegArrowAltCircleRight className={"detailIcon"} />
				</Link>
			</div>
			<div className="mapFrame" ref={ref_mapFrame} style={mapFrameMS}></div>
		</section>
	);
}
