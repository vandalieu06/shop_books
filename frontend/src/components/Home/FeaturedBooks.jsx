import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"; // Importamos el hook del contexto

// Eliminamos la prop onAddToCart, ya no es necesaria
const FeaturedBooks = () => {
	// Obtenemos la lógica directamente del contexto
	const { addToCart } = useCart();

	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/books");
				if (!response.ok) throw new Error("Error en la respuesta del servidor");

				const result = await response.json();
				if (result.status === "success") {
					setBooks(result.data);
				}
			} catch (error) {
				console.error("Error al traer los libros:", error);
				setError("No se pudo cargar el catálogo. Inténtalo más tarde.");
			} finally {
				setLoading(false);
			}
		};
		fetchBooks();
	}, []);

	if (loading)
		return (
			<div className="text-center py-16 animate-pulse text-gray-500 font-medium">
				Cargando catálogo de libros...
			</div>
		);

	if (error)
		return (
			<div className="text-center py-16 text-red-500 bg-red-50 rounded-xl mx-4 my-8">
				{error}
			</div>
		);

	return (
		<section className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-12">
					<h2 className="text-3xl font-black text-gray-900 tracking-tight">
						Libros Destacados
					</h2>
					<button
						type="button"
						className="text-amber-600 font-bold hover:text-amber-700 transition flex items-center gap-1"
					>
						Ver todos <span>→</span>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{books.map((book) => (
						<div
							key={book.isbn}
							className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
						>
							{/* Imagen y Badge */}
							<div className="relative overflow-hidden aspect-[3/4]">
								<img
									src={`https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name)}`}
									alt={book.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-amber-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
									{book.type_book}
								</span>
							</div>

							{/* Contenido */}
							<div className="p-5">
								<h3 className="font-bold text-gray-900 mb-1 line-clamp-2 h-12 leading-tight">
									{book.name}
								</h3>
								<p className="text-gray-500 text-sm mb-4 italic">
									{book.authors?.length > 0
										? book.authors.join(", ")
										: "Autor Anónimo"}
								</p>

								<div className="flex items-center justify-between mt-auto">
									<span className="text-2xl font-black text-gray-900">
										{book.price}
										<span className="text-sm ml-0.5">€</span>
									</span>
									<button
										type="button"
										onClick={() => addToCart(book)} // Usamos la función del contexto
										disabled={book.unit_stock === 0}
										className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
											book.unit_stock === 0
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-200"
										}`}
									>
										{book.unit_stock === 0 ? "Agotado" : "Añadir"}
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
