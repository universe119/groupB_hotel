// import { useZustandStore } from "../../hooks/useZustand";
// import useThrottle from "../../hooks/useThrottle";
// import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileMenu({ menuClose }) {
	// 각 메뉴 항목의 하위 메뉴 상태를 관리하기 위한 상태 추가
	// const setMenuClose = useZustandStore(state => state.setMenuClose);

	// const closeMenu = () => {
	// 	console.log("closeMenu");

	// 	if (window.innerWidth <= 2000) setMenuClose();
	// };
	// const throttledCloseMenu = useThrottle(closeMenu);

	// useEffect(() => {
	// 	window.addEventListener("resize", throttledCloseMenu);

	// 	return () => window.removeEventListener("resize", throttledCloseMenu);
	// }, [throttledCloseMenu]);

	// 메뉴 열고 닫고 모션!
	const { initial, animate, exit, transition } = {
		initial: { y: -1200, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: -300, opacity: 0, transition: { duration: 0.3 } },
		transition: { duration: 0.5 }
	};

	// 상위 메뉴와 하위 메뉴 데이터를 배열로 정의
	const menuData = [
		{
			title: "HOME"
		},
		{
			title: "GALLERY"
		},
		{
			title: "YOUTUBE"
		},
		{
			title: "COMMUNITY"
		},
		{
			title: "CONTACT"
		},
		{
			title: "LOCATION"
		}
	];

	return (
		<motion.div className={"overlayMenu"} initial={initial} animate={animate} exit={exit} transition={transition}>
			<nav>
				<ul className="subMenuList">
					{menuData.map((menu, index) => (
						<li key={index} className="subMenu">
							<Link
								to={
									menu.title === "CONTACT"
										? menu.title.toLowerCase()
										: menu.title === "GALLERY"
										? menu.title.toLowerCase()
										: menu.title === "COMMUNITY"
										? menu.title.toLowerCase()
										: menu.title === "YOUTUBE"
										? menu.title.toLowerCase()
										: menu.title === "LOCATION"
										? menu.title.toLowerCase()
										: "/"
								}>
								<h1 style={{ cursor: "pointer" }} onClick={menuClose}>
									{menu.title}
								</h1>
							</Link>
							{/* <ul className="A">
								{menu.subItems.map((subItem, idx) => (
									<li key={idx}>
										<Link
											to={
												subItem === "GALLERY"
													? subItem.toLowerCase()
													: subItem == "COMMUNITY"
													? "COMMUNITY".toLowerCase()
													: subItem == "Q&A"
													? "COMMUNITY".toLowerCase()
													: subItem === "YOUTUBE"
													? subItem.toLowerCase()
													: subItem === "FAQ"
													? "CONTACT".toLowerCase()
													: "/"
											}>
											{subItem}
										</Link>
									</li>
								))}
							</ul> */}
						</li>
					))}
				</ul>
			</nav>
		</motion.div>
	);
}
