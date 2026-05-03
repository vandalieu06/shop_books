import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";

export default function App() {
	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			<Header />
			<main className="grow">
				<Outlet context={{}} />
			</main>
			<Footer />
		</div>
	);
}
