import { Heart, Star } from "lucide-react";
import { featuredBooks } from "../../data/books";

const FeaturedBooks = () => {
	return (
		<section className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900">
						Libros Destacados
					</h2>
					<button
						type="button"
						className="text-amber-600 font-semibold hover:text-amber-700 transition"
					>
						Ver todos →
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{featuredBooks.map((book) => (
						<div
							key={book.id}
							className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
						>
							<div className="relative overflow-hidden">
								<img
									src={book.image}
									alt={book.title}
									className="w-full h-72 object-cover group-hover:scale-110 transition duration-300"
								/>
								<span className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
									{book.badge}
								</span>
								<button
									type="button"
									className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-600 hover:text-white transition"
								>
									<Heart className="w-5 h-5" />
								</button>
							</div>
							<div className="p-6">
								<h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
									{book.title}
								</h3>
								<p className="text-gray-600 text-sm mb-3">{book.author}</p>
								<div className="flex items-center gap-1 mb-3">
									<Star className="w-4 h-4 fill-amber-400 text-amber-400" />
									<span className="text-sm font-semibold">{book.rating}</span>
									<span className="text-gray-500 text-sm">(245)</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-2xl font-bold text-amber-600">
										€{book.price}
									</span>
									<button
										type="button"
										className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition font-semibold"
									>
										Añadir
									</button>
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
