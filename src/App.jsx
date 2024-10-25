import Header from "./components/common/Header";
import Home from "./components/main/Home";
import Location from "./components/sub/Location";
import Package from "./components/sub/Package";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Contact from "./components/sub/Contact";
import Footer from "./components/common/Footer";
import { Route, Routes, useLocation } from "react-router-dom";

export default function App() {
	const location = useLocation();

	return (
		<>
			<Header />
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
				<Route path="/location" element={<Location />} />
				<Route path="/package" element={<Package />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/youtube" element={<Youtube />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
			<Footer />
		</>
	);
}
