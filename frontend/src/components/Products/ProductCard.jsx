import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { getFallbackImage } from "../../utils/transformBook";

const ProductCard = ({ product, onAddToCart }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [imageError, setImageError] = useState(false);

	const fallbackImage = getFallbackImage(product.name);

	return (
		<div
			className="group bg-white border border-gray-100 hover:border-gray-200 transition-colors"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
				<img
					src={imageError ? fallbackImage : product.image || fallbackImage}
					alt={product.name}
					className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? "grayscale-0" : "grayscale"}`}
					onError={() => setImageError(true)}
				/>

				{product.type_book && (
					<span className="absolute top-2 left-2 bg-white border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
						{product.type_book}
					</span>
				)}

				<div
					className={`absolute bottom-0 left-0 right-0 p-2 bg-white/90 backdrop-blur-sm flex justify-center gap-2 transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
				>
					<Link
						to={`/products/${product.isbn}`}
						className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white py-2 text-xs font-medium hover:bg-gray-800 transition-colors"
					>
						<Eye className="w-3 h-3" />
						view
					</Link>
					<button
						onClick={() => onAddToCart(product)}
						disabled={product.unit_stock === 0}
						className="flex-1 flex items-center justify-center gap-1 bg-red-700 text-white py-2 text-xs font-medium hover:bg-red-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
					>
						<ShoppingCart className="w-3 h-3" />
						{product.unit_stock === 0 ? "out" : "add"}
					</button>
				</div>

				{product.unit_stock > 0 && product.unit_stock <= 5 && (
					<span className="absolute top-2 right-2 bg-red-700 text-white px-2 py-0.5 text-xs font-medium">
						{product.unit_stock} left
					</span>
				)}
			</div>

			<div className="p-3">
				{product.category && (
					<p className="text-xs text-red-700 font-medium mb-1 uppercase tracking-wide">
						{product.category}
					</p>
				)}
				<h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-10 text-sm">
					{product.name}
				</h3>
				<p className="text-gray-500 text-xs mb-2">
					{product.authors?.length > 0 ? product.authors.join(", ") : "Unknown"}
				</p>

				<div className="flex items-center justify-between">
					<span className="text-base font-semibold text-gray-900">
						{product.price}€
					</span>
					<div className="flex items-center gap-1 text-gray-900">
						<Star className="w-3 h-3 fill-current" />
						<span className="text-xs font-medium text-gray-500">4.8</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
