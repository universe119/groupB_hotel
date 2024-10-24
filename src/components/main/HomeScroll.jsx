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

	// 페이지에 따른 스크롤 이동
	useEffect(() => {
		const handleScroll = e => {
			if (scrollTimeoutRef.current) return; // 이미 타이머가 설정되어 있으면 무시

			scrollTimeoutRef.current = setTimeout(() => {
				const newPage = currentPage + (e.deltaY > 0 ? 1 : -1);
				if (newPage >= 0 && newPage < totalPages) {
					setCurrentPage(newPage);
					window.scrollTo({ top: newPage * window.innerHeight, behavior: "smooth" });
				}
				scrollTimeoutRef.current = null; // 타이머 초기화
			}, 100); // 100ms 간격
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			clearTimeout(scrollTimeoutRef.current); // 타이머 해제
		};
	}, [currentPage]);

	return (
		<>
			{/* 페이지 콘텐츠 */}
			{/* 모션 넣을시 스크롤 밖으로 나가버리는현상 <motion.div 
				className="container"
				animate={{ y: `-${currentPage * window.innerHeight}px` }} // Y축 이동
				transition={{ duration: 0.5, ease: "easeInOut" }} // 부드러운 페이지 전환
			> */}
			<div className="container">
				<HomeVisual />
				<Offers />
				<Lounge />
				<Hotels />
				<RetailBusiness />
			</div>
			{/* </motion.div> */}

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
								window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
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
