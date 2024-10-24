import { useState, useEffect, useRef } from "react";
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
	const scrollTimeoutRef = useRef(null); // 스크롤 딜레이 타이머
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
	// 페이지에 따른 스크롤 이동
	useEffect(() => {
		const handleWheelScroll = e => {
			if (scrollTimeoutRef.current) return;

			scrollTimeoutRef.current = setTimeout(() => {
				const newPage = currentPage + (e.deltaY > 0 ? 1 : -1);
				if (newPage >= 0 && newPage < totalPages) {
					setCurrentPage(newPage);
					window.scrollTo({ top: newPage * pageHeight, behavior: "smooth" });
				}
				scrollTimeoutRef.current = null;
			}, 100);
		};

		window.addEventListener("wheel", handleWheelScroll);

		return () => {
			window.removeEventListener("wheel", handleWheelScroll);
			clearTimeout(scrollTimeoutRef.current);
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
							initial={{ opacity: 0.4 }}
							animate={{
								opacity: currentPage === index ? 1 : 0.4
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
