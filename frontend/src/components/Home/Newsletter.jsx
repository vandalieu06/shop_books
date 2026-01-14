function Newsletter() {
	return (
		<section className="py-16 bg-linear-to-r from-amber-600 to-orange-500 text-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl font-bold mb-4">
					Suscríbete a Nuestro Newsletter
				</h2>
				<p className="text-xl mb-8 text-amber-50">
					Recibe las mejores ofertas y novedades directamente en tu correo
				</p>
				<div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
					<input
						type="email"
						placeholder="Tu correo electrónico"
						className="flex-1 px-6 py-4 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300"
					/>
					<button
						type="button"
						className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg whitespace-nowrap"
					>
						Suscribirse
					</button>
				</div>
			</div>
		</section>
	);
}

export default Newsletter;
