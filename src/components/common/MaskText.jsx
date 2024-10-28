import { motion } from "framer-motion";
import Mask from "./Mask";

export default function MaskText({ children, duration = 0.5, delay = 0, color = "#000", style }) {
	//component styles
	const frameStyle = {
		fontSize: "1.2rem",
		fontFamily: "orbitron",
		color: color,
		display: "inline-block",
		position: "relative",
		overflow: "hidden",
		marginBottom: 10
	};

	// span text motion styles
	const { init, active, end, time } = {
		init: { opacity: 0 },
		active: { opacity: 1 },
		end: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};

	return (
		// 텍스트를 감싸주는 Wrapper
		// 해당 모션 컴포넌트의 스타일을 부모컴포넌트에 호출시 편하게 변경처리 하기 위해서 전달받은 style 객체로 기존 style 객체 덮어씀
		<div style={{ ...frameStyle, ...style }} className="maskText">
			{/* children으로 전달된 실제 텍스트를 span으로 wrapping처리 */}
			<motion.span initial={init} animate={active} exit={end} transition={time}>
				{children}
			</motion.span>

			{/* wrapper 안쪽에 실제 텍스트를 가려줄 마스크오소 */}
			<Mask duration={duration} delay={delay} color={color} />
		</div>
	);
}
