import { Link, useLocation } from "react-router-dom";
import { useZustandStore } from "../../hooks/useZustand";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Header({ menuOpen, menuClose }) {
	const { pathname } = useLocation();

	//sns 메뉴
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const snsUrl = ["/contact", "/gallery", "/youtube"];
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

	if (menuOpen) {
		document.body.style.overflow = "hidden"; // 메뉴가 열리면 스크롤을 막음
	} else {
		document.body.style.overflow = "auto"; // 메뉴가 닫히면 스크롤을 다시 허용
	}

	return (
		<>
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
								<Link to={snsUrl[idx]}>
									<Data />
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	);
}
