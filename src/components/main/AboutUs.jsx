import { AnimatePresence } from "framer-motion";
import Pic from "../common/Pic";
import Modal from "../common/Modal";
import { useEffect, useState } from "react";
import { useZustandStore } from "../../hooks/useZustand";

export default function AboutUs() {
	const IsModal = useZustandStore(state => state.IsModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);
	const [Index, setIndex] = useState(0);

	const roomData = [
		{
			tit: "MISSION",
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/호텔빌딩2작음수정.jpg"
		},
		{
			tit: "SWEET ROOM",
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/SWEET_ROOM.jpg"
		},
		{
			tit: "DELUXE ROOM",
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/DELUXER_ROOM2.jpg"
		},
		{
			tit: "STANDARD ROOM",
			dec: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, pariatur.",
			pic: "/STANDARD_ROOM.jpg"
		}
	];

	useEffect(() => {
		document.body.style.overflow = IsModal ? "hidden" : "auto";
	}, [IsModal]);

	// 호텔소개 어떤 느낌으로?
	return (
		<section className="aboutUs">
			<div className="titImg">
				<Pic className={"pic"} src={"/호텔빌딩2작음수정.jpg"} style={{ width: "100%", height: "100%" }} shadow />
			</div>
			<div className="subImg">
				{roomData.map((data, idx) => {
					return (
						<div
							key={idx}
							className={`modal${idx + 1}`}
							onClick={() => {
								setModalOpen();
								setIndex(idx);
							}}>
							<p>{data.tit}</p>
						</div>
					);
				})}
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
				{IsModal && (
					<Modal>
						<Pic
							key={Index}
							className={"pic"}
							src={roomData[Index].pic}
							alt={roomData[Index].tit}
							style={{ width: "100%", height: "100%" }}
						/>
						<h1>{roomData[Index].tit}</h1>
						<p>{roomData[Index].dec}</p>
					</Modal>
				)}
			</AnimatePresence>
		</section>
	);
}
