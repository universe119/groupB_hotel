import { motion } from "framer-motion";

export default function Content({ children, duration = 1, delay = 0, customMotion }) {
	const defaultMotion = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, y: 0 },
		end: { opacity: 0, y: 200 }
	};

	const combined = { ...defaultMotion, ...customMotion };

	const { init, active, end } = { ...combined, end: { ...combined.end, transition: { delay: 0 } } };

	return (
		<motion.div
			className="content"
			initial={init}
			animate={active}
			exit={end}
			transition={{ duration: duration, delay: delay }}>
			{children}
		</motion.div>
	);
}
