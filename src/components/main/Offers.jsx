import { Link } from "react-router-dom";
import Pic from "../common/Pic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import offerData from "../../data/offerData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Offers({ Sc, pos }) {
	const currentScroll = Sc - pos || 0;

	const innerMS = {
		transform: `translateX(${currentScroll * 3 <= 0 ? currentScroll * 3 : 0}px)`,
		opacity: 1 + currentScroll / 600
	};

	const swipeAreaMS = {
		transform: `translateY(${currentScroll * 1.5 <= 0 ? currentScroll * 1.5 : 0}px)`,
		opacity: 1 + currentScroll / 1000
	};
	return (
		<figure className="offers">
			<div className="inner" style={innerMS}>
				<Link to="/">
					<h3>GO TO OFFERS</h3>
					<Pic className="pic" src={"커서2.jpg"} alt="커서이미지" style={{ width: "30px", height: "30px" }} />
				</Link>
			</div>

			<div className="swipeArea" style={swipeAreaMS}>
				{/* <button>&lt;</button> */}
				<div className="swipeGroup">
					<ul className="swipeCont">
						<Swiper
							slidesPerView={3}
							centeredSlides={true}
							spaceBetween={30}
							grabCursor={true}
							pagination={{
								clickable: true
							}}
							modules={[Pagination]}
							className="mySwiper">
							{offerData.map((data, idx) => {
								return (
									<SwiperSlide key={idx}>
										<li className="swipeSlide">
											<span className="thum">
												<Pic className="pic" src={data.pic} alt={data.name} />
											</span>
											<span className="thumTxt">
												<strong className="tit">{data.title}</strong>
												<p className="txt">{data.description}</p>
												<p className="period">{data.period}</p>
												<p className="location">{data.location}</p>
											</span>
										</li>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</ul>
				</div>
				{/* <button>&gt;</button> */}
			</div>
		</figure>
	);
}
