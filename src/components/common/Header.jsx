import { Link, useLocation } from "react-router-dom";
import { useZustandStore } from "../../hooks/useZustand";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import { useEffect } from "react";

export default function Header({ menuOpen, menuClose }) {
	const { pathname } = useLocation();
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

	//sns 메뉴
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const snsUrl = ["/contact", "/gallery", "/youtube"];

	// 헤더 메뉴 열리면 스크롤 잠김
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "auto";
	}, [menuOpen]);

	return (
		<header className={`header ${pathname === "/" ? "main" : pathname === "/youtube" ? "youtubeH" : "false"}`}>
			<div className="topUtil">
				<button className={`btnDetailMenu ${menuOpen ? "active" : ""}`} onClick={setMenuToggle}>
					<span className="top" />
					<span className="middle" />
					<span className="bottom" />
				</button>
			</div>

			<h1>
				<Link to={"/"} onClick={menuClose}>
					PSYH HOTEL
				</Link>
			</h1>

			{/* sns 설정 */}
			<nav>
				<ul className="sns">
					{snsArr.map((Data, idx) => (
						<li key={idx}>
							<Link to={snsUrl[idx]} onClick={menuClose}>
								<Data />
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
