import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { booksApi } from '../api';
import { useCart } from '../contexts';

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
				if (response.status === 'success') {
					setProduct(response.data);
				} else {
					throw new Error(response.message || 'Producto no encontrado');
				}
			} catch (err) {
				setError(err.message || 'Error al cargar el producto');
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
		if (quantity > 1) setQuantity(q => q - 1);
	};

	const increaseQuantity = () => {
		if (quantity < (product?.unit_stock || 1)) {
			setQuantity(q => q + 1);
		}
	};

	const fallbackImage = `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(product?.name || 'Book')}`;
	const images = product?.images?.length > 0 ? product.images : [product?.image || fallbackImage];

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse">
						<div className="grid lg:grid-cols-2 gap-12">
							<div className="space-y-4">
								<div className="aspect-[3/4] bg-gray-200 rounded-2xl" />
								<div className="flex gap-3">
									{[1, 2, 3, 4].map(i => (
										<div key={i} className="w-20 h-24 bg-gray-200 rounded-xl" />
									))}
								</div>
							</div>
							<div className="space-y-6">
								<div className="h-6 bg-gray-200 rounded w-32" />
								<div className="h-10 bg-gray-200 rounded w-3/4" />
								<div className="h-8 bg-gray-200 rounded w-24" />
								<div className="h-20 bg-gray-200 rounded" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Star className="w-8 h-8 text-red-500" />
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
					<p className="text-gray-600 mb-4">{error}</p>
					<Link
						to="/products"
						className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Volver al catálogo
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<button
						onClick={() => navigate(-1)}
						className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 font-medium transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Volver
					</button>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid lg:grid-cols-2 gap-12">
					<div className="space-y-4">
						<div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-lg">
							<img
								src={imageError ? fallbackImage : images[selectedImage] || fallbackImage}
								alt={product.name}
								className="w-full h-full object-cover"
								onError={() => setImageError(true)}
							/>
							{product.type_book && (
								<span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider shadow-sm">
									{product.type_book}
								</span>
							)}
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
							>
								<Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
							</button>
						</div>
						{images.length > 1 && (
							<div className="flex gap-3 overflow-x-auto pb-2">
								{images.map((img, idx) => (
									<button
										key={idx}
										onClick={() => setSelectedImage(idx)}
										className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-amber-600 ring-2 ring-amber-100' : 'border-transparent hover:border-gray-200'}`}
									>
										<img
											src={img}
											alt={`${product.name} - imagen ${idx + 1}`}
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

					<div className="space-y-6">
						{product.category && (
							<Link
								to={`/products?category=${product.category}`}
								className="inline-block text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors"
							>
								{product.category}
							</Link>
						)}

						<h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
							{product.name}
						</h1>

						<div className="flex items-center gap-4">
							<div className="flex items-center gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`w-5 h-5 ${star <= 4 ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
									/>
								))}
							</div>
							<span className="text-gray-500 text-sm">4.8 (128 reseñas)</span>
						</div>

						<div className="flex items-baseline gap-2">
							<span className="text-4xl font-black text-gray-900">{product.price}€</span>
							{product.original_price && (
								<span className="text-xl text-gray-400 line-through">{product.original_price}€</span>
							)}
							{product.discount && (
								<span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
									-{product.discount}%
								</span>
							)}
						</div>

						<div className="flex items-center gap-2">
							<Check className="w-5 h-5 text-green-500" />
							<span className="text-gray-600">
								{product.unit_stock > 0 ? (
									<>
										<span className="font-semibold text-green-600">{product.unit_stock}</span> unidades disponibles
									</>
								) : (
									<span className="font-semibold text-red-500">Agotado</span>
								)}
							</span>
						</div>

						{product.description && (
							<p className="text-gray-600 leading-relaxed">
								{product.description}
							</p>
						)}

						<div className="border-t border-b border-gray-100 py-6 space-y-4">
							<div className="flex items-center gap-3">
								<label className="text-gray-700 font-medium">Cantidad:</label>
								<div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
									<button
										onClick={decreaseQuantity}
										disabled={quantity <= 1}
										className="px-4 py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Minus className="w-4 h-4" />
									</button>
									<span className="px-6 py-2.5 font-semibold border-x border-gray-200 min-w-[60px] text-center">
										{quantity}
									</span>
									<button
										onClick={increaseQuantity}
										disabled={quantity >= product.unit_stock}
										className="px-4 py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
							</div>

							<div className="flex gap-3">
								<button
									onClick={handleAddToCart}
									disabled={product.unit_stock === 0}
									className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-amber-200 hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									<ShoppingCart className="w-5 h-5" />
									{product.unit_stock === 0 ? 'Agotado' : 'Añadir al carrito'}
								</button>
								<button className="px-4 py-4 border border-gray-200 rounded-xl hover:border-amber-600 hover:text-amber-600 transition-colors">
									<Share2 className="w-5 h-5" />
								</button>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-4">
							<div className="text-center p-4 bg-gray-50 rounded-xl">
								<Truck className="w-6 h-6 mx-auto mb-2 text-amber-600" />
								<p className="text-xs font-medium text-gray-700">Envío gratis</p>
								<p className="text-xs text-gray-500">Desde 25€</p>
							</div>
							<div className="text-center p-4 bg-gray-50 rounded-xl">
								<Shield className="w-6 h-6 mx-auto mb-2 text-amber-600" />
								<p className="text-xs font-medium text-gray-700">Compra segura</p>
								<p className="text-xs text-gray-500">Datos protegidos</p>
							</div>
							<div className="text-center p-4 bg-gray-50 rounded-xl">
								<RotateCcw className="w-6 h-6 mx-auto mb-2 text-amber-600" />
								<p className="text-xs font-medium text-gray-700">Devolución</p>
								<p className="text-xs text-gray-500">30 días</p>
							</div>
						</div>

						<div className="bg-amber-50 rounded-xl p-4 space-y-3">
							<h3 className="font-semibold text-gray-900">Detalles del producto</h3>
							<dl className="grid grid-cols-2 gap-3 text-sm">
								<div>
									<dt className="text-gray-500">ISBN</dt>
									<dd className="font-medium">{product.isbn}</dd>
								</div>
								<div>
									<dt className="text-gray-500">Autor(es)</dt>
									<dd className="font-medium">{product.authors?.join(', ') || 'No especificado'}</dd>
								</div>
								<div>
									<dt className="text-gray-500">Editorial</dt>
									<dd className="font-medium">{product.publisher || 'No especificada'}</dd>
								</div>
								<div>
									<dt className="text-gray-500">Idioma</dt>
									<dd className="font-medium">{product.language || 'Español'}</dd>
								</div>
								<div>
									<dt className="text-gray-500">Páginas</dt>
									<dd className="font-medium">{product.pages || 'No especificado'}</dd>
								</div>
								<div>
									<dt className="text-gray-500">Año de publicación</dt>
									<dd className="font-medium">{product.published_year || 'No especificado'}</dd>
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
