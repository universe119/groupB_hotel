import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeScroll from "../main/HomeScroll";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdLanguage } from "react-icons/md";
// import { FaFlagUsa, FaFlag } from "react-icons/fa";
// import { GiSouth Korea } from "react-icons/gi";

export default function Header() {
	const { pathname } = useLocation();
	// const [language, setLanguage] = useState("KO"); // 기본 언어 설정
	const [isMenuOpen, setIsMenuOpen] = useState(false); // 상단좌측메뉴

	const gnbLArr = ["MEMBERSHIP", "PACKAGE"];

	const gnbRArr = ["GALLERY", "YOUTUBE", "CONTACT"];

	const toggleMenu = () => {
		// 상단좌측메뉴 토글,,,설정,,,,?
		setIsMenuOpen(prev => !prev);
	};

	// 언어변경 뺄게요,,,
	// const handleLanguageChange = newLanguage => {
	// 	setLanguage(newLanguage);
	// 	// 추가적으로 언어 변경에 대한 로직을 구현할 수 있습니다.
	// 	console.log(`Language changed to: ${newLanguage}`);
	// };

	return (
		<>
			<header className={`header ${pathname === "/" && "main"}`}>
				<div className="topUtil">
					{/* <button onClick={toggleMenu}>상단좌측메뉴버튼</button> */}
					<button className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
						<span className="top"></span>
						<span className="middle"></span>
						<span className="bottom"></span>
					</button>

					{/* <div>                        이거도 빼야겠죠?
						<button onClick={() => handleLanguageChange(language === "EN" ? "KO" : "EN")}>
							<MdLanguage /> {language}
							{/* 언어에 따라 아이콘 선택 */}
					{/* {language === "EN" ? <FaFlagUsa /> : <GiSouth Korea />} */}
					{/* </button>
					</div> */}
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

				{/* 상단 좌측 메뉴 토글에 따라 표시되는 부분 */}
				{/* {isMenuOpen && (
					<nav>
						<ul className="gnb">
							{gnbArr.map((data, idx) => (
								<li key={idx} className={pathname === "/" + data ? "on" : ""}>
									<Link to={"/" + data}>{data.toUpperCase()}</Link>
								</li>
							))}
						</ul>
					</nav>
				)} */}
			</header>
			<HomeScroll />
		</>
	);
}
