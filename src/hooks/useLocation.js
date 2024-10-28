// import { useEffect, useRef, useCallback } from "react";
// import useThrottle from "./useThrottle";

// export default function useLocation(Traffic, Roadview) {
// 	const { kakao } = window;

// 	const ref_info = useRef({
// 		title: "PSYH HOTEL",
// 		latlng: new kakao.maps.LatLng(37.545453, 127.057083),
// 		markerImg: "/hotelMaker.png",
// 		markerSize: new kakao.maps.Size(100, 100),
// 		markerOffset: { offset: new kakao.maps.Point(50, 100) }
// 	});

// 	const { latlng, markerImg, markerSize, markerOffset } = ref_info.current;
// 	const ref_instClient = useRef(new kakao.maps.RoadviewClient());
// 	const ref_instType = useRef(new kakao.maps.MapTypeControl());
// 	const ref_instZoom = useRef(new kakao.maps.ZoomControl());
// 	const ref_mapFrame = useRef(null);
// 	const ref_viewFrame = useRef(null);
// 	const ref_instMap = useRef(null);
// 	const ref_instMarker = useRef(null);
// 	const ref_instView = useRef(null);

// 	// 맵 초기화 함수
// 	const createMap = useCallback(() => {
// 		ref_mapFrame.current.innerHTML = "";
// 		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });

// 		// 기존 마커 생성
// 		ref_instMarker.current = new kakao.maps.Marker({
// 			position: latlng,
// 			image: new kakao.maps.MarkerImage(markerImg, markerSize, markerOffset)
// 		});
// 		ref_instMarker.current.setMap(ref_instMap.current); // 마커를 지도에 추가

// 		if (Roadview) {
// 			ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
// 			ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
// 		}

// 		[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
// 	}, [latlng, markerImg, markerSize, markerOffset, Roadview]);

// 	// 맵 위치 초기화 함수
// 	const initPos = useCallback(() => {
// 		ref_instMap.current.setCenter(latlng);
// 	}, [latlng]);

// 	const throttledInitPos = useThrottle(initPos);

// 	useEffect(() => {
// 		createMap();
// 		window.addEventListener("resize", throttledInitPos);
// 		return () => window.removeEventListener("resize", throttledInitPos);
// 	}, [throttledInitPos, createMap]);

// 	useEffect(() => {
// 		if (Traffic) {
// 			ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
// 		} else {
// 			ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
// 		}
// 	}, [Traffic]);

// 	return { ref_mapFrame, ref_viewFrame };
// }
import { useEffect, useRef, useCallback } from "react";
import useThrottle from "./useThrottle";

export default function useLocation({
	Traffic = true,
	Roadview = true,
	centerPosition,
	zoomLevel = 3,
	disableUI = false
}) {
	const { kakao } = window;

	const ref_info = useRef({
		title: "PSYH HOTEL",
		latlng: centerPosition || new kakao.maps.LatLng(37.545453, 127.057083),
		markerImg: "/hotelMaker.png",
		markerSize: new kakao.maps.Size(100, 100),
		markerOffset: { offset: new kakao.maps.Point(50, 100) }
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
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, {
			center: latlng,
			level: zoomLevel
		});

		// 마커 생성
		ref_instMarker.current = new kakao.maps.Marker({
			position: latlng,
			image: new kakao.maps.MarkerImage(markerImg, markerSize, markerOffset)
		});
		ref_instMarker.current.setMap(ref_instMap.current); // 마커를 지도에 추가

		// UI 옵션 설정
		if (disableUI) {
			ref_instMap.current.setZoomable(false); // 확대/축소 비활성화
			ref_instMap.current.setDraggable(false); // 드래그 비활성화
		} else {
			[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
		}

		// Roadview 설정
		if (Roadview) {
			ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
			ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
		}
	}, [latlng, markerImg, markerSize, markerOffset, Roadview, disableUI, zoomLevel]);

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
		if (Traffic) {
			ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		} else {
			ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	}, [Traffic]);

	return { ref_mapFrame, ref_viewFrame };
}
