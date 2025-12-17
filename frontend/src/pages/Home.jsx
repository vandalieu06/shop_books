import {
	BookOpen,
	Search,
	ShoppingCart,
	Star,
	TrendingUp,
	User,
	Heart,
	Package,
	Truck,
	Shield,
} from "lucide-react";
import { useState } from "react";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const featuredBooks = [
		{
			id: 1,
			title: "Cien Años de Soledad",
			author: "Gabriel García Márquez",
			price: 18.99,
			rating: 4.8,
			image:
				"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
			badge: "Bestseller",
		},
		{
			id: 2,
			title: "El Principito",
			author: "Antoine de Saint-Exupéry",
			price: 12.99,
			rating: 4.9,
			image:
				"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
			badge: "Clásico",
		},
		{
			id: 3,
			title: "1984",
			author: "George Orwell",
			price: 15.99,
			rating: 4.7,
			image:
				"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
			badge: "Popular",
		},
		{
			id: 4,
			title: "Don Quijote",
			author: "Miguel de Cervantes",
			price: 22.99,
			rating: 4.6,
			image:
				"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
			badge: "Clásico",
		},
	];

	const categories = [
		{ name: "Ficción", icon: "📚", color: "bg-purple-100 text-purple-700" },
		{ name: "No Ficción", icon: "📖", color: "bg-blue-100 text-blue-700" },
		{ name: "Ciencia", icon: "🔬", color: "bg-green-100 text-green-700" },
		{ name: "Historia", icon: "🏛️", color: "bg-amber-100 text-amber-700" },
		{ name: "Infantil", icon: "🎨", color: "bg-pink-100 text-pink-700" },
		{ name: "Romance", icon: "💝", color: "bg-rose-100 text-rose-700" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
			{/* Header */}
			<header className="bg-white shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-2">
							<BookOpen className="w-8 h-8 text-amber-600" />
							<span className="text-2xl font-bold text-gray-900">
								LibroMundo
							</span>
						</div>

						<nav className="hidden md:flex space-x-8">
							<a
								href="#"
								className="text-gray-700 hover:text-amber-600 font-medium transition"
							>
								Inicio
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-amber-600 font-medium transition"
							>
								Categorías
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-amber-600 font-medium transition"
							>
								Bestsellers
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-amber-600 font-medium transition"
							>
								Ofertas
							</a>
						</nav>

						<div className="flex items-center space-x-4">
							<a
								href="/login"
								className="text-gray-700 hover:text-amber-600 transition"
							>
								<User className="w-6 h-6" />
							</a>
							<button className="text-gray-700 hover:text-amber-600 transition">
								<Heart className="w-6 h-6" />
							</button>
							<button className="relative text-gray-700 hover:text-amber-600 transition">
								<ShoppingCart className="w-6 h-6" />
								<span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
									3
								</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative bg-gradient-to-r from-amber-600 to-orange-500 text-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h1 className="text-5xl font-bold mb-6 leading-tight">
								Descubre Tu Próxima Gran Lectura
							</h1>
							<p className="text-xl mb-8 text-amber-50">
								Miles de libros a tu alcance. Envíos gratis en compras
								superiores a €25
							</p>

							<div className="relative max-w-xl">
								<input
									type="text"
									placeholder="Buscar libros, autores, ISBN..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full px-6 py-4 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg"
								/>
								<button className="absolute right-2 top-2 bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition">
									<Search className="w-6 h-6" />
								</button>
							</div>

							<div className="flex gap-4 mt-8">
								<button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg">
									Ver Ofertas
								</button>
								<button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition">
									Explorar
								</button>
							</div>
						</div>

						<div className="hidden md:block">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=700&fit=crop"
									alt="Libros"
									className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="flex items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition">
							<div className="bg-amber-100 p-3 rounded-full">
								<Truck className="w-8 h-8 text-amber-600" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">Envío Gratis</h3>
								<p className="text-gray-600 text-sm">
									En pedidos superiores a €25
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition">
							<div className="bg-blue-100 p-3 rounded-full">
								<Package className="w-8 h-8 text-blue-600" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">Devoluciones Fáciles</h3>
								<p className="text-gray-600 text-sm">
									30 días para devoluciones
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition">
							<div className="bg-green-100 p-3 rounded-full">
								<Shield className="w-8 h-8 text-green-600" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">Pago Seguro</h3>
								<p className="text-gray-600 text-sm">Protección garantizada</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
						Explora por Categorías
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{categories.map((category, index) => (
							<button
								key={index}
								className={`${category.color} p-6 rounded-xl hover:shadow-lg transition duration-300 transform hover:-translate-y-1`}
							>
								<div className="text-4xl mb-2">{category.icon}</div>
								<div className="font-semibold">{category.name}</div>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Books */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">
							Libros Destacados
						</h2>
						<button className="text-amber-600 font-semibold hover:text-amber-700 transition">
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
									<button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-600 hover:text-white transition">
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
										<button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition font-semibold">
											Añadir
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="py-16 bg-gradient-to-r from-amber-600 to-orange-500 text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Suscríbete a Nuestro Newsletter
					</h2>
					<p className="text-xl mb-8 text-amber-50">
						Recibe las mejores ofertas y novedades directamente en tu correo
					</p>
					<div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
						<input
							type="email"
							placeholder="Tu correo electrónico"
							className="flex-1 px-6 py-4 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300"
						/>
						<button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg whitespace-nowrap">
							Suscribirse
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<BookOpen className="w-8 h-8 text-amber-500" />
								<span className="text-2xl font-bold">LibroMundo</span>
							</div>
							<p className="text-gray-400">
								Tu librería online de confianza desde 2010
							</p>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-4">Compra</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Novedades
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Bestsellers
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Ofertas
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Preventa
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-4">Ayuda</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Contacto
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Envíos
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Devoluciones
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-4">Legal</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Privacidad
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Términos
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500 transition">
										Cookies
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 text-center text-gray-400">
						<p>&copy; 2024 LibroMundo. Todos los derechos reservados.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default App;
