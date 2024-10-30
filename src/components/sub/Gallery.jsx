import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useZustandStore } from "../../hooks/useZustand";
import { AnimatePresence } from "framer-motion";
import Layout from "../common/Layout";
import Content from "../common/Content";
import Pic from "../common/Pic";
import Modal from "../common/Modal";
import "swiper/css";

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	const [Index, setIndex] = useState(0);

	const IsModal = useZustandStore(state => state.IsModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);

	useEffect(() => {
		const method = "flickr.people.getPhotos";
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = "201494903@N03";
		const num = 10; // 가져올 사진 수
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
			});
	}, []);

	useEffect(() => {
		document.body.style.overflow = IsModal ? "hidden" : "auto";
	}, [IsModal]);

	return (
		<>
			<Layout title={"GALLERY"}>
				<Content>
					<div className="notice">
						<p>This web page was created fot study purposes, not for commercial use.</p>
						<p>The Images below is sourced from unplash.com</p>
					</div>
					<div className="textBox">
						{Flickr.map((el, idx) => (
							<h2 key={idx} className={Index === idx ? "on" : ""}>
								{el.title.substr(0, 30)}
							</h2>
						))}
					</div>
					<section className="galleryList">
						<Swiper
							spaceBetween={15}
							slidesPerView={3}
							loop={Flickr.length > 2} // 슬라이드 수가 2보다 클 경우에만 loop 활성화
							centeredSlides={true} // 슬라이드를 가운데 정렬
							onSlideChange={swiper => setIndex(swiper.activeIndex)} // 활성 슬라이드 인덱스를 저장
						>
							{Flickr.map((data, idx) => (
								// <SwiperSlide key={idx}>
								// 	<div className="inner">
								<SwiperSlide
									key={idx}
									onClick={() => {
										// 현재 슬라이드가 가운데에 위치한 경우에만 모달 창 열기
										if (idx === Index) {
											setModalOpen(true);
										}
									}}>
									<div className="inner">
										<Pic
											src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
											className="pic"
										/>
									</div>
									<div className="overlay">
										<h3>{data.title}</h3>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</section>
				</Content>
			</Layout>
			<AnimatePresence>
				{IsModal && (
					<Modal>
						<Pic
							src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`}
							alt={Flickr[Index].title}
							shadow
						/>
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
}
