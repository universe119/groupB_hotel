import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SplitText from "./SplitText";

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes("/youtube/");

	let currentClass = "";
	//path명을 통해 레이아웃에 다른 클래스명 적용
	if (isDetail) currentClass = "detail";
	else if (pathname === "/") currentClass = "main";
	else currentClass = title; // .toLowerCase();

	// 페이지 전환 시마다 스크롤을 상단으로 이동
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" }); // 'smooth'로 부드러운 스크롤 적용
	}, [pathname]); // pathname이 변경될 때마다 호출

	return (
		<main className={currentClass}>
			{pathname !== "/" && <SplitText delay={0.4}>{title}</SplitText>}
			<section>{children}</section>
		</main>
	);
}
