import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/main/Home";

export default function App() {
	const location = useLocation();

	return (
		<>
			<Header />
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</>
	);
}
