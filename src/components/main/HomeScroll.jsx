import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HomeVisual from "./HomeVisual";
import Offers from "./Offers";
import Lounge from "./Lounge";
import Hotels from "./Hotels";
import RetailBusiness from "./RetailBusiness";

export default function HomeScroll() {
	const sideMenuArr = ["Home", "Offers", "Lounge", "Hotels", "Retail Business"];
	const [currentPage, setCurrentPage] = useState(0);
	const totalPages = sideMenuArr.length; // 페이지 수는 메뉴 항목 수와 같음
	const pageHeight = window.innerHeight;

	// 스크롤 위치에 따라 currentPage 업데이트
	useEffect(() => {
		const handleScroll = () => {
			const newPage = Math.round(window.scrollY / pageHeight);
			setCurrentPage(newPage);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pageHeight]);

	// 스크롤 이동 최적화
	useEffect(() => {
		let scrollTimeoutRef = null; // 스크롤 중복 방지
		const handleWheelScroll = e => {
			if (scrollTimeoutRef) return; // 이미 스크롤 중이면 무시

			scrollTimeoutRef = requestAnimationFrame(() => {
				const newPage = currentPage + (e.deltaY > 0 ? 1 : -1); // 휠 방향에 따라 페이지 이동
				if (newPage >= 0 && newPage < totalPages) {
					setCurrentPage(newPage);
					window.scrollTo({ top: newPage * pageHeight, behavior: "smooth" });
				}
				scrollTimeoutRef = null; // 타이머 초기화
			});
		};

		window.addEventListener("wheel", handleWheelScroll);

		return () => {
			window.removeEventListener("wheel", handleWheelScroll);
			if (scrollTimeoutRef) cancelAnimationFrame(scrollTimeoutRef); // 타이머 해제
		};
	}, [currentPage, totalPages, pageHeight]);

	return (
		<>
			{/* 페이지 콘텐츠 */}
			<div className="container">
				<HomeVisual />
				<Offers />
				<Lounge />
				<Hotels />
				<RetailBusiness />
			</div>

			{/* 왼쪽 내비게이션 바 */}
			<div className="mainNavigator">
				<div className="navigator">
					{sideMenuArr.map((page, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0.5 }}
							animate={{
								opacity: currentPage === index ? 1 : 0.5
							}}
							transition={{ duration: 0.3 }}
							className={currentPage === index ? "spanEl active" : "spanEl"}
							onClick={() => {
								setCurrentPage(index);
								window.scrollTo({ top: index * pageHeight, behavior: "smooth" });
							}}
							style={{ cursor: "pointer", top: 40 * index }}>
							<span>{page}</span>
						</motion.div>
					))}
				</div>
			</div>
		</>
	);
}
