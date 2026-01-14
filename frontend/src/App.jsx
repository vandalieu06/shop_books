import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer.jsx";
import Header from "./components/ui/Header.jsx";

export default function App() {
	return (
		<div className="layout-container">
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
