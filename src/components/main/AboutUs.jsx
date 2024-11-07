import { AnimatePresence } from "framer-motion";
import Pic from "../common/Pic";
import Modal from "../common/Modal";
import { useEffect, useState } from "react";
import { useZustandStore } from "../../hooks/useZustand";

export default function AboutUs({ Sc, pos }) {
	const isModal = useZustandStore(state => state.isModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);
	const [Index, setIndex] = useState(0);

	const currentScroll = Sc - pos || 0;

	const roomData = [
		{
			tit: `MISSION`,
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/호텔빌딩2작음수정.jpg"
		},
		{
			tit: `SWEET <br/> ROOM`,
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/SWEET_ROOM.jpg"
		},
		{
			tit: `DELUXE <br/> ROOM`,
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/DELUXER_ROOM2.jpg"
		},
		{
			tit: `STANDARD <br/> ROOM`,
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/STANDARD_ROOM.jpg"
		}
	];

	const titMS = {
		transform: `translateX(${currentScroll * 2 <= 0 ? currentScroll * 2 : -currentScroll * 2}px)`,
		opacity: `${currentScroll * 1 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

	const subMS = {
		transform: `translateX(${-currentScroll * 2 >= 0 ? -currentScroll * 2 : currentScroll * 2}px)`,
		opacity: `${currentScroll * 1 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

	const footerMS = {
		transform: `translateY(${currentScroll / 1.1 <= 0 ? currentScroll / 1.1 : currentScroll / 1.1}px)`,
		opacity: `${currentScroll * 1 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

	useEffect(() => {
		document.body.style.overflow = isModal ? "hidden" : "auto";
	}, [isModal]);

	// 호텔소개 어떤 느낌으로?
	return (
		<section className="aboutUs">
			<div className="titImg" style={titMS}>
				<Pic className={"pic"} src={"/호텔빌딩2작음수정.jpg"} style={{ width: "100%", height: "100%" }} shadow />
			</div>
			<div className="subImg" style={subMS}>
				{roomData.map((data, idx) => {
					return (
						<div
							key={idx}
							className={`modal${idx + 1}`}
							onClick={() => {
								setModalOpen();
								setIndex(idx);
							}}>
							<p dangerouslySetInnerHTML={{ __html: data.tit }} />
						</div>
					);
				})}
			</div>
			<div className="footerImg" style={footerMS}>
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
				{isModal && (
					<Modal>
						<h1 dangerouslySetInnerHTML={{ __html: roomData[Index].tit }} />
						<p>{roomData[Index].dec}</p>
						<Pic
							key={Index}
							className={"pic"}
							src={roomData[Index].pic}
							alt={roomData[Index].tit}
							style={{ width: "100%", height: "100%" }}
						/>
					</Modal>
				)}
			</AnimatePresence>
		</section>
	);
}
