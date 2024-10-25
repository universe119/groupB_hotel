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
				<Pic
					className="pic"
					src={"/호텔빌딩2작음수정.jpg"}
					alt={"호텔빌딩"}
					style={{ width: "100%", height: "100%" }}
				/>
			</div>
			<div
				className="subImg"
				onClick={() => {
					setModalOpen();
				}}>
				<div className="modal1">
					<AnimatePresence>
						{IsModal && (
							<Modal>
								<Pic
									className="pic"
									src={"/호텔빌딩2작음수정.jpg"}
									alt={"호텔빌딩"}
									style={{ width: "100%", height: "100%" }}
								/>
							</Modal>
						)}
					</AnimatePresence>
				</div>
				<div className="modal2">모달2: 호텔 룸 소개</div>
				<div className="modal3">사진 대체?</div>
				<div className="modal4">사진 대체?</div>
			</div>
			<div className="footerImg">
				<p>하단 내용은 호텔를 소개하는 설명글</p>
			</div>

			{/* <h2 className="tit">ABOUT US</h2>
			<div className="content">
				<Pic src={"/"} alt="Hotel" className="pic" />
				<div className="txt">
					<h3 className="highlight">10</h3>
					<h4 className="subhighlight">
						psyh HOTEL
						<br />
						10 YEARS
						<br />
						FIRST TO FINEST
					</h4>
					<p className="description">
						최초의 탁월함과 최상의 환대
						<br />
						10년 동안 켜켜이 쌓아온 노력과 열정의 여정
					</p>
					<p className="details">
						&apos;First to Finest&apos; embodies our journey from being the first luxury hotel, which began 110 years
						ago, to our pursuit of excellence in hospitality today.
					</p>
					<p className="info">
						psyh호텔은 최초와 최고의 헤리티지를 이어가는 종합 호스피탈리티 리딩 기업입니다. 10년전 psyh호텔이 시작된
						이래, psyh호텔앤리조트는 최초의 탁월함과 최상의 환대 정신으로 10여년의 헤리티지를 이어오며 대한민국
						호스피탈리티의 격을 높여왔습니다. psyh호텔앤리조트는 최고 수준의 호텔 서비스 뿐 아니라 외식, 리테일, 오피스
						PM 서비스까지 고품격 라이프 스타일을 제안하는 종합 호스피탈리티 리딩 기업입니다.
					</p>
				</div>
			</div> */}
		</section>
	);
}
