import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Pic from "../common/Pic";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules"; // Autoplay 모듈을 제거합니다.
import "swiper/css"; // Swiper 스타일 가져오기
import "swiper/css/pagination"; // Swiper 페이지네이션 스타일 가져오기
import Content from "../common/Content";

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);

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

	return (
		<Layout title={"GALLERY"}>
			<Content>
				<section className="galleryList">
					<Swiper
						spaceBetween={15} // 슬라이드 간의 간격
						slidesPerView={3} // 한 번에 보여줄 슬라이드 수
						// loop={true} // 무한 루프
						loop={Flickr.length > 2} // 슬라이드 수가 2보다 클 경우에만 loop 활성화
						centeredSlides={true} // 슬라이드를 가운데 정렬
					>
						{Flickr.map((data, idx) => (
							<SwiperSlide key={idx}>
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
	);
}
