import Layout from "../common/Layout";
import HomeScroll from "./HomeScroll";
import HomeVisual from "./HomeVisual";
import AboutUs from "./AboutUs";
import Offers from "./Offers";
import LocationScroll from "./LocationScroll";
import RetailBusiness from "./RetailBusiness";

export default function Home() {
	return (
		<Layout>
			<HomeScroll />
			<HomeVisual />
			<AboutUs />
			<Offers />
			<LocationScroll />
			<RetailBusiness />
		</Layout>
	);
}
