import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ searchQuery, setSearchQuery, onSearch }) => {
	return (
		<section className="relative bg-white py-16 sm:py-24">
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="order-2 md:order-1">
						<p className="text-red-700 text-xs font-medium tracking-widest uppercase mb-4">
							New Collection
						</p>
						<h1 className="text-4xl sm:text-5xl font-semibold mb-4 leading-tight text-gray-900">
							Discover Your Next
							<br />
							<span className="text-red-700">Great Read</span>
						</h1>
						<p className="text-gray-500 mb-8 text-base max-w-md leading-relaxed">
							Explore thousands of titles across every genre. Free shipping on
							orders over €25. Find your perfect book today.
						</p>

						<form onSubmit={onSearch} className="relative max-w-md mb-8">
							<input
								type="text"
								placeholder="Search by title, author or ISBN..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-700 focus:bg-white transition-all text-sm"
							/>
							<button
								type="submit"
								className="absolute right-0.5 top-0.5 bottom-0.5 bg-red-700 text-white px-4 hover:bg-red-800 transition-colors flex items-center justify-center"
							>
								<Search className="w-4 h-4" />
							</button>
						</form>

						<div className="flex gap-3">
							<Link
								to="/products?featured=true"
								className="bg-red-700 text-white px-6 py-3 text-sm font-medium hover:bg-red-800 transition-colors"
							>
								Bestsellers
							</Link>
							<Link
								to="/products"
								className="border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
							>
								Explore All
							</Link>
						</div>
					</div>

					<div className="order-1 md:order-2">
						<div className="relative">
							<div className="absolute -inset-4 border border-gray-100" />
							<div className="relative overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=700&fit=crop"
									alt="Books collection"
									className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-500"
								/>
							</div>
							<div className="absolute bottom-4 right-4 bg-white px-4 py-2.5 shadow-sm">
								<span className="text-red-700 font-semibold text-sm">1,200+</span>
								<span className="text-gray-500 text-xs ml-1">titles</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
