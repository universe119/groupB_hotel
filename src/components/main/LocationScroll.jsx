import useLocation from "../../hooks/useLocation";

export default function LocationScroll() {
	const { ref_mapFrame } = useLocation(false, false); // 교통량과 로드뷰 비활성화

	return (
		<section className="locationScroll">
			<h2>Location</h2>
			{/* 맵 프레임 */}
			<figure className="mapFrame" ref={ref_mapFrame}></figure>
		</section>
	);
}
