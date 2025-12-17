import { Outlet } from "react-router-dom";

export default function App() {
	return (
		<div className="layout-container">
			{/* <header className="w-full py-6 px-4 bg-gray-800 text-white">
				<nav>
					<p className="text-center">Mi Barra de Navegación</p>
				</nav>
			</header>*/}

			<main>
				<Outlet />
			</main>

			{/* <footer className="w-full py-6 px-4 bg-gray-200 text-center text-sm">
				Mi Footer Fijo
			</footer>*/}
		</div>
	);
}
