import { Link } from "react-router-dom";
import Pic from "../common/Pic";

export default function Footer() {
	return (
		<footer className="footer">
			<h1>
				{/* Pic 컴포넌트를 사용해 로고3 이미지 추가 */}
				<Pic
					src={"/로고3.png"}
					alt={"로고 이미지"}
					className={"logo"}
					style={{ width: "100px", height: "50px", marginRight: "10px" }}
				/>
				<Link to={"/"}>PSYH HOTEL</Link>
			</h1>

			{/* 커튼 사진 출력은 scss로 */}

			<section>
				<ul>
					<li>
						<Link to={"/contact"}>고객센터</Link>
					</li>
					<li>
						<Link to={"/community/55"}>웹사이트 이용약관</Link>
					</li>
					<li>
						<Link to={"/community/-5Exjj"}>멤버십 이용약관</Link>
					</li>
					<li>
						<Link to={"/community/-kRnh4"}>개인정보처리방침</Link>
					</li>
				</ul>
				<p>© 2024 PSYH Hotel & RESORTS Co. All rights reserved.</p>
			</section>
		</footer>
	);
}
