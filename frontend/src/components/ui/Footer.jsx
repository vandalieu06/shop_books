import { BookOpen } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<BookOpen className="w-8 h-8 text-amber-500" />
							<span className="text-2xl font-bold">LibroMundo</span>
						</div>
						<p className="text-gray-400">
							Tu librería online de confianza desde 2010
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-4">Compra</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Novedades
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Bestsellers
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Ofertas
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Preventa
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-4">Ayuda</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Contacto
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Envíos
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Devoluciones
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									FAQ
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-4">Legal</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Privacidad
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Términos
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-amber-500 transition">
									Cookies
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-800 pt-8 text-center text-gray-400">
					<p>&copy; 2024 LibroMundo. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
