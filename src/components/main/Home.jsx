import Layout from "../common/Layout";
import HomeScroll from "./HomeScroll";
import HomeVisual from "./HomeVisual";
import AboutUs from "./AboutUs";
import Offers from "./Offers";
import Facility from "./Facility";
import LocationScroll from "./LocationScroll";

export default function Home() {
	return (
		<Layout>
			<HomeScroll />
			<HomeVisual />
			<AboutUs />
			<Offers />
			<Facility />
			<LocationScroll />
		</Layout>
	);
}
