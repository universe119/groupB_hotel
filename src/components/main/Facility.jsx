import facData from "../../data/facData";
import Pic from "../common/Pic";

export default function Facility({ Sc, pos }) {
	const currentScroll = Sc - pos || 0;

	const facTitMS = {
		transform: `translateX(${currentScroll / 1.5 <= 0 ? currentScroll / 1.5 : 0}px)`,
		opacity: `${currentScroll / 1.5 <= 0 ? 1 + currentScroll / 700 : 1 - currentScroll / 500}`
	};

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
