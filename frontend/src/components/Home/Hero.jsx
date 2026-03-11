import { Search } from "lucide-react";

const Hero = ({ searchQuery, setSearchQuery }) => {
	return (
		<section className="relative bg-white py-16 sm:py-20">
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-10 items-center">
					<div className="order-2 md:order-1">
						<div className="inline-block border border-red-700 text-red-700 px-3 py-1 text-xs font-medium mb-6 tracking-wider">
							new collection
						</div>
						<h1 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight text-gray-900">
							発見
						</h1>
						<p className="text-lg mb-2 text-gray-600 font-light">
							Your next great read awaits
						</p>
						<p className="text-gray-500 mb-8 text-sm max-w-md">
							Free shipping on orders over €25. Discover thousands of titles
							across all genres.
						</p>

						<div className="relative max-w-md mb-8">
							<input
								type="text"
								placeholder="Search by title, author or ISBN..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-700 transition-colors text-sm"
							/>
							<button
								type="button"
								className="absolute right-1 top-1 bottom-1 bg-red-700 text-white px-4 hover:bg-red-800 transition-colors"
							>
								<Search className="w-4 h-4" />
							</button>
						</div>

						<div className="flex gap-4">
							<button
								type="button"
								className="bg-red-700 text-white px-6 py-3 text-sm font-medium hover:bg-red-800 transition-colors"
							>
								bestsellers
							</button>
							<button
								type="button"
								className="border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
							>
								explore
							</button>
						</div>
					</div>

					<div className="order-1 md:order-2">
						<div className="relative">
							<div className="absolute -inset-4 border border-gray-100" />
							<img
								src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=700&fit=crop"
								alt="Books"
								className="relative w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-500"
							/>
							<div className="absolute bottom-4 right-4 bg-white px-4 py-2 text-xs font-medium text-gray-500">
								<span className="text-red-700 font-semibold">1,200+</span>{" "}
								titles
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
