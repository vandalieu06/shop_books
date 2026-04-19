import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const CheckoutCancel = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-white flex items-center justify-center">
			<div className="text-center p-8 max-w-md">
				<XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Payment cancelled
				</h2>
				<p className="text-gray-500 text-sm mb-6">
					Your payment was cancelled. Your cart items are still saved.
				</p>
				<div className="space-y-2">
					<button
						onClick={() => navigate("/checkout")}
						className="w-full px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						Try again
					</button>
					<button
						onClick={() => navigate("/cart")}
						className="w-full px-5 py-2 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
					>
						View cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutCancel;