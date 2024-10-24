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
	const [scrollY, setScrollY] = useState(0); // 스크롤 Y 위치 상태
	const totalPages = 3; // 페이지 수 설정
	const scrollTimeoutRef = useRef(null); // 스크롤 딜레이 타이머
	const isThrottled = useRef(false); // 스로틀링 제어 플래그

	// 스로틀링 적용 함수 (100ms 간격으로만 이벤트 처리)
	const throttle = (func, delay) => {
		if (isThrottled.current) return;
		isThrottled.current = true;
		func();

		setTimeout(() => {
			isThrottled.current = false;
		}, delay);
	};

	// 스크롤 휠 및 드래그 이벤트 처리
	const handleScroll = () => {
		throttle(() => {
			const newScrollY = window.scrollY;
			const pageHeight = window.innerHeight;

			// 스크롤바를 드래그하여 이동할 때 처리
			const newPage = Math.round(newScrollY / pageHeight);
			if (newPage !== currentPage) {
				setCurrentPage(newPage);
			}

			setScrollY(newScrollY); // 스크롤 위치 업데이트
		}, 1000); // 100ms 간격으로 이벤트 처리
	};

	// 스크롤 휠 이벤트 핸들러
	const handleWheel = e => {
		if (isThrottled.current) return; // 딜레이 동안 추가 스크롤 이벤트 무시

		throttle(() => {
			if (e.deltaY > 0) {
				// 스크롤 다운
				setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
			} else {
				// 스크롤 업
				setCurrentPage(prev => Math.max(prev - 1, 0));
			}
		}, 100); // 100ms 간격으로 휠 스크롤 처리
	};

	const handleClick = pageIndex => {
		setCurrentPage(pageIndex);
	};

	useEffect(() => {
		window.addEventListener("wheel", handleWheel); // 휠 스크롤 이벤트 등록
		window.addEventListener("scroll", handleScroll); // 스크롤바 드래그 이벤트 등록

		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("scroll", handleScroll);
			clearTimeout(scrollTimeoutRef.current); // 타이머 해제
		};
	}, [currentPage]);

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
		<>
			{/* 페이지 콘텐츠 */}
			<motion.div
				className="container"
				animate={{ y: `-${scrollY}px` }} // 스크롤 Y값에 따라 Y축 이동
				transition={{ duration: 0.5, ease: "easeInOut" }} // 부드러운 페이지 전환
			>
				{/* HomeVisual */}
				<HomeVisual />

				{/* Offers */}
				<Offers />

				{/* Lounge */}
				<Lounge />

				{/* Hotels */}
				<Hotels />

				{/* RetailBusiness */}
				<RetailBusiness />
			</motion.div>

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
		</>
	);
}
