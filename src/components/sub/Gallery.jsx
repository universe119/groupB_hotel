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

	const isModal = useZustandStore(state => state.isModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);

	const customMotion = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, y: -200 }
	};

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
		document.body.style.overflow = isModal ? "hidden" : "auto";
	}, [isModal]);

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
				{isModal && Flickr[Index] && (
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
