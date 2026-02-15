import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../contexts';
import { useFeaturedBooks } from '../../hooks/useBooks';

const StarRating = ({ rating }) => {
	const stars = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	for (let i = 0; i < 5; i++) {
		if (i < fullStars) {
			stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
		} else if (i === fullStars && hasHalfStar) {
			stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
		} else {
			stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
		}
	}

	return <div className="flex items-center gap-0.5">{stars}</div>;
};

const FeaturedBooks = () => {
	const { addToCart } = useCart();
	const { books, loading, error } = useFeaturedBooks();

	if (loading)
		return (
			<div className="text-center py-16 animate-pulse text-gray-500 font-medium">
				Cargando libros destacados...
			</div>
		);

	if (error)
		return (
			<div className="text-center py-16 text-red-500 bg-red-50 rounded-xl mx-4 my-8">
				{error}
			</div>
		);

	if (books.length === 0)
		return (
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-black text-gray-900 tracking-tight mb-8">
						Libros Destacados
					</h2>
					<p className="text-gray-500">No hay libros destacados disponibles.</p>
				</div>
			</section>
		);

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-12">
					<h2 className="text-3xl font-black text-gray-900 tracking-tight">
						Libros Destacados
					</h2>
					<Link
						to="/products"
						className="text-amber-600 font-bold hover:text-amber-700 transition flex items-center gap-1"
					>
						Ver todos <span>→</span>
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{books.map((book) => (
						<div
							key={book.isbn}
							className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
						>
							<Link to={`/products/${book.isbn}`}>
								<div className="relative overflow-hidden aspect-[3/4]">
									<img
										src={
											book.image ||
											`https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop`
										}
										alt={book.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-amber-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
										{book.type_book === 'fisico' ? 'Físico' : 'Digital'}
									</span>
									{book.unit_stock === 0 && (
										<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
											<span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
												Agotado
											</span>
										</div>
									)}
								</div>
							</Link>

							<div className="p-4">
								<Link to={`/products/${book.isbn}`}>
									<h3 className="font-bold text-gray-900 mb-1 line-clamp-2 h-12 leading-tight hover:text-amber-600 transition">
										{book.name}
									</h3>
								</Link>
								<p className="text-gray-500 text-sm mb-3 italic">
									{book.authors?.length > 0
										? book.authors.join(', ')
										: 'Autor Desconocido'}
								</p>

								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center gap-2">
										<StarRating rating={book.averageRating || 0} />
										<span className="text-xs text-gray-500">
											({book.totalReviews || 0})
										</span>
									</div>
								</div>

								<div className="flex items-center justify-between mt-auto">
									<span className="text-2xl font-black text-gray-900">
										{Number(book.price).toFixed(2)}
										<span className="text-sm ml-0.5">€</span>
									</span>
									<div className="flex gap-2">
										<Link
											to={`/products/${book.isbn}`}
											className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
											title="Ver detalles"
										>
											<Eye className="w-4 h-4" />
										</Link>
										<button
											type="button"
											onClick={() => addToCart(book)}
											disabled={book.unit_stock === 0}
											className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
												book.unit_stock === 0
													? 'bg-gray-100 text-gray-400 cursor-not-allowed'
													: 'bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-200'
											}`}
										>
											<ShoppingCart className="w-4 h-4" />
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
