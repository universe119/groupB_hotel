import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="footer">
			<h1>
				<Link to={"/"}>psyh Hotel</Link>
			</h1>

			<section>
				<ul>
					<li>
						<Link to={"/contact"}>고객센터</Link>
					</li>
					<li>웹사이트 이용약관</li>
					<li>멤버십 이용약관</li>
					<li>지류 이용권 이용약관</li>
					<li>개인정보처리방침</li>
					<li>사이트맵</li>
				</ul>
				<p>© 2024 PSYH Hotel & RESORTS Co. All rights reserved.</p>
			</section>
		</footer>
	);
}
