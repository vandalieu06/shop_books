import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	Search,
	Filter,
	X,
	ChevronDown,
	Grid3X3,
	LayoutList,
	Star,
	ShoppingCart,
	Eye,
} from "lucide-react";
import { useProducts, useProductFilters } from "../hooks/useProducts";
import { useCart } from "../contexts";
import ProductCard from "../components/products/ProductCard";

const FilterSidebar = ({
	filters,
	updateFilter,
	resetFilters,
	categories,
	typeBooks,
	priceRange,
	isOpen,
	onClose,
}) => {
	const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

	const handlePriceChange = () => {
		updateFilter("priceRange", localPriceRange);
	};

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				onClick={onClose}
			/>
			<aside
				className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-72 lg:w-56 bg-white lg:bg-transparent z-50 lg:z-auto transform transition-transform duration-200 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} border-r border-gray-100 lg:border-0`}
			>
				<div className="p-5 lg:p-0 h-full overflow-y-auto">
					<div className="flex items-center justify-between mb-6 lg:hidden">
						<h2 className="text-base font-semibold">Filters</h2>
						<button onClick={onClose} className="p-1 hover:bg-gray-50 rounded">
							<X className="w-4 h-4" />
						</button>
					</div>

					<div className="space-y-5">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-medium text-gray-900">Filter</h3>
							<button
								onClick={resetFilters}
								className="text-xs text-red-700 hover:text-red-800 font-medium"
							>
								clear
							</button>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
								Search
							</label>
							<div className="relative">
								<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
								<input
									type="text"
									placeholder="Title, author, ISBN..."
									value={filters.search}
									onChange={(e) => updateFilter("search", e.target.value)}
									className="w-full pl-8 pr-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
								Category
							</label>
							<div className="relative">
								<select
									value={filters.category}
									onChange={(e) => updateFilter("category", e.target.value)}
									className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700 appearance-none bg-white cursor-pointer"
								>
									{categories.map((cat) => (
										<option key={cat} value={cat}>
											{cat === "all" ? "All categories" : cat}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
							</div>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
								Type
							</label>
							<div className="relative">
								<select
									value={filters.typeBook}
									onChange={(e) => updateFilter("typeBook", e.target.value)}
									className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700 appearance-none bg-white cursor-pointer"
								>
									{typeBooks.map((type) => (
										<option key={type} value={type}>
											{type === "all" ? "All types" : type}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
							</div>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
								Price: {localPriceRange[0]}€ - {localPriceRange[1]}€
							</label>
							<input
								type="range"
								min={Math.floor(priceRange[0])}
								max={Math.ceil(priceRange[1])}
								value={localPriceRange[1]}
								onChange={(e) =>
									setLocalPriceRange([
										localPriceRange[0],
										parseInt(e.target.value),
									])
								}
								onMouseUp={handlePriceChange}
								onTouchEnd={handlePriceChange}
								className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-red-700"
							/>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
								Sort by
							</label>
							<div className="relative">
								<select
									value={filters.sortBy}
									onChange={(e) => updateFilter("sortBy", e.target.value)}
									className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700 appearance-none bg-white cursor-pointer"
								>
									<option value="default">Relevance</option>
									<option value="price-asc">Price: low to high</option>
									<option value="price-desc">Price: high to low</option>
									<option value="name">Name A-Z</option>
									<option value="stock">Stock</option>
								</select>
								<ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
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
	const {
		filters,
		updateFilter,
		resetFilters,
		filteredProducts,
		categories,
		typeBooks,
		priceRange,
	} = useProductFilters(products);
	const { addToCart } = useCart();
	const [searchParams] = useSearchParams();
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [viewMode, setViewMode] = useState("grid");

	useEffect(() => {
		const category = searchParams.get("category");
		const sort = searchParams.get("sort");

		resetFilters();

		if (category && category !== "all") {
			updateFilter("category", category);
		}

		if (sort) {
			const sortMap = {
				stock: "stock",
				"price-asc": "price-asc",
				"price-desc": "price-desc",
				name: "name",
			};
			if (sortMap[sort]) {
				updateFilter("sortBy", sortMap[sort]);
			}
		}
	}, [searchParams, resetFilters, updateFilter]);

	if (loading) {
		return (
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse">
						<div className="h-6 bg-gray-100 w-32 mb-8" />
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100">
							{[...Array(8)].map((_, i) => (
								<div key={i} className="bg-white">
									<div className="aspect-[3/4] bg-gray-100" />
									<div className="p-3 space-y-2">
										<div className="h-4 bg-gray-100 w-3/4" />
										<div className="h-3 bg-gray-100 w-1/2" />
										<div className="h-5 bg-gray-100 w-1/4" />
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
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center p-8 bg-gray-50 border border-gray-100 max-w-md">
					<div className="w-12 h-12 bg-red-50 flex items-center justify-center mx-auto mb-4">
						<X className="w-6 h-6 text-red-700" />
					</div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Error loading
					</h2>
					<p className="text-gray-500 text-sm mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-white border-b border-gray-100 py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-semibold text-gray-900 mb-2">Catalog</h1>
					<p className="text-gray-500 text-sm font-light max-w-xl">
						Browse our collection. Find your next favorite book.
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex flex-col lg:flex-row gap-6">
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
						<div className="flex items-center justify-between mb-5">
							<div className="flex items-center gap-3">
								<button
									onClick={() => setIsFilterOpen(true)}
									className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
								>
									<Filter className="w-3.5 h-3.5" />
									Filters
								</button>
								<p className="text-sm text-gray-500">
									<span className="font-medium text-gray-900">
										{filteredProducts.length}
									</span>{" "}
									products
								</p>
							</div>
							<div className="flex items-center gap-1 border border-gray-200 p-0.5">
								<button
									onClick={() => setViewMode("grid")}
									className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600"}`}
								>
									<Grid3X3 className="w-3.5 h-3.5" />
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600"}`}
								>
									<LayoutList className="w-3.5 h-3.5" />
								</button>
							</div>
						</div>

						{filters.search ||
						filters.category !== "all" ||
						filters.typeBook !== "all" ||
						filters.sortBy !== "default" ? (
							<div className="flex flex-wrap gap-2 mb-5">
								{filters.search && (
									<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
										"{filters.search}"
										<button
											onClick={() => updateFilter("search", "")}
											className="ml-0.5 hover:text-gray-900"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}
								{filters.category !== "all" && (
									<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
										{filters.category}
										<button
											onClick={() => updateFilter("category", "all")}
											className="ml-0.5 hover:text-gray-900"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}
								{filters.typeBook !== "all" && (
									<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
										{filters.typeBook}
										<button
											onClick={() => updateFilter("typeBook", "all")}
											className="ml-0.5 hover:text-gray-900"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}
							</div>
						) : null}

						{filteredProducts.length === 0 ? (
							<div className="text-center py-16 bg-gray-50 border border-gray-100">
								<div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
									<Search className="w-8 h-8 text-gray-300" />
								</div>
								<h3 className="text-base font-medium text-gray-900 mb-2">
									No products found
								</h3>
								<p className="text-gray-500 text-sm mb-4">
									Try adjusting your filters
								</p>
								<button
									onClick={resetFilters}
									className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
								>
									Clear filters
								</button>
							</div>
						) : (
							<div
								className={`grid gap-px bg-gray-100 border border-gray-100 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
							>
								{filteredProducts.map((product, index) => (
									<div
										key={product.isbn}
										className="animate-fade-in-up opacity-0"
										style={{ animationDelay: `${index * 0.03}s` }}
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
