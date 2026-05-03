import {
  BookOpen,
  Heart,
  LogOut,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts";
import { useAuth } from "../../contexts/authHooks";

const NAV_PAGES = [
  { name: "home", path: "/" },
  { name: "catalog", path: "/products" },
  { name: "bestsellers", path: "/products?sort=stock" },
  { name: "offers", path: "/products?category=ofertas" },
];

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex gap-3 p-3 bg-white border border-gray-100 hover:border-gray-200 transition-colors">
    <img
      src={item.image}
      alt={item.title}
      className="w-14 h-18 object-cover shrink-0"
    />
    <div className="flex-1 flex flex-col justify-between py-0.5">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {item.title}
        </h3>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-0.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center border border-gray-200">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="p-1 hover:bg-gray-50 text-gray-500"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="px-2 text-xs font-medium text-gray-700 min-w-5 text-center">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="p-1 hover:bg-gray-50 text-gray-500"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {(item.price * item.quantity).toFixed(2)}€
        </span>
      </div>
    </div>
  </div>
);

const UserMenu = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-700 transition-colors text-sm font-medium"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">login</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 text-gray-600 hover:text-red-700 transition-colors"
      >
        <div className="w-7 h-7 bg-gray-100 flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-7 h-7 object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-gray-500" />
          )}
        </div>
        <span className="hidden md:inline text-sm font-medium">
          {user?.first_name || "user"}
        </span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-48 bg-white py-1 z-20">
            <div className="px-3 py-2 border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <hr className="my-1 border-gray-100" />
            <nav>
              <Link
                to="/account"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-3.5 h-3.5" />
                <span>Mi Cuenta</span>
              </Link>
              <Link
                to="/wishlist"
                 className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-700 transition-colors"
                 onClick={() => setIsOpen(false)}
               >
                 <Heart className="w-3.5 h-3.5" />
                 <span>Wishlist</span>
               </Link>
               {user?.role === "admin" && (
                 <Link
                   to="/admin"
                   className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-700 transition-colors"
                   onClick={() => setIsOpen(false)}
                 >
                   <Settings className="w-3.5 h-3.5" />
                   <span>Admin</span>
                 </Link>
               )}
              <Link
                to="/orders"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Orders</span>
              </Link>
            </nav>
            <hr className="my-1 border-gray-100" />
            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default function Header() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem } =
    useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="md:hidden p-2 text-gray-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-red-700 p-1">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-gray-900">
                  Akira<span className="text-red-700">Books</span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_PAGES.map((p) => (
                <Link
                  key={p.name}
                  to={p.path}
                  className="text-sm font-medium text-gray-500 hover:text-red-700 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-red-700 transition"
              >
                <Search className="w-4 h-4" />
              </button>
              <UserMenu />
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="flex items-center bg-red-700 hover:bg-red-800 text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                <span>{cartCount}</span>
                {cartCount > 0 && (
                  <span className="ml-1.5 pl-1.5 border-l border-white/30 text-xs">
                    {totalPrice.toFixed(2)}€
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
            {NAV_PAGES.map((p) => (
              <Link
                key={p.name}
                to={p.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-600 font-medium px-2 py-1 hover:text-red-700"
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-200 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setIsCartOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col transform transition-transform duration-200 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> cart
            </h2>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <ShoppingCart className="w-10 h-10 mb-2 opacity-20" />
                <p className="text-sm">cart is empty</p>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex justify-between text-base font-semibold text-gray-900 mb-4">
                <span>total</span>
                <span>{totalPrice.toFixed(2)}€</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
                className="w-full bg-red-700 hover:bg-red-800 text-white py-3 font-medium transition-colors text-sm"
              >
                checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
