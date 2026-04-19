import { Link } from "react-router-dom";
import { TrendingUp, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts";
import { useFeaturedBooks } from "../../hooks/useBooks";

const TrendingNow = () => {
	const { addToCart } = useCart();
	const { books, loading } = useFeaturedBooks();

	if (loading || books.length === 0) return null;

	const salesCount = Math.floor(Math.random() * 50) + 20;
	const topSeller = books[0]?.name?.substring(0, 25) || "Popular title";

	return (
		<section className="py-12 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<TrendingUp className="w-6 h-6 text-red-700" />
						<h2 className="text-2xl font-semibold text-gray-900">
							Trending Now
						</h2>
					</div>
					<p className="text-sm text-gray-500 flex items-center gap-2">
						<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
						"{topSeller}..." sold{" "}
						<span className="font-semibold text-gray-900">{salesCount}x</span> today
					</p>
				</div>

				<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
					{books.map((book, index) => (
						<div
							key={book.isbn}
							className="flex-shrink-0 w-56 bg-white border border-gray-200 hover:border-red-200 transition-colors group"
						>
							<Link to={`/products/${book.isbn}`}>
								<div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
									<img
										src={
											book.image ||
											"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
										}
										alt={book.name}
										className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
									/>
									<div className="absolute top-2 left-2 w-6 h-6 bg-gray-900 text-white text-xs font-bold flex items-center justify-center rounded-full">
										{index + 1}
									</div>
									{book.type_book && (
										<span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm border border-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600">
											{book.type_book === "fisico" ? "Physical" : "Digital"}
										</span>
									)}
								</div>
							</Link>

							<div className="p-4">
								<Link to={`/products/${book.isbn}`}>
									<h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
										{book.name}
									</h3>
								</Link>
								<p className="text-gray-500 text-xs mb-3 truncate">
									{book.authors?.[0] || "Unknown Author"}
								</p>
								<div className="flex items-center justify-between">
									<span className="text-base font-semibold text-gray-900">
										€{Number(book.price).toFixed(2)}
									</span>
									<button
										type="button"
										onClick={() => addToCart(book)}
										disabled={book.unit_stock === 0}
										className={`p-2 transition-colors ${
											book.unit_stock === 0
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-red-700 text-white hover:bg-red-800"
										}`}
										title="Add to cart"
									>
										<ShoppingCart className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TrendingNow;
