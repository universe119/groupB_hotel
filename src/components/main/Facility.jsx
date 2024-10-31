import Pic from "../common/Pic";

export default function Facility({ Sc, pos }) {
	const currentScroll = Sc - pos || 0;

	const facTitMS = {
		transform: `translateX(${currentScroll / 1.5 <= 0 ? currentScroll / 1.5 : 0}px)`,
		opacity: `${currentScroll / 1.5 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

	const facData = [
		{
			tit: "gym",
			con: `FITNESS
				<br />
				CENTER`,
			pic: `/fac_gym.jpg`,
			detail: `위치 : 10F
				<br />
				운영시간 : 06:30-22:00
				<br />
				운동복 제공
				<br />
				운동화 개별 지참
				<br />
				실외화 출입 금지
				<br />
				(슬리퍼 포함)`
		},
		{
			tit: "pool",
			con: `SWIMMING
				<br />
				POOL`,
			pic: `/fac_pool.jpg`,
			detail: `위치 : 11F
				<br />
				운영시간 : 06:30-22:00
				<br />
				휴게시간 :
				<br />
				10:00-11:00 , 19:00-20:00
				<br />
				수영모 대여 가능
				<br />
				대여료 : 2,000won`
		},
		{
			tit: "restaurant",
			con: `RESTAURANT`,
			pic: `/fac_restaurant.jpg`,
			detail: `위치 : 3F
				<br />
				운영시간 : 07:00-20:00
				<br />
				휴게시간:
				<br />
				09:00-11:00, 15:00-17:00
				<br />
				성인 : 40,000won
				<br />
				아동 : 20,000won`
		}
	];

	return (
		<figure className="facility">
			<h2 className="fac_Title" style={facTitMS}>
				FACILITIES
			</h2>
			{facData.map((el, idx) => {
				return (
					<section
						key={idx}
						className={el.tit}
						style={{
							transform: `translateY(${currentScroll * 0.3 * idx}px)`,
							opacity: `${currentScroll / 1.5 <= 0 ? 1 + currentScroll / 900 : 1 - currentScroll / 900}`
						}}>
						<div className="fac_Content">
							<h2 dangerouslySetInnerHTML={{ __html: el.con }} />
							<Pic className={"fac_Pic"} src={el.pic} alt={el.con} />
						</div>
						<p className="fac_detail" dangerouslySetInnerHTML={{ __html: el.detail }} />
					</section>
				);
			})}
		</figure>
	);
}
