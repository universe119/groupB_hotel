import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ title, children }) {
	const { pathname } = useLocation();

	// youtube 말고 다른걸로 ..
	const isDetail = pathname.includes("/youtube/");

	let currentClass = "";

	//path명을 통해 레이아웃에 다른 클래스명 적용
	if (isDetail) currentClass = "detail";
	else if (pathname === "/") currentClass = "main";
	else currentClass = title.toLowerCase();

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className={currentClass}>
				{title}
				<section>{children}</section>
			</main>
		</>
	);
}
