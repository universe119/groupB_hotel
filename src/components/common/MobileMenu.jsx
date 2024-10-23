import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
	// 각 메뉴 항목의 하위 메뉴 상태를 관리하기 위한 상태 추가
	const [subMenuOpen, setSubMenuOpen] = useState({});

	const toggleSubMenu = index => {
		setSubMenuOpen(prev => ({
			...prev,
			[index]: !prev[index]
		}));
	};

	// 메뉴 항목과 하위 메뉴를 객체 배열로 정의
	const menuItems = [
		{
			title: "ABOUT US",
			subItems: ["History", "News", "Location"]
		},
		{
			title: "HOTELS",
			subItems: ["Sweet Room", "Deluxe Room", "Standard Room"]
		},
		{
			title: "OFFERS",
			subItems: ["Package", "Event"]
		},
		{
			title: "MEMBERSHIP",
			subItems: ["PSYH Family", ""]
		},
		// {
		// 	title: "MY PAGE",
		// 	subItems: ["Profile", "Settings"]
		// },
		{
			title: "FACILITIES",
			subItems: ["Pool", "Gym", "Restaurant"]
		},
		{
			title: "CUSTOMER SERVICE",
			subItems: ["Q&A", "FAQ"]
		}
		// {
		// 	title: "LOUNGE",
		// 	subItems: ["VIP Lounge", "Regular Lounge"]
		// }
	];

	return (
		<div className="mobileMenu">
			MobileMenu
			{/* toggle */}
			<article className="btnToggle">
				<div className="top"></div>
				<div className="middle"></div>
				<div className="bottom"></div>
			</article>
			{/* mobile panel */}
			<nav className="mobilePanel">
				<ul>
					{menuItems.map((item, index) => (
						<li key={index}>
							{/* menuItems 토글기능으로 하위메뉴 보이게 설정 */}
							<button onClick={() => toggleSubMenu(index)}>{item.title}</button>
							{subMenuOpen[index] &&
								item.subItems.length > 0 && ( // 하위 메뉴가 있을 때만 표시
									<ul className="subMenu">
										{item.subItems.map((subItem, subIndex) => (
											<li key={subIndex}>
												<Link to="/">{subItem}</Link>
											</li>
										))}
									</ul>
								)}
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
