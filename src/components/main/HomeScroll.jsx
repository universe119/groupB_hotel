export default function HomeScroll() {
	const sideMenuArr = ["Home", "Offers", "Lounge", "Hotels", "Retail Business"];

	return (
		<div className="mainScroll">
			<ul className="homeScroll">
				{sideMenuArr.map((data, idx) => {
					return (
						<li key={idx} style={{ top: 40 * idx }}>
							{data}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
