import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, Grid3X3, LayoutList, Star, ShoppingCart, Eye } from 'lucide-react';
import { useProducts, useProductFilters } from '../hooks/useProducts';
import { useCart } from '../contexts';

const ProductCard = ({ product, onAddToCart }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [imageError, setImageError] = useState(false);

	const fallbackImage = `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(product.name || 'Book')}`;

	return (
		<div
			className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-out"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
				<img
					src={imageError ? fallbackImage : product.image || fallbackImage}
					alt={product.name}
					className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
					onError={() => setImageError(true)}
				/>
				<div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
				
				{product.type_book && (
					<span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-amber-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
						{product.type_book}
					</span>
				)}

				<div className={`absolute bottom-3 left-3 right-3 flex gap-2 justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<Link
						to={`/products/${product.isbn}`}
						className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors shadow-lg"
					>
						<Eye className="w-4 h-4" />
						Ver
					</Link>
					<button
						onClick={() => onAddToCart(product)}
						disabled={product.unit_stock === 0}
						className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-amber-700 transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
					>
						<ShoppingCart className="w-4 h-4" />
						{product.unit_stock === 0 ? 'Agotado' : 'Añadir'}
					</button>
				</div>

				{product.unit_stock > 0 && product.unit_stock <= 5 && (
					<span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
						¡Últimas {product.unit_stock} unidades!
					</span>
				)}
			</div>

			<div className="p-4">
				{product.category && (
					<p className="text-xs text-amber-600 font-medium mb-1 uppercase tracking-wide">
						{product.category}
					</p>
				)}
				<h3 className="font-bold text-gray-900 mb-1 line-clamp-2 h-12 leading-tight text-sm">
					{product.name}
				</h3>
				<p className="text-gray-500 text-xs mb-3">
					{product.authors?.length > 0 ? product.authors.join(', ') : 'Autor desconocido'}
				</p>

				<div className="flex items-center justify-between">
					<span className="text-xl font-black text-gray-900">
						{product.price}€
					</span>
					<div className="flex items-center gap-1 text-amber-500">
						<Star className="w-3.5 h-3.5 fill-current" />
						<span className="text-xs font-medium text-gray-600">4.8</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const FilterSidebar = ({ filters, updateFilter, resetFilters, categories, typeBooks, priceRange, isOpen, onClose }) => {
	const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

	const handlePriceChange = () => {
		updateFilter('priceRange', localPriceRange);
	};

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
				onClick={onClose}
			/>
			<aside className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white lg:bg-transparent z-50 lg:z-auto transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-2xl lg:shadow-none overflow-y-auto`}>
				<div className="p-6 lg:p-0">
					<div className="flex items-center justify-between mb-6 lg:hidden">
						<h2 className="text-lg font-bold">Filtros</h2>
						<button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-gray-900">Filtros</h3>
							<button
								onClick={resetFilters}
								className="text-xs text-amber-600 hover:text-amber-700 font-medium"
							>
								Limpiar todo
							</button>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Buscar
							</label>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Título, autor, ISBN..."
									value={filters.search}
									onChange={(e) => updateFilter('search', e.target.value)}
									className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Categoría
							</label>
							<div className="relative">
								<select
									value={filters.category}
									onChange={(e) => updateFilter('category', e.target.value)}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white cursor-pointer"
								>
									{categories.map((cat) => (
										<option key={cat} value={cat}>
											{cat === 'all' ? 'Todas las categorías' : cat}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Tipo de libro
							</label>
							<div className="relative">
								<select
									value={filters.typeBook}
									onChange={(e) => updateFilter('typeBook', e.target.value)}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white cursor-pointer"
								>
									{typeBooks.map((type) => (
										<option key={type} value={type}>
											{type === 'all' ? 'Todos los tipos' : type}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Precio: {localPriceRange[0]}€ - {localPriceRange[1]}€
							</label>
							<div className="space-y-3">
								<input
									type="range"
									min={Math.floor(priceRange[0])}
									max={Math.ceil(priceRange[1])}
									value={localPriceRange[1]}
									onChange={(e) => setLocalPriceRange([localPriceRange[0], parseInt(e.target.value)])}
									onMouseUp={handlePriceChange}
									onTouchEnd={handlePriceChange}
									className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Ordenar por
							</label>
							<div className="relative">
								<select
									value={filters.sortBy}
									onChange={(e) => updateFilter('sortBy', e.target.value)}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white cursor-pointer"
								>
									<option value="default">Relevancia</option>
									<option value="price-asc">Precio: menor a mayor</option>
									<option value="price-desc">Precio: mayor a menor</option>
									<option value="name">Nombre A-Z</option>
									<option value="stock">Stock disponible</option>
								</select>
								<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
							</div>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

const Products = () => {
	const { products, loading, error } = useProducts();
	const { filters, updateFilter, resetFilters, filteredProducts, categories, typeBooks, priceRange } = useProductFilters(products);
	const { addToCart } = useCart();
	const [searchParams] = useSearchParams();
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [viewMode, setViewMode] = useState('grid');

	const initialCategory = searchParams.get('category');
	useState(() => {
		if (initialCategory && initialCategory !== 'all') {
			updateFilter('category', initialCategory);
		}
	});

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-200 rounded w-48 mb-8" />
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{[...Array(8)].map((_, i) => (
								<div key={i} className="bg-white rounded-2xl overflow-hidden">
									<div className="aspect-[3/4] bg-gray-200" />
									<div className="p-4 space-y-3">
										<div className="h-4 bg-gray-200 rounded w-3/4" />
										<div className="h-3 bg-gray-200 rounded w-1/2" />
										<div className="h-6 bg-gray-200 rounded w-1/4" />
									</div>
								</div>
							))}
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
						<X className="w-8 h-8 text-red-500" />
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar</h2>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
					>
						Reintentar
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl md:text-5xl font-black mb-4">Catálogo de Libros</h1>
					<p className="text-amber-100 text-lg max-w-2xl">
						Explora nuestra colección de libros. Encuentra tu próxima lectura favorita entre cientos de títulos.
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					<FilterSidebar
						filters={filters}
						updateFilter={updateFilter}
						resetFilters={resetFilters}
						categories={categories}
						typeBooks={typeBooks}
						priceRange={priceRange}
						isOpen={isFilterOpen}
						onClose={() => setIsFilterOpen(false)}
					/>

					<div className="flex-1">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-4">
								<button
									onClick={() => setIsFilterOpen(true)}
									className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
								>
									<Filter className="w-4 h-4" />
									Filtros
								</button>
								<p className="text-gray-600 text-sm">
									<span className="font-semibold text-gray-900">{filteredProducts.length}</span> productos encontrados
								</p>
							</div>
							<div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
								<button
									onClick={() => setViewMode('grid')}
									className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
								>
									<Grid3X3 className="w-4 h-4" />
								</button>
								<button
									onClick={() => setViewMode('list')}
									className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
								>
									<LayoutList className="w-4 h-4" />
								</button>
							</div>
						</div>

						{filters.search || filters.category !== 'all' || filters.typeBook !== 'all' || filters.sortBy !== 'default' ? (
							<div className="flex flex-wrap gap-2 mb-6">
								{filters.search && (
									<span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
										"{filters.search}"
										<button onClick={() => updateFilter('search', '')} className="ml-1 hover:text-amber-900">
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								)}
								{filters.category !== 'all' && (
									<span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
										{filters.category}
										<button onClick={() => updateFilter('category', 'all')} className="ml-1 hover:text-gray-900">
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								)}
								{filters.typeBook !== 'all' && (
									<span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
										{filters.typeBook}
										<button onClick={() => updateFilter('typeBook', 'all')} className="ml-1 hover:text-gray-900">
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								)}
							</div>
						) : null}

						{filteredProducts.length === 0 ? (
							<div className="text-center py-16 bg-white rounded-2xl">
								<div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Search className="w-10 h-10 text-gray-300" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
								<p className="text-gray-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
								<button
									onClick={resetFilters}
									className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
								>
									Limpiar filtros
								</button>
							</div>
						) : (
							<div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
								{filteredProducts.map((product, index) => (
									<div
										key={product.isbn}
										className="animate-fade-in-up opacity-0"
										style={{ animationDelay: `${index * 0.05}s` }}
									>
										<ProductCard product={product} onAddToCart={addToCart} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
