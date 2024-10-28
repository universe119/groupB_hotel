import useLocation from "../../hooks/useLocation";

export default function LocationScroll() {
	const centerPosition = new window.kakao.maps.LatLng(37.545453, 127.057083); // 원하는 위치
	const zoomLevel = 2; // 고정 확대 값

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
			<h2>Location</h2>
			<div ref={ref_mapFrame} style={{ width: "100%", height: "500px" }}>
				{/* 지도가 표시될 div */}
			</div>
		</section>
	);
}
