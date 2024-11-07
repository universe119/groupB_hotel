import Header from "./components/common/Header";
import Home from "./components/main/Home";
import Location from "./components/sub/Location";
import Community from "./components/sub/Community";
import CommunityDetail from "./components/sub/CommunityDetail";
import CommunityAdd from "./components/sub/CommunityAdd";
import CommunityEdit from "./components/sub/CommunityEdit";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import YoutubeDetail from "./components/sub/YoutubeDetail";
import Contact from "./components/sub/Contact";
import MobileMenu from "./components/common/MobileMenu";
import Footer from "./components/common/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { useZustandStore } from "./hooks/useZustand";
import { AnimatePresence } from "framer-motion";

export default function App() {
	const location = useLocation();
	const isMenu = useZustandStore(state => state.isMenu);
	const setMenuClose = useZustandStore(state => state.setMenuClose);

	return (
		<>
			<Header menuOpen={isMenu} menuClose={setMenuClose} />

			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route path="/location" element={<Location />} />
					<Route path="/community" element={<Community />} />
					<Route path="/community/:slug" element={<CommunityDetail />} />
					<Route path="/community-add" element={<CommunityAdd />} />
					<Route path="/community-edit/:slug" element={<CommunityEdit />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/youtube" element={<Youtube />} />
					<Route path="/youtube/:id" element={<YoutubeDetail />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</AnimatePresence>

			<AnimatePresence>{isMenu && <MobileMenu menuClose={setMenuClose} />}</AnimatePresence>

			<Footer />
		</>
	);
}
