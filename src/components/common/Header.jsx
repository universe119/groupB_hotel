import { Link, useLocation } from "react-router-dom";
import { useZustandStore } from "../../hooks/useZustand";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import { useEffect } from "react";

export default function Header() {
	const { pathname } = useLocation();
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

	//sns 메뉴
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const snsUrl = ["/contact", "/gallery", "/youtube"];

	const isMenu = useZustandStore(state => state.isMenu);
	const setMenuClose = useZustandStore(state => state.setMenuClose);

	// 헤더 메뉴 열리면 스크롤 잠김
	useEffect(() => {
		document.body.style.overflow = isMenu ? "hidden" : "auto";
	}, [isMenu]);

	return (
		<header className={`header ${pathname === "/" ? "main" : pathname === "/youtube" ? "youtubeH" : "false"}`}>
			<div className="topUtil">
				<button className={`btnDetailMenu ${isMenu ? "active" : ""}`} onClick={setMenuToggle}>
					<span className="top" />
					<span className="middle" />
					<span className="bottom" />
				</button>
			</div>

			<h1>
				<Link to={"/"} onClick={setMenuClose}>
					PSYH HOTEL
				</Link>
			</h1>

			{/* sns 설정 */}
			<nav>
				<ul className="sns">
					{snsArr.map((Data, idx) => (
						<li key={idx}>
							<Link to={snsUrl[idx]} onClick={setMenuClose}>
								<Data />
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
