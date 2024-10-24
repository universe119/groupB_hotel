import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HomeScroll() {
	const sideMenuArr = ["Home", "Offers", "Lounge", "Hotels", "Retail Business"];
	const [currentPage, setCurrentPage] = useState(0);
	const [scrollY, setScrollY] = useState(0); // 스크롤 Y 위치 상태
	const totalPages = sideMenuArr.length; // 페이지 수 설정

	const handleScroll = e => {
		if (e.deltaY > 0) {
			// 스크롤 다운
			setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
		} else {
			// 스크롤 업
			setCurrentPage(prev => Math.max(prev - 1, 0));
		}
	};

	const handleClick = pageIndex => {
		setCurrentPage(pageIndex);
	};

	// 스크롤 Y 값 추적
	const updateScrollY = () => {
		setScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("wheel", handleScroll);
		window.addEventListener("scroll", updateScrollY); // 스크롤 위치 추적

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("scroll", updateScrollY);
		};
	}, []);

	// 페이지에 따른 스크롤 이동
	useEffect(() => {
		window.scrollTo({ top: currentPage * window.innerHeight, behavior: "smooth" });
	}, [currentPage]);

	return (
		// <div className="mainScroll">
		// 	<ul className="homeScroll">
		// 		{sideMenuArr.map((data, idx) => {
		// 			return (
		// 				<li key={idx} style={{ top: 40 * idx }}>
		// 					{data}
		// 				</li>
		// 			);
		// 		})}
		// 	</ul>
		// </div>

		<div style={{ display: "flex" }}>
			{/* 왼쪽 내비게이션 바 */}
			<div className="navigator">
				{sideMenuArr.map((page, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0.5 }}
						animate={{
							opacity: currentPage === index ? 1 : 0.5, // 활성화된 페이지에 따라 투명도 변화
							x: currentPage === index ? 0 : -20 // 페이지 전환 시 이동 효과
						}}
						transition={{ duration: 0.3 }}
						className={currentPage === index ? "active" : ""}
						onClick={() => handleClick(index)} // 클릭 이벤트로 페이지 이동
						style={{ cursor: "pointer" }}>
						<span>{page}</span>
					</motion.div>
				))}
			</div>

			{/* 페이지 콘텐츠 */}
			<motion.div
				className="container"
				animate={{ y: `-${scrollY}px` }} // 스크롤 Y값에 따라 Y축 이동
				transition={{ duration: 0.5, ease: "easeInOut" }} // 부드러운 페이지 전환
			>
				<div className="page">Page 1</div>
				<div className="page">Page 2</div>
				<div className="page">Page 3</div>
			</motion.div>
		</div>
	);
}
