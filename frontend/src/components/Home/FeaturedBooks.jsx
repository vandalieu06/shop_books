import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../../contexts";
import { useFeaturedBooks } from "../../hooks/useBooks";

const StarRating = ({ rating }) => {
	const stars = Array.from({ length: 5 }, (_, i) => {
		const filled = i < Math.floor(rating);
		return (
			<Star
				key={i}
				className={`w-3 h-3 ${filled ? "fill-gray-900 text-gray-900" : "text-gray-300"}`}
			/>
		);
	});
	return <div className="flex items-center gap-0.5">{stars}</div>;
};

const BookCard = ({ book, onAddToCart }) => {
	const isOutOfStock = book.unit_stock === 0;

	return (
		<div className="bg-white hover:bg-gray-50 transition-colors group border border-gray-200 hover:border-red-200">
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
					{book.type_book && (
						<span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
							{book.type_book === "fisico" ? "Physical" : "Digital"}
						</span>
					)}
					{isOutOfStock && (
						<div className="absolute inset-0 bg-white/80 flex items-center justify-center">
							<span className="bg-gray-900 text-white px-3 py-1 text-xs font-medium">
								Sold Out
							</span>
						</div>
					)}
				</div>
			</Link>

			<div className="p-4">
				<Link to={`/products/${book.isbn}`}>
					<h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
						{book.name}
					</h3>
				</Link>
				<p className="text-gray-500 text-xs mb-2">
					{book.authors?.length > 0 ? book.authors.join(", ") : "Unknown Author"}
				</p>

				<div className="flex items-center justify-between mb-3">
					<StarRating rating={book.averageRating || 0} />
					<span className="text-xs text-gray-400">
						({book.totalReviews || 0})
					</span>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-base font-semibold text-gray-900">
						€{Number(book.price).toFixed(2)}
					</span>
					<div className="flex gap-1.5">
						<Link
							to={`/products/${book.isbn}`}
							className="p-2 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
							title="View details"
						>
							<Eye className="w-3.5 h-3.5" />
						</Link>
						<button
							type="button"
							onClick={() => onAddToCart(book)}
							disabled={isOutOfStock}
							className={`p-2 transition-colors ${
								isOutOfStock
									? "bg-gray-100 text-gray-400 cursor-not-allowed"
									: "bg-red-700 text-white hover:bg-red-800"
							}`}
							title="Add to cart"
						>
							<ShoppingCart className="w-3.5 h-3.5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const FeaturedBooks = () => {
	const { addToCart } = useCart();
	const { books, loading, error } = useFeaturedBooks();

	if (loading) {
		return (
			<section className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-end mb-8">
						<div>
							<h2 className="text-2xl font-semibold text-gray-900">
								Editor's Picks
							</h2>
							<div className="h-px bg-red-700 w-12 mt-3" />
						</div>
					</div>
					<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="flex-shrink-0 w-56 bg-white border border-gray-200">
								<div className="aspect-[3/4] bg-gray-100 animate-pulse" />
								<div className="p-4 space-y-2">
									<div className="h-4 bg-gray-100 rounded w-3/4" />
									<div className="h-3 bg-gray-100 rounded w-1/2" />
									<div className="h-3 bg-gray-100 rounded w-1/4" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p className="text-red-600 bg-red-50 px-4 py-3 text-sm">{error}</p>
				</div>
			</section>
		);
	}

	if (books.length === 0) {
		return null;
	}

	return (
		<section className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-end mb-8">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">
							Editor's Picks
						</h2>
						<p className="text-gray-500 text-sm mt-1">Curated by our team</p>
						<div className="h-px bg-red-700 w-12 mt-3" />
					</div>
					<Link
						to="/products"
						className="text-sm font-medium text-red-700 hover:text-red-800 transition-colors"
					>
						View all →
					</Link>
				</div>

				<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
					{books.map((book) => (
						<div key={book.isbn} className="flex-shrink-0 w-56">
							<BookCard book={book} onAddToCart={addToCart} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedBooks;
