// import { useZustandStore } from "../../hooks/useZustand";
// import useThrottle from "../../hooks/useThrottle";
// import { useEffect } from "react";
import { motion } from "framer-motion";

export default function MobileMenu({ menuClose }) {
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
			subItems: ["PACKAGE", "EVENT"]
		},
		{
			title: "MEDIA",
			subItems: ["GALLERY", "YOUTUBE"]
		},
		{
			title: "CONTACT",
			subItems: ["Q&A", "FAQ"]
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
								<Link to={"CONTACT" === menu.title ? menu.title : "/"}>{menu.title}</Link>
							</h1>
							<ul className="A">
								{menu.subItems.map((subItem, idx) => (
									<li key={idx}>
										<Link
											to={
												subItem === "GALLERY"
													? "GALLERY"
													: subItem === "PACKAGE"
													? "PACKAGE"
													: subItem === "YOUTUBE"
													? "YOUTUBE"
													: "/"
											}>
											{subItem}
										</Link>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</nav>
		</motion.div>
	);
}
