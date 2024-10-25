import { motion } from "framer-motion";
import { useZustandStore } from "../../hooks/useZustand";

export default function Modal({ children }) {
	// Gallery에서 모달 컴포넌트 호출 순서4- 모달 컴포넌트 내부에서 상태변경함수를 전역으로부터 바로 가져옴
	const setModalClose = useZustandStore(state => state.setModalClose);
	console.log(setModalClose);

	return (
		<motion.aside className="modal">
			<div className="con">{children}</div>
			<button className="btnClose" onClick={setModalClose}>
				CLOSE
			</button>
		</motion.aside>
	);
}
