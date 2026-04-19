import { Truck } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 25;

const ShippingProgress = ({ cartTotal = 18.5 }) => {
	const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
	const percentage = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

	if (cartTotal >= FREE_SHIPPING_THRESHOLD) {
		return (
			<div className="bg-green-50 border-b border-green-100 py-3">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-center text-sm text-green-700 font-medium flex items-center justify-center gap-2">
						<Truck className="w-4 h-4" />
						You qualify for FREE shipping!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 border-b border-gray-200 py-3">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between max-w-xl mx-auto">
					<p className="text-sm text-gray-600 flex items-center gap-2">
						<Truck className="w-4 h-4 text-gray-400" />
						<span>
							Add <span className="font-semibold text-gray-900">€{remaining.toFixed(2)}</span> more for{" "}
							<span className="font-semibold text-green-600">FREE shipping</span>
						</span>
					</p>
				</div>
				<div className="max-w-xl mx-auto mt-2">
					<div className="w-full bg-gray-200 rounded-full h-1.5">
						<div
							className="bg-red-700 h-1.5 rounded-full transition-all duration-300"
							style={{ width: `${percentage}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippingProgress;
