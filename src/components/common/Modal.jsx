import { useZustandStore } from "../../hooks/useZustand";
import { motion } from "framer-motion";

export default function Modal({ children }) {
	const setModalClose = useZustandStore(state => state.setModalClose);

	const { initial, animate, exit, transition } = {
		initial: { y: 1200, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: 300, opacity: 0, transition: { duration: 0.2 } },
		transition: { duration: 0.4 }
	};

	return (
		<motion.aside className={"modal"} initial={initial} animate={animate} exit={exit} transition={transition}>
			<div className="con">{children}</div>
			<button className="btnClose" onClick={setModalClose}>
				CLOSE
			</button>
		</motion.aside>
	);
}
