import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../../contexts";
import { useFeaturedBooks } from "../../hooks/useBooks";

const StarRating = ({ rating }) => {
	const stars = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	for (let i = 0; i < 5; i++) {
		if (i < fullStars) {
			stars.push(
				<Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />,
			);
		} else if (i === fullStars && hasHalfStar) {
			stars.push(
				<Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />,
			);
		} else {
			stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
		}
	}

	return <div className="flex items-center gap-0.5">{stars}</div>;
};

const FeaturedBooks = () => {
	const { addToCart } = useCart();
	const { books, loading, error } = useFeaturedBooks();

	if (loading)
		return (
			<div className="text-center py-16 text-gray-400 font-light">
				Loading...
			</div>
		);

	if (error)
		return (
			<div className="text-center py-16 text-red-600 bg-red-50 mx-4 my-8">
				{error}
			</div>
		);

	if (books.length === 0)
		return (
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
						Featured
					</h2>
					<p className="text-gray-500 text-center">
						No featured books available.
					</p>
				</div>
			</section>
		);

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-end mb-10">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">注目の本</h2>
						<p className="text-gray-500 text-sm mt-1 font-light">
							Featured books
						</p>
					</div>
					<Link
						to="/products"
						className="text-sm font-medium text-red-700 hover:text-red-800 transition-colors"
					>
						view all →
					</Link>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
					{books.map((book) => (
						<div
							key={book.isbn}
							className="bg-white hover:bg-gray-50 transition-colors group"
						>
							<Link to={`/products/${book.isbn}`}>
								<div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
									<img
										src={
											book.image ||
											`https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop`
										}
										alt={book.name}
										className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
									/>
									{book.type_book && (
										<span className="absolute top-2 left-2 bg-white border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
											{book.type_book === "fisico" ? "physical" : "digital"}
										</span>
									)}
									{book.unit_stock === 0 && (
										<div className="absolute inset-0 bg-white/80 flex items-center justify-center">
											<span className="bg-gray-900 text-white px-3 py-1 text-xs font-medium">
												sold out
											</span>
										</div>
									)}
								</div>
							</Link>

							<div className="p-3">
								<Link to={`/products/${book.isbn}`}>
									<h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
										{book.name}
									</h3>
								</Link>
								<p className="text-gray-500 text-xs mb-2">
									{book.authors?.length > 0
										? book.authors.join(", ")
										: "Unknown Author"}
								</p>

								<div className="flex items-center justify-between mb-2">
									<StarRating rating={book.averageRating || 0} />
									<span className="text-xs text-gray-400">
										({book.totalReviews || 0})
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-base font-semibold text-gray-900">
										{Number(book.price).toFixed(2)}
										<span className="text-xs ml-0.5">€</span>
									</span>
									<div className="flex gap-1">
										<Link
											to={`/products/${book.isbn}`}
											className="p-1.5 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
											title="View details"
										>
											<Eye className="w-3.5 h-3.5" />
										</Link>
										<button
											type="button"
											onClick={() => addToCart(book)}
											disabled={book.unit_stock === 0}
											className={`p-1.5 font-medium text-xs transition-colors ${
												book.unit_stock === 0
													? "bg-gray-100 text-gray-400 cursor-not-allowed"
													: "bg-red-700 text-white hover:bg-red-800"
											}`}
										>
											<ShoppingCart className="w-3.5 h-3.5" />
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedBooks;
