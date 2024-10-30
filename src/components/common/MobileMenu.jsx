// import { useZustandStore } from "../../hooks/useZustand";
// import useThrottle from "../../hooks/useThrottle";
// import { useEffect } from "react";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function MobileMenu({ menuClose }) {
	const navigate = useNavigate();
	const location = useLocation();

	const ref_sections = {
		OFFERS: useRef(null),
		CONTACT: useRef(null)
	};

	// 특정 섹션으로 스크롤
	const scrollToSection = section => {
		const element = ref_sections[section]?.current;
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	// location이 변경될 때 스크롤 동작
	useEffect(() => {
		if (location.state && location.state.section) {
			scrollToSection(location.state.section);
		}
	}, [location]);

	// 각 메뉴 항목의 하위 메뉴 상태를 관리하기 위한 상태 추가
	// const setMenuClose = useZustandStore(state => state.setMenuClose);

	// 메뉴 열고 닫고 모션!
	const { initial, animate, exit, transition } = {
		initial: { y: -1200, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: -300, opacity: 0, transition: { duration: 0.3 } },
		transition: { duration: 0.5 }
	};

	// const closeMenu = () => {
	// 	console.log("closeMenu");

	// 	if (window.innerWidth >= 2000) setMenuClose();
	// };
	// const throttledCloseMenu = useThrottle(closeMenu);

	// useEffect(() => {
	// 	window.addEventListener("resize", throttledCloseMenu);

	// 	return () => window.removeEventListener("resize", throttledCloseMenu);
	// }, [throttledCloseMenu]);

	// 상위 메뉴와 하위 메뉴 데이터를 배열로 정의
	const menuData = [
		{
			title: "ABOUT US",
			subItems: ["INTRODUCE", "PSYH NEWS"]
		},
		{
			title: "ROOMS",
			subItems: ["SWEET", "DELUXE", "STANDARD"]
		},
		{
			title: "FACILITIES",
			subItems: ["POOLS", "GYM", "RESTAURANT"]
		},
		{
			title: "OFFERS",
			subItems: ["COMMUNITY", "EVENT"]
		},
		{
			title: "MEDIA",
			subItems: ["GALLERY", "YOUTUBE"]
		},
		{
			title: "CONTACT",
			subItems: ["LOCATION", "Q&A", "FAQ"]
		}
	];

	return (
		<motion.div
			className={"overlayMenu"}
			onClick={menuClose}
			initial={initial}
			animate={animate}
			exit={exit}
			transition={transition}>
			<nav>
				<ul className="subMenuList">
					{menuData.map((menu, index) => (
						<li key={index} className="subMenu">
							<h1 style={{ cursor: "pointer" }}>
								<Link
									to={"/"}
									state={{ section: menu.title }}

									// {menu.title === "CONTACT" ? menu.title : menu.title === "MEDIA" ? "GALLERY" : "/"}
								>
									{menu.title}
								</Link>
							</h1>
							<ul className="A">
								{menu.subItems.map((subItem, idx) => (
									<li key={idx}>
										<Link
											to={"/"}
											state={{ section: subItem }}
											// {
											// 	subItem === "GALLERY"
											// 		? subItem
											// 		: subItem == "COMMUNITY"
											// 		? "COMMUNITY"
											// 		: subItem == "Q&A"
											// 		? "COMMUNITY"
											// 		: subItem === "YOUTUBE"
											// 		? subItem
											// 		: subItem === "LOCATION"
											// 		? subItem
											// 		: subItem === "FAQ"
											// 		? "CONTACT"
											// 		: "/"
											// }
										>
											{subItem}
										</Link>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
				{/* 스크롤 대상 섹션 */}
				{/* <div ref={ref_sections.OFFERS} id="OFFERS">
					OFFERS
				</div>
				<div ref={ref_sections.CONTACT} id="CONTACT">
					CONTACT
				</div> */}
				{/* 다른 섹션 추가 */}
			</nav>
		</motion.div>
	);
}

// import React, { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// export default function MobileMenu({ menuClose }) {
// 	const navigate = useNavigate();
// 	const location = useLocation();

// 	// 이동 후 스크롤할 섹션 참조
// 	const sectionsRef = useRef({
// 		INTRODUCE: null,
// 		"PSYH NEWS": null,
// 		SWEET: null,
// 		"ABOUT US": null,
// 		OFFERS: null
// 	});

// 	const menuData = [
// 		{
// 			title: "ABOUT US",
// 			subItems: ["INTRODUCE", "PSYH NEWS"]
// 		},
// 		{
// 			title: "ROOMS",
// 			subItems: ["SWEET", "DELUXE", "STANDARD"]
// 		},
// 		{
// 			title: "FACILITIES",
// 			subItems: ["POOLS", "GYM", "RESTAURANT"]
// 		},
// 		{
// 			title: "OFFERS",
// 			subItems: ["COMMUNITY", "EVENT"]
// 		},
// 		{
// 			title: "MEDIA",
// 			subItems: ["GALLERY", "YOUTUBE"]
// 		},
// 		{
// 			title: "CONTACT",
// 			subItems: ["LOCATION", "Q&A", "FAQ"]
// 		}
// 	];

// 	useEffect(() => {
// 		// 특정 위치로 스크롤하는 로직
// 		const scrollToSection = section => {
// 			const element = sectionsRef.current[section];
// 			if (element) {
// 				element.scrollIntoView({ behavior: "smooth" });
// 			}
// 		};

// 		// location.pathname이 변경될 때마다 스크롤 실행
// 		if (location.state && location.state.section) {
// 			scrollToSection(location.state.section);
// 		}
// 	}, [location]);

// 	const handleLinkClick = section => {
// 		// 섹션으로 이동 후 스크롤할 위치를 설정
// 		navigate(`/${section}`, { state: { section } });
// 		menuClose(); // 메뉴 닫기
// 	};

// 	return (
// 		<motion.div
// 			className={"overlayMenu"}
// 			onClick={menuClose}
// 			initial={{ y: -1200, opacity: 0 }}
// 			animate={{ y: 0, opacity: 1 }}
// 			exit={{ y: -300, opacity: 0, transition: { duration: 0.3 } }}
// 			transition={{ duration: 0.5 }}>
// 			<nav>
// 				<ul className="subMenuList">
// 					{menuData.map((menu, index) => (
// 						<li key={index} className="subMenu">
// 							<h1 style={{ cursor: "pointer" }}>
// 								<Link to="/" onClick={() => handleLinkClick(menu.title)}>
// 									{menu.title}
// 								</Link>
// 							</h1>
// 							<ul className="A">
// 								{menu.subItems.map((subItem, idx) => (
// 									<li key={idx}>
// 										<button onClick={() => handleLinkClick(subItem)}>{subItem}</button>
// 									</li>
// 								))}
// 							</ul>
// 						</li>
// 					))}
// 				</ul>
// 			</nav>
// 		</motion.div>
// 	);
// }
