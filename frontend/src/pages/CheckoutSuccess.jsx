import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../contexts";

const CheckoutSuccess = () => {
	const navigate = useNavigate();
	const { clearCart } = useCart();
	const cleared = useRef(false);

	useEffect(() => {
		if (!cleared.current) {
			cleared.current = true;
			localStorage.removeItem("akira_cart");
		}
	}, []);

	return (
		<div className="min-h-screen bg-white flex items-center justify-center">
			<div className="text-center p-8 max-w-md">
				<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Order placed!
				</h2>
				<p className="text-gray-500 text-sm mb-6">
					Thank you for your purchase. You will receive a confirmation
					email shortly.
				</p>
				<div className="space-y-2">
					<button
						onClick={() => navigate("/orders")}
						className="w-full px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						View orders
					</button>
					<button
						onClick={() => navigate("/products")}
						className="w-full px-5 py-2 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
					>
						Continue shopping
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutSuccess;