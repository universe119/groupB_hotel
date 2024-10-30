import Pic from "../common/Pic";

export default function Facility() {
	return (
		<figure className="facility">
			<h2 className="fac_Title">FACILITIES</h2>
			<section className="gym">
				<div className="fac_Content">
					<h2>
						FITNESS
						<br />
						CENTER
					</h2>
					<Pic className={"fac_Pic"} src={"/fac_gym.jpg"} alt="fac_gym" />
				</div>
				<p className="fac_detail">
					위치 : 10F
					<br />
					운영시간 : 06:30-22:00
					<br />
					운동복 제공
					<br />
					운동화 개별 지참
					<br />
					실외화 출입 금지 (슬리퍼 포함)
				</p>
			</section>

			<section className="pool">
				<div className="fac_Content">
					<h2>
						SWIMMING
						<br />
						POOL
					</h2>
					<Pic className={"fac_Pic"} src={"/fac_pool.jpg"} alt="fac_pool" />
				</div>
				<p className="fac_detail">
					위치 : 11F
					<br />
					운영시간 : 06:30-22:00
					<br />
					휴게시간 :
					<br />
					10:00-11:00 , 19:00-20:00
					<br />
					수영모 대여 가능
					<br />
					대여료 : 2,000won
				</p>
			</section>

			<section className="restaurant">
				<div className="fac_Content">
					<h2>RESTAURANT</h2>
					<Pic className={"fac_Pic"} src={"/fac_restaurant.jpg"} alt="fac_restaurantl" />
				</div>
				<p className="fac_detail">
					위치 : 3F
					<br />
					운영시간 : 07:00-20:00
					<br />
					휴게시간:
					<br />
					09:00-11:00, 15:00-17:00
					<br />
					성인 : 40,000won
					<br />
					아동 : 20,000won
				</p>
			</section>
		</figure>
	);
}
