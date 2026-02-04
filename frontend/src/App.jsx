import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import { CartProvider } from "./contexts/CartContext"; // Asegúrate de que la ruta sea correcta

export default function App() {
	return (
		<CartProvider>
			<div className="min-h-screen bg-slate-50 flex flex-col">
				<Header />
				<main className="grow">
					<Outlet context={{}} />
				</main>
				<Footer />
			</div>
		</CartProvider>
	);
}
