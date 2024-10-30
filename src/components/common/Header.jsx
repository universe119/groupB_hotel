import { Link, useLocation } from "react-router-dom";
import { useZustandStore } from "../../hooks/useZustand";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Header({ menuOpen, menuClose }) {
	const { pathname } = useLocation();

	//상단좌측메뉴
	// const gnbLArr = ["LOCATION", "COMMUNITY"];
	// const gnbRArr = ["GALLERY", "YOUTUBE", "CONTACT"];
	//sns 메뉴
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];

	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

	if (menuOpen) {
		// 메뉴가 열리면 스크롤을 막음
		document.body.style.overflow = "hidden";
	} else {
		// 메뉴가 닫히면 스크롤을 다시 허용
		document.body.style.overflow = "auto";
	}
	return (
		<>
			<header className={`header ${pathname === "/" && "main"}`}>
				<div className="topUtil">
					{/* <button onClick={toggleMenu}>상단좌측메뉴버튼</button> */}
					<button className={`btnDetailMenu ${menuOpen ? "active" : ""}`} onClick={setMenuToggle}>
						<span className="top" />
						<span className="middle" />
						<span className="bottom" />
					</button>
				</div>

				{/* <nav>
					<ul className="gnbL">
						{gnbLArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === "/" + data ? "on" : ""}>
									<Link to={"/" + data} onClick={menuClose}>
										{data.toUpperCase()}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav> */}

				<h1>
					<Link to={"/"} onClick={menuClose}>
						psyh Hotel
					</Link>
				</h1>

				{/* <nav>
					<ul className="gnbR">
						{gnbRArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === "/" + data ? "on" : ""}>
									<Link to={"/" + data} onClick={menuClose}>
										{data.toUpperCase()}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav> */}

				{/* sns 설정 */}
				<nav>
					<ul className="sns">
						{snsArr.map((Data, idx) => (
							<li key={idx}>
								<Data />
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	);
}
