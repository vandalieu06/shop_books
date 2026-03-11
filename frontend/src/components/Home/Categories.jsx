import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const Categories = () => {
	const { categories, loading, error } = useCategories();

	if (loading) {
		return (
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<div className="h-8 bg-gray-100 w-48 mx-auto mb-4" />
						<div className="h-px bg-gray-200 w-24 mx-auto" />
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[...Array(8)].map((_, i) => (
							<div key={i} className="h-20 bg-gray-50" />
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return null;
	}

	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-2xl font-semibold text-gray-900 mb-3">
						カテゴリー
					</h2>
					<p className="text-gray-500 text-sm font-light">Browse by category</p>
					<div className="h-px bg-gray-200 w-16 mx-auto mt-4" />
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
					{categories.map((category, i) => (
						<Link
							key={category._id || category.slug || i}
							to={`/products?category=${category.slug}`}
							className="bg-white p-6 hover:bg-gray-50 transition-colors text-center group"
						>
							<div className="text-2xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
								{category.icon}
							</div>
							<div className="text-sm font-medium text-gray-700 group-hover:text-red-700 transition-colors">
								{category.name}
							</div>
							{category.description && (
								<p className="text-xs text-gray-400 mt-1">
									{category.description}
								</p>
							)}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
