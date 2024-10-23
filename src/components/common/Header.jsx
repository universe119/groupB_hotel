import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";

export default function Header() {
	const { pathname } = useLocation();

	// 상단좌측메뉴
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const gnbLArr = ["MEMBERSHIP", "PACKAGE"];
	const gnbRArr = ["GALLERY", "YOUTUBE", "CONTACT"];

	// 상단좌측메뉴 토글,,,설정,,,,?
	const toggleMenu = () => {
		setIsMenuOpen(prev => !prev);
	};

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
		<>
			<header className={`header ${pathname === "/" && "main"}`}>
				<div className="topUtil">
					{/* <button onClick={toggleMenu}>상단좌측메뉴버튼</button> */}
					<button className={`btnDetailMenu ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
						<span className="top"></span>
						<span className="middle"></span>
						<span className="bottom"></span>
					</button>
				</div>

				<nav>
					<ul className="gnbL">
						{gnbLArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === "/" + data ? "on" : ""}>
									<Link to={"/" + data}>{data.toUpperCase()}</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<h1>
					<Link to={"/"}>psyh Hotel</Link>
				</h1>

				<nav>
					<ul className="gnbR">
						{gnbRArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === "/" + data ? "on" : ""}>
									<Link to={"/" + data}>{data.toUpperCase()}</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</header>

			<div className={`overlayMenu ${isMenuOpen ? "open" : ""}`}>
				<nav>
					<ul className="subMenuList">
						{menuData.map((menu, index) => (
							<li key={index} className="subMenu">
								<h1>{menu.title}</h1>
								<ul className="A">
									{menu.subItems.map((subItem, idx) => (
										<li key={idx}>
											<Link to={`/${subItem.toLowerCase()}`}>{subItem}</Link>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</>
	);
}
