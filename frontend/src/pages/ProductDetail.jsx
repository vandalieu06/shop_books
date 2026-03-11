import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Star,
	ShoppingCart,
	Heart,
	Share2,
	Check,
	Truck,
	Shield,
	RotateCcw,
	Minus,
	Plus,
} from "lucide-react";
import { booksApi } from "../api";
import { useCart } from "../contexts";

const transformBook = (book) => {
	if (!book) return book;
	const getName = (item) => {
		if (typeof item === "string") return item;
		if (item && typeof item === "object" && item.name) return item.name;
		return String(item);
	};
	const getString = (val) => {
		if (val == null) return "";
		if (typeof val === "string") return val;
		if (typeof val === "number") return String(val);
		if (Array.isArray(val)) return val.map(getName).join(", ");
		if (typeof val === "object" && val.name) return val.name;
		return String(val);
	};
	return {
		...book,
		authors: Array.isArray(book.authors) ? book.authors.map(getName) : [],
		category: getName(book.categories?.[0]) || getName(book.category) || "",
		categories: undefined,
		publisher: getString(book.publisher),
		language: getString(book.language),
		type_book: getString(book.type_book),
		image:
			book.image ||
			`https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name || "Book")}`,
	};
};

const ProductDetail = () => {
	const { isbn } = useParams();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await booksApi.getById(isbn);
				if (response.status === "success") {
					setProduct(transformBook(response.data));
				} else {
					throw new Error(response.message || "Product not found");
				}
			} catch (err) {
				setError(err.message || "Error loading product");
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [isbn]);

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addToCart(product);
		}
	};

	const decreaseQuantity = () => {
		if (quantity > 1) setQuantity((q) => q - 1);
	};

	const increaseQuantity = () => {
		if (quantity < (product?.unit_stock || 1)) {
			setQuantity((q) => q + 1);
		}
	};

	const fallbackImage = `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(product?.name || "Book")}`;
	const images =
		product?.images?.length > 0
			? product.images
			: [product?.image || fallbackImage];

	if (loading) {
		return (
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse">
						<div className="grid lg:grid-cols-2 gap-10">
							<div className="space-y-3">
								<div className="aspect-[3/4] bg-gray-100" />
								<div className="flex gap-2">
									{[1, 2, 3, 4].map((i) => (
										<div key={i} className="w-16 h-20 bg-gray-100" />
									))}
								</div>
							</div>
							<div className="space-y-4">
								<div className="h-4 bg-gray-100 w-20" />
								<div className="h-8 bg-gray-100 w-3/4" />
								<div className="h-6 bg-gray-100 w-24" />
								<div className="h-16 bg-gray-100" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center p-8 bg-gray-50 border border-gray-100 max-w-md">
					<div className="w-12 h-12 bg-red-50 flex items-center justify-center mx-auto mb-4">
						<Star className="w-6 h-6 text-red-700" />
					</div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Product not found
					</h2>
					<p className="text-gray-500 text-sm mb-4">{error}</p>
					<Link
						to="/products"
						className="inline-flex items-center gap-2 px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						<ArrowLeft className="w-3.5 h-3.5" />
						Back to catalog
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
					<button
						onClick={() => navigate(-1)}
						className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-700 font-medium transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						back
					</button>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid lg:grid-cols-2 gap-10">
					<div className="space-y-3">
						<div className="relative aspect-[3/4] bg-gray-50 border border-gray-100">
							<img
								src={
									imageError
										? fallbackImage
										: images[selectedImage] || fallbackImage
								}
								alt={product.name}
								className="w-full h-full object-cover"
								onError={() => setImageError(true)}
							/>
							{product.type_book && (
								<span className="absolute top-3 left-3 bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
									{product.type_book}
								</span>
							)}
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className="absolute top-3 right-3 p-2 bg-white border border-gray-200 hover:border-gray-300 transition-colors"
							>
								<Heart
									className={`w-4 h-4 ${isFavorite ? "fill-red-700 text-red-700" : "text-gray-400"}`}
								/>
							</button>
						</div>
						{images.length > 1 && (
							<div className="flex gap-2 overflow-x-auto pb-1">
								{images.map((img, idx) => (
									<button
										key={idx}
										onClick={() => setSelectedImage(idx)}
										className={`flex-shrink-0 w-16 h-20 border transition-colors ${selectedImage === idx ? "border-red-700" : "border-gray-200 hover:border-gray-300"}`}
									>
										<img
											src={img}
											alt={`${product.name} - ${idx + 1}`}
											className="w-full h-full object-cover"
											onError={(e) => {
												e.target.src = fallbackImage;
											}}
										/>
									</button>
								))}
							</div>
						)}
					</div>

					<div className="space-y-5">
						{product.category && (
							<Link
								to={`/products?category=${product.category}`}
								className="inline-block text-xs font-medium text-red-700 uppercase tracking-wide hover:text-red-800 transition-colors"
							>
								{product.category}
							</Link>
						)}

						<h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
							{product.name}
						</h1>

						<div className="flex items-center gap-3">
							<div className="flex items-center gap-0.5">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`w-4 h-4 ${star <= 4 ? "fill-gray-900 text-gray-900" : "fill-gray-200 text-gray-200"}`}
									/>
								))}
							</div>
							<span className="text-gray-500 text-sm">4.8 (128 reviews)</span>
						</div>

						<div className="flex items-baseline gap-2">
							<span className="text-3xl font-semibold text-gray-900">
								{product.price}€
							</span>
							{product.original_price && (
								<span className="text-lg text-gray-400 line-through">
									{product.original_price}€
								</span>
							)}
							{product.discount && (
								<span className="px-2 py-0.5 bg-red-700 text-white text-xs font-medium">
									-{product.discount}%
								</span>
							)}
						</div>

						<div className="flex items-center gap-2 py-2">
							<Check className="w-4 h-4 text-green-600" />
							<span className="text-sm text-gray-600">
								{product.unit_stock > 0 ? (
									<>
										<span className="font-medium text-green-600">
											{product.unit_stock}
										</span>{" "}
										units available
									</>
								) : (
									<span className="font-medium text-red-700">Out of stock</span>
								)}
							</span>
						</div>

						{product.description && (
							<p className="text-gray-600 leading-relaxed text-sm font-light">
								{product.description}
							</p>
						)}

						<div className="border-t border-b border-gray-100 py-5 space-y-4">
							<div className="flex items-center gap-3">
								<label className="text-sm font-medium text-gray-700">
									Qty:
								</label>
								<div className="flex items-center border border-gray-200">
									<button
										onClick={decreaseQuantity}
										disabled={quantity <= 1}
										className="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Minus className="w-3.5 h-3.5" />
									</button>
									<span className="px-4 py-2 font-medium border-x border-gray-200 min-w-[50px] text-center text-sm">
										{quantity}
									</span>
									<button
										onClick={increaseQuantity}
										disabled={quantity >= product.unit_stock}
										className="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Plus className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>

							<div className="flex gap-2">
								<button
									onClick={handleAddToCart}
									disabled={product.unit_stock === 0}
									className="flex-1 flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white py-3 font-medium text-sm transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
								>
									<ShoppingCart className="w-4 h-4" />
									{product.unit_stock === 0 ? "Out of Stock" : "Add to Cart"}
								</button>
								<button className="px-3 py-3 border border-gray-200 hover:border-gray-400 hover:text-gray-700 transition-colors">
									<Share2 className="w-4 h-4" />
								</button>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-px bg-gray-200 border border-gray-200">
							<div className="text-center p-3 bg-white">
								<Truck className="w-4 h-4 mx-auto mb-1 text-gray-400" />
								<p className="text-xs font-medium text-gray-700">Free ship</p>
								<p className="text-xs text-gray-400">From €25</p>
							</div>
							<div className="text-center p-3 bg-white">
								<Shield className="w-4 h-4 mx-auto mb-1 text-gray-400" />
								<p className="text-xs font-medium text-gray-700">Secure</p>
								<p className="text-xs text-gray-400">SSL</p>
							</div>
							<div className="text-center p-3 bg-white">
								<RotateCcw className="w-4 h-4 mx-auto mb-1 text-gray-400" />
								<p className="text-xs font-medium text-gray-700">Returns</p>
								<p className="text-xs text-gray-400">30 days</p>
							</div>
						</div>

						<div className="border border-gray-100 p-4 space-y-2">
							<h3 className="font-medium text-gray-900 text-sm">
								Product Details
							</h3>
							<dl className="grid grid-cols-2 gap-2 text-xs">
								<div>
									<dt className="text-gray-400">ISBN</dt>
									<dd className="font-medium text-gray-700">{product.isbn}</dd>
								</div>
								<div>
									<dt className="text-gray-400">Author(s)</dt>
									<dd className="font-medium text-gray-700">
										{product.authors?.join(", ") || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-gray-400">Publisher</dt>
									<dd className="font-medium text-gray-700">
										{product.publisher || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-gray-400">Language</dt>
									<dd className="font-medium text-gray-700">
										{product.language || "Spanish"}
									</dd>
								</div>
								<div>
									<dt className="text-gray-400">Pages</dt>
									<dd className="font-medium text-gray-700">
										{product.pages || "N/A"}
									</dd>
								</div>
								<div>
									<dt className="text-gray-400">Year</dt>
									<dd className="font-medium text-gray-700">
										{product.published_year || "N/A"}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
