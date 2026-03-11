function Newsletter() {
	return (
		<section className="py-16 bg-red-700 text-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-2xl font-semibold mb-2">ニュースレター</h2>
				<p className="text-red-100 text-sm mb-8 font-light">
					Subscribe for updates and exclusive offers
				</p>
				<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
					<input
						type="email"
						placeholder="your@email.com"
						className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white text-sm"
					/>
					<button
						type="button"
						className="bg-white text-red-700 px-6 py-3 text-sm font-medium hover:bg-red-50 transition-colors"
					>
						subscribe
					</button>
				</div>
			</div>
		</section>
	);
}

export default Newsletter;
