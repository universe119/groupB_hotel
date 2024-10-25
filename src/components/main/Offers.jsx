import { Link } from "react-router-dom";
import Pic from "../common/Pic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import memberData from "../../data/memberData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Offers() {
	return (
		<figure className="offers">
			<div className="inner">
				<Link to="/">GO TO OFFERS 화살표임티추가 </Link>
			</div>

			<div className="swipeArea">
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
							{memberData.map((pic, idx) => {
								return (
									<SwiperSlide key={idx}>
										<li className="swipeSlide">
											<span className="thum">
												<Pic className="pic" src={pic.pic} alt={pic.name} />
											</span>
											<strong className="tit">{pic.name}</strong>
											<p className="txt">{pic.position}</p>
											<p className="date">{pic.position}</p>
											<p className="hotelName">{pic.position}</p>
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
