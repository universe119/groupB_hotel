import { AnimatePresence } from "framer-motion";
import Pic from "../common/Pic";
import Modal from "../common/Modal";
import { useEffect } from "react";
import { useZustandStore } from "../../hooks/useZustand";

export default function AboutUs() {
	const IsModal = useZustandStore(state => state.IsModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);

	useEffect(() => {
		document.body.style.overflow = IsModal ? "hidden" : "auto";
	}, [IsModal]);

	// 호텔소개 어떤 느낌으로?
	return (
		<section className="aboutUs">
			<div className="titImg">
				<Pic className="pic" src={"/호텔빌딩2작음수정.jpg"} style={{ width: "100%", height: "100%" }} shadow />
			</div>
			<div className="subImg">
				<div className="modal1" onClick={setModalOpen}>
					모달1: 호텔 서비스가치
					<p>MISSION</p>
				</div>
				<div className="modal2" onClick={setModalOpen}>
					모달2: 호텔 룸 소개
					<p>
						Sweet
						<br />
						Room
					</p>
				</div>
				<div className="modal3" onClick={setModalOpen}>
					사진 대체?
					<p>
						Deluxe
						<br />
						Room
					</p>
				</div>
				<div className="modal4" onClick={setModalOpen}>
					사진 대체?
					<p>
						Standard
						<br />
						Room
					</p>
				</div>
			</div>
			<div className="footerImg">
				<div className="title">
					<p>
						PSYH <br /> HOTEL
					</p>
				</div>
				<div className="subTitle">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit atque aliquid obcaecati fuga mollitia explicabo
						blanditiis dolorum perspiciatis animi amet officia, incidunt voluptas? Quae ipsa, dolorum dolorem incidunt
						temporibus dolor?
					</p>
				</div>
			</div>
			<AnimatePresence>
				{/* 추후 사진 4개 map돌려야함 */}
				{IsModal && (
					<Modal>
						<Pic className="pic" src={"/호텔빌딩2작음수정.jpg"} style={{ width: "100%", height: "100%" }} shadow />
					</Modal>
				)}
			</AnimatePresence>
		</section>
	);
}
