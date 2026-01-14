import { BookOpen, Heart, ShoppingCart, User } from "lucide-react";

const pages = ["inicio", "categorias", "bestsellers", "ofertas"];
const NavLink = (text) => {
	return (
		<a
			href="/"
			className="text-gray-700 hover:text-amber-600 font-medium transition capitalize"
		>
			{text}
		</a>
	);
};

const Header = () => {
	return (
		<header className="bg-white shforEachadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-2">
						<BookOpen className="w-8 h-8 text-amber-600" />
						<span className="text-2xl font-bold text-gray-900">Akira Shop</span>
					</div>

					<nav className="hidden md:flex space-x-8">
						{pages.map((p) => NavLink(p))}
					</nav>

					<div className="flex items-center space-x-4">
						<a
							href="/login"
							className="text-gray-700 hover:text-amber-600 transition"
						>
							<User className="w-6 h-6" />
						</a>
						<button
							type="button"
							className="text-gray-700 hover:text-amber-600 transition"
						>
							<Heart className="w-6 h-6" />
						</button>
						<button
							type="button"
							className="relative text-gray-700 hover:text-amber-600 transition"
						>
							<ShoppingCart className="w-6 h-6" />
							<span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								3
							</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
