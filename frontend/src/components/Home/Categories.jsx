import { categories } from "../../data/categories";

const Categories = () => {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
					Explora por Categorías
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{categories.map((category, i) => (
						<button
							type="button"
							key={`btn-cat-${i++}`}
							className={`${category.color} p-6 rounded-xl hover:shadow-lg transition duration-300 transform hover:-translate-y-1`}
						>
							<div className="text-4xl mb-2">{category.icon}</div>
							<div className="font-semibold">{category.name}</div>
						</button>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
