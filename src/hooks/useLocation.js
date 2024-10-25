import { useEffect, useRef, useCallback } from "react";
import useThrottle from "./useThrottle";

export default function useLocation(Traffic) {
	//, Roadview, setTraffic, setRoadview) {
	const { kakao } = window;

	const ref_info = useRef({
		title: "PSYH HOTEL",
		latlng: new kakao.maps.LatLng(37.545453, 127.057083),
		markerImg: "/maker수정.png", // 이미지 수정
		markerSize: new kakao.maps.Size(200, 200),
		markerOffset: { offset: new kakao.maps.Point(100, 200) }
	});

	const { latlng, markerImg, markerSize, markerOffset } = ref_info.current;
	const ref_instClient = useRef(new kakao.maps.RoadviewClient());
	const ref_instType = useRef(new kakao.maps.MapTypeControl());
	const ref_instZoom = useRef(new kakao.maps.ZoomControl());
	const ref_mapFrame = useRef(null);
	const ref_viewFrame = useRef(null);
	const ref_instMap = useRef(null);
	const ref_instMarker = useRef(null);
	const ref_instView = useRef(null);

	// 맵 초기화 함수
	const createMap = useCallback(() => {
		ref_mapFrame.current.innerHTML = "";
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		ref_instMarker.current = new kakao.maps.Marker({
			position: latlng,
			image: new kakao.maps.MarkerImage(markerImg, markerSize, markerOffset)
		});
		ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
		ref_instMarker.current.setMap(ref_instMap.current);

		[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
		ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
	}, [kakao, latlng, markerImg, markerSize, markerOffset]);

	// 맵 위치 초기화 함수
	const initPos = useCallback(() => {
		ref_instMap.current.setCenter(latlng);
	}, [latlng]);

	const throttledInitPos = useThrottle(initPos);

	useEffect(() => {
		createMap();
		window.addEventListener("resize", throttledInitPos);
		return () => window.removeEventListener("resize", throttledInitPos);
	}, [throttledInitPos, createMap]);

	useEffect(() => {
		Traffic
			? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);

	return { ref_mapFrame, ref_viewFrame };
}
