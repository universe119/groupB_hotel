import timeData from "../../data/clockData"; // 시간 데이터 불러오기
import { useState, useEffect } from "react";
import Pic from "../common/Pic";

export default function HomeVisual({ Sc }) {
	const [time, setTime] = useState({ hr: "00", min: "00", sec: "00", period: "AM" });
	const [theme, setTheme] = useState("");

	useEffect(() => {
		const intervalId = setInterval(() => {
			updateTime();
			updateTheme();
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const updateTime = () => {
		const now = new Date();
		let hr = now.getHours();
		// let hr = 20; // 테스트

		let min = now.getMinutes();
		let sec = now.getSeconds();
		const period = hr >= 12 ? "PM" : "AM";

		if (hr === 0) hr = 12; // 0시를 12시로 변환
		else if (hr > 12) hr -= 12; // 12시 이후는 12를 빼서 변환

		setTime({
			hr: hr < 10 ? "0" + hr : hr,
			min: min < 10 ? "0" + min : min,
			sec: sec < 10 ? "0" + sec : sec,
			period
		});
	};

	const updateTheme = () => {
		const currentHour = new Date().getHours();
		// const currentHour = 20; // 테스트

		const newTheme = timeData.find(data => {
			if (data.className !== "night") {
				return currentHour >= data.period[0] && currentHour < data.period[1];
			} else {
				return currentHour >= data.period[0] || currentHour < data.period[1];
			}
		});

		if (newTheme) {
			setTheme(newTheme.className);
		}
	};

	const cMS = {
		transform: `translateY(${Sc}px) scale(${1 + Sc / 600})`,
		opacity: `${1 - Sc / 550}`
	};

	const sMS = {
		transform: `translateY(${Sc}px) scale(${1 + Sc / 600})`,
		opacity: 1 - Sc / 550
	};

	return (
		<div className="homeVisual">
			<Pic
				className={`homeVisual ${theme}`} // theme에 따라 클래스 변경
				src={theme}
				style={{ width: "100%", height: "100%", position: "absolute", opacity: 0.8 }}
			/>

			<div className="clock" style={{ ...cMS, color: theme === "morning" ? "#000" : "#fff" }}>
				<span>{time.hr}</span> : <span>{time.min}</span> : <span>{time.sec}</span>
				<em className={time.period === "AM" ? "on" : ""} style={{ color: theme === "morning" ? "#000" : "#fff" }}>
					{time.period === "AM" ? "AM" : ""}
				</em>
				<em className={time.period === "PM" ? "on" : ""} style={{ color: theme === "morning" ? "#000" : "#fff" }}>
					{time.period === "PM" ? "PM" : ""}
				</em>
			</div>

			<div className="slogan" style={sMS}>
				<h2 style={{ color: theme === "morning" ? "#000" : "#fff" }}>Experience the Difference</h2>
			</div>
		</div>
	);
}
