import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

const Categories = () => {
	const { categories, loading, error } = useCategories();

	if (loading) {
		return (
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
						Explora por Categorías
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="h-24 bg-gray-200 rounded-xl animate-pulse"
							/>
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
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
					Explora por Categorías
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{categories.map((category, i) => (
						<Link
							key={category._id || category.slug || i}
							to={`/products?category=${category.slug}`}
							className={`${category.color} p-6 rounded-xl hover:shadow-lg transition duration-300 transform hover:-translate-y-1 text-center`}
						>
							<div className="text-4xl mb-2">{category.icon}</div>
							<div className="font-semibold capitalize">{category.name}</div>
							{category.description && (
								<p className="text-xs mt-1 opacity-75 line-clamp-2">
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
