import Header from "./components/common/Header";
import Home from "./components/main/Home";
import Location from "./components/sub/Location";
import Package from "./components/sub/Package";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import YoutubeDetail from "./components/sub/YoutubeDetail";
import Contact from "./components/sub/Contact";
import Footer from "./components/common/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { useZustandStore } from "./hooks/useZustand";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "./components/common/MobileMenu";

export default function App() {
	const location = useLocation();

	const IsMenu = useZustandStore(state => state.IsMenu);
	const setMenuClose = useZustandStore(state => state.setMenuClose);

	return (
		<>
			<Header menuOpen={IsMenu} menuClose={setMenuClose} />
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
				<Route path="/location" element={<Location />} />
				<Route path="/package" element={<Package />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/youtube" element={<Youtube />} />
				<Route path="/youtube/:id" element={<YoutubeDetail />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
			<AnimatePresence>{IsMenu && <MobileMenu menuClose={setMenuClose} />}</AnimatePresence>
			<Footer />
		</>
	);
}
