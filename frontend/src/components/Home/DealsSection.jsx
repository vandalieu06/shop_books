import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ShoppingCart, Flame } from "lucide-react";
import { useCart } from "../../contexts";

const DealsSection = () => {
	const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 });
	const { addToCart } = useCart();

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				let { days, hours, minutes, seconds } = prev;
				seconds--;
				if (seconds < 0) {
					seconds = 59;
					minutes--;
				}
				if (minutes < 0) {
					minutes = 59;
					hours--;
				}
				if (hours < 0) {
					hours = 23;
					days--;
				}
				if (days < 0) {
					return { days: 0, hours: 0, minutes: 0, seconds: 0 };
				}
				return { days, hours, minutes, seconds };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const deals = [
		{
			isbn: "9780143127796",
			name: "The Wind-Up Bird Chronicle",
			author: "Haruki Murakami",
			price: 12.99,
			originalPrice: 21.99,
			discount: 40,
			image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
		},
		{
			isbn: "9780307387626",
			name: "1Q84",
			author: "Haruki Murakami",
			price: 14.99,
			originalPrice: 19.99,
			discount: 25,
			image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
		},
		{
			isbn: "9780679775439",
			name: "Norwegian Wood",
			author: "Haruki Murakami",
			price: 9.99,
			originalPrice: 16.99,
			discount: 41,
			image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
		},
		{
			isbn: "9780307277675",
			name: "Kafka on the Shore",
			author: "Haruki Murakami",
			price: 11.99,
			originalPrice: 17.99,
			discount: 33,
			image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
		},
	];

	const TimeUnit = ({ value, label }) => (
		<div className="text-center">
			<span className="block text-lg font-bold text-gray-900">
				{String(value).padStart(2, "0")}
			</span>
			<span className="text-xs text-gray-500 uppercase">{label}</span>
		</div>
	);

	return (
		<section className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
					<div className="flex items-center gap-3">
						<Flame className="w-6 h-6 text-orange-500" />
						<h2 className="text-2xl font-semibold text-gray-900">
							Deals of the Week
						</h2>
					</div>
					<div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
						<Clock className="w-4 h-4 text-gray-500" />
						<span className="text-sm text-gray-600">Ends in:</span>
						<div className="flex gap-3 ml-2">
							<TimeUnit value={timeLeft.days} label="days" />
							<span className="text-gray-400">:</span>
							<TimeUnit value={timeLeft.hours} label="hrs" />
							<span className="text-gray-400">:</span>
							<TimeUnit value={timeLeft.minutes} label="min" />
							<span className="text-gray-400">:</span>
							<TimeUnit value={timeLeft.seconds} label="sec" />
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{deals.map((deal) => (
						<div
							key={deal.isbn}
							className="border border-gray-200 hover:border-red-200 transition-colors group"
						>
							<Link to={`/products/${deal.isbn}`}>
								<div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
									<img
										src={deal.image}
										alt={deal.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-2 left-2 bg-red-700 text-white px-2 py-0.5 text-xs font-bold">
										-{deal.discount}%
									</div>
								</div>
							</Link>
							<div className="p-3">
								<Link to={`/products/${deal.isbn}`}>
									<h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
										{deal.name}
									</h3>
								</Link>
								<p className="text-gray-500 text-xs mb-2">{deal.author}</p>
								<div className="flex items-center justify-between">
									<div className="flex items-baseline gap-2">
										<span className="text-base font-bold text-gray-900">
											€{deal.price}
										</span>
										<span className="text-xs text-gray-400 line-through">
											€{deal.originalPrice}
										</span>
									</div>
									<button
										type="button"
										onClick={() => addToCart(deal)}
										className="p-1.5 bg-red-700 text-white hover:bg-red-800 transition-colors"
										title="Add to cart"
									>
										<ShoppingCart className="w-3.5 h-3.5" />
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

export default DealsSection;
