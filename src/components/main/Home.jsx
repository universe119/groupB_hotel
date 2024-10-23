import Layout from "../common/Layout";
import Hotels from "./Hotels";
import Lounge from "./Lounge";
import Offers from "./Offers";
import RetailBusiness from "./RetailBusiness";
import HomeVisual from "./HomeVisual";
import HomeScroll from "./HomeScroll";

export default function Home() {
	return (
		<Layout>
			{/* HomeVisual */}
			<HomeVisual />

			{/* Offers */}
			<Offers />

			{/* Lounge */}
			<Lounge />

			{/* Hotels */}
			<Hotels />

			{/* RetailBusiness */}
			<RetailBusiness />
			<HomeScroll />
		</Layout>
	);
}
