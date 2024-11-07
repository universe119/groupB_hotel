import { motion } from "framer-motion";

export default function Mask({ duration = 0.6, delay = 0, color = "#000", style }) {
	const maskStyle = {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		backgroundColor: color,
		zIndex: 6
	};

	const maskMotion = {
		init: { x: "-101%" },
		active: { x: "101%" },
		time: { duration, delay, ease: "linear" }
	};

	return (
		<motion.div
			//마스크 호출시 스타일 수정 가능하도록 처리
			className={"mask"}
			style={{ ...maskStyle, ...style }}
			variants={maskMotion}
			initial={maskMotion.init}
			animate={maskMotion.active}
			transition={maskMotion.time}></motion.div>
	);
}
