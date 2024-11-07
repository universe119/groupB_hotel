// import { useZustandStore } from "../../hooks/useZustand";
// import useThrottle from "../../hooks/useThrottle";
// import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileMenu({ menuClose }) {
	// 메뉴 열고 닫고 모션!
	const { initial, animate, exit, transition } = {
		initial: { y: -1200, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: -300, opacity: 0, transition: { duration: 0.3 } },
		transition: { duration: 0.5 }
	};

	// 상위 메뉴와 하위 메뉴 데이터를 배열로 정의
	const menuData = ["HOME", "GALLERY", "YOUTUBE", "COMMUNITY", "CONTACT", "LOCATION"];

	return (
		<motion.div className={"overlayMenu"} initial={initial} animate={animate} exit={exit} transition={transition}>
			<nav>
				<ul className="subMenuList">
					{menuData.map((menu, index) => (
						<li key={index} className="subMenu">
							<Link
								to={
									menu === "CONTACT"
										? menu.toLowerCase()
										: menu === "GALLERY"
										? menu.toLowerCase()
										: menu === "COMMUNITY"
										? menu.toLowerCase()
										: menu === "YOUTUBE"
										? menu.toLowerCase()
										: menu === "LOCATION"
										? menu.toLowerCase()
										: "/"
								}>
								<h1 style={{ cursor: "pointer" }} onClick={menuClose}>
									{menu}
								</h1>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</motion.div>
	);
}
