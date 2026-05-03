import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<div className="mb-12">
				<h1 className="mb-4 text-8xl font-semibold text-gray-200 sm:text-9xl">
					404
				</h1>
				<h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">
					Página no encontrada
				</h2>
				<p className="text-gray-500 max-w-md text-base leading-relaxed">
					Lo sentimos, la página que estás buscando no existe o ha sido movida.
				</p>
			</div>
			<button
				onClick={() => navigate("/")}
				className="bg-red-700 text-white px-8 py-3 text-sm font-medium hover:bg-red-800 transition-colors"
			>
				Volver al inicio
			</button>
		</div>
	);
}