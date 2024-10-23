import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const { pathname } = useLocation();

	// 패키지 , 멤버십 , 로그인, 예약확인
	const gnbArr = ["package", "membership", "login", "confirmReserv"];
	return (
		<>
			<header className={`header ${pathname === "/" && "main"}`}>
				<h1>
					<Link to={"/"}>psyh Hotel</Link>
				</h1>
			</header>
		</>
	);
}
