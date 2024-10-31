import { motion } from "framer-motion";

export default function SplitText({ children = "", style, interval = 0.1, delay = 0, duration = 0.3 }) {
	const textArr = [];
	for (const letter of children) textArr.push(letter);

	const titStyle = {
		display: "inline-block",
		fontWeight: 100,
		fontSize: "4vmax",
		fontFamily: "Alegreya",
		lineHeight: 1,
		marginTop: "5vh",
		color: "#efefef",
		...style
	};

	const { init, active, end } = {
		init: { scale: 2, y: -100, opacity: 0 },
		active: { scale: 1, y: 0, opacity: 1 },
		end: { opacity: 0, transition: { duration: duration, delay: 0 } }
	};

	return (
		<h2 style={titStyle}>
			{textArr.map((el, idx) => (
				<motion.span
					style={{ display: "inline-block" }}
					key={idx}
					initial={init}
					animate={active}
					exit={end}
					transition={{ duration: duration, delay: interval * idx + delay }}>
					{el}
				</motion.span>
			))}
		</h2>
	);
}
