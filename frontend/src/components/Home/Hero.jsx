const Hero = ({ searchQuery, setSearchQuery }) => {
	return (
		<section className="relative bg-linear-to-r from-amber-600 to-orange-500 text-white py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h1 className="text-5xl font-bold mb-6 leading-tight">
							Descubre Tu Próxima Gran Lectura
						</h1>
						<p className="text-xl mb-8 text-amber-50">
							Miles de libros a tu alcance. Envíos gratis en compras superiores
							a €25
						</p>

						<div className="relative max-w-xl">
							<input
								type="text"
								placeholder="Buscar libros, autores, ISBN..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full px-6 py-4 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg"
							/>
							<button
								type="button"
								className="absolute right-2 top-2 bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition"
							>
								<Search className="w-6 h-6" />
							</button>
						</div>

						<div className="flex gap-4 mt-8">
							<button
								type="button"
								className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg"
							>
								Ver Ofertas
							</button>
							<button
								type="button"
								className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition"
							>
								Explorar
							</button>
						</div>
					</div>

					<div className="hidden md:block">
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=700&fit=crop"
								alt="Libros"
								className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
