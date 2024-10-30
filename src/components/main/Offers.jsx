import { Link } from "react-router-dom";
import Pic from "../common/Pic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import offerData from "../../data/offerData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Offers() {
	return (
		<figure className="offers">
			<div className="inner">
				<Link to="/">
					<h3>GO TO OFFERS</h3>
					<Pic className="pic" src={"커서2.jpg"} alt="커서이미지" style={{ width: "30px", height: "30px" }} />
				</Link>
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
