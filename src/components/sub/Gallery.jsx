/*
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

		const handleSlideChange = swiper => {
			const newIndex = swiper.realIndex;
			setIndex(newIndex);
			console.log("Updated index to:", newIndex);
		};

		const handleSlideClick = idx => {
			// 현재 활성 슬라이드와 클릭한 슬라이드를 비교
			if (idx === Index) {
				console.log("Modal open triggered for index:", idx);
				setModalOpen(true); // 모달을 여는 로직
			} else {
				console.log("Slide clicked, index updated to:", idx);
				// setIndex(idx); // 인덱스만 업데이트
			}
		};

		return (
			<>
				<Layout title={"GALLERY"}>
					<Content>
						<div className="notice">
							<p>This web page was created fot study purposes, not for commercial use.</p>
							<p>The Images below is sourced from unplash.com</p>
						</div>
						<section className="galleryList">
							<Swiper
								spaceBetween={15}
								slidesPerView={3}
								loop={Flickr.length > 2} // 슬라이드 수가 2보다 클 경우에만 loop 활성화
								centeredSlides={true} // 슬라이드를 가운데 정렬
								onSlideChange={handleSlideChange}>
								{Flickr.map((data, idx) => (
									<SwiperSlide key={idx} onClick={() => handleSlideClick(idx)}>
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
					{IsModal && Flickr[Index] && (
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
*/

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useZustandStore } from "../../hooks/useZustand";
import { AnimatePresence } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import Layout from "../common/Layout";
import Content from "../common/Content";
import Pic from "../common/Pic";
import Modal from "../common/Modal";
import "swiper/css";
import "swiper/css/pagination";

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	const [Index, setIndex] = useState(0);

	const IsModal = useZustandStore(state => state.IsModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);

	const customMotion = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, y: -200 }
	};

	useEffect(() => {
		const method = "flickr.people.getPhotos";
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = "201494903@N03";
		const num = 10;
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

	const handleSlideChange = swiper => {
		const newIndex = swiper.realIndex;
		setIndex(newIndex);
	};

	const handleSlideClick = idx => {
		if (idx === Index) {
			setModalOpen(true);
		}
	};

	const swiperOptions = {
		spaceBetween: 15,
		slidesPerView: 3,
		loop: true,
		centeredSlides: true,
		modules: [Autoplay, Pagination],
		pagination: { type: "fraction" },
		autoplay: { delay: 2500, disableOnInteraction: true }, // disableOnInteraction true일때 사용자가 스와프시 멈춤
		onSwiper: swiper => {
			setTimeout(() => {
				swiper.slideNext();
				swiper.autoplay.start();
			}, 2500);
		},
		onSlideChange: handleSlideChange,
		breakpoints: {
			999: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			0: {
				slidesPerView: 1,
				spaceBetween: 5
			}
		}
	};

	return (
		<>
			<Layout title={"GALLERY"}>
				<Content delay={1.5} customMotion={customMotion}>
					<section className="gallery">
						<div className="textZone">
							<p>
								This web page was created for study purposes, not for commercial use.
								<br />
								The Images below are sourced from &quot;flickr.com&quot;
							</p>
							<div className="gallerySlider">
								{/* {Index + 1} / {Flickr.length} */}
								<span className="num">no.</span>
								<span className="left">{Index + 1}</span>
								<span className="right">/{Flickr.length}</span>
							</div>
						</div>
						<section className="galleryList">
							<Swiper {...swiperOptions} loop={Flickr.length > 2}>
								{Flickr.map((data, idx) => (
									<SwiperSlide key={idx} onClick={() => handleSlideClick(idx)}>
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
					</section>
				</Content>
			</Layout>
			<AnimatePresence>
				{IsModal && Flickr[Index] && (
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
