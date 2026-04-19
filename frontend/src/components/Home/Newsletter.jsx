import { useState } from "react";
import { Send, Check, Gift } from "lucide-react";

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Please enter a valid email address");
			return;
		}

		setStatus("loading");
		setTimeout(() => {
			setStatus("success");
			setEmail("");
		}, 1500);
	};

	return (
		<section className="py-20 bg-red-700 text-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<div className="flex items-center justify-center gap-2 mb-3">
					<Gift className="w-6 h-6" />
					<span className="text-red-100 text-sm font-medium tracking-wider uppercase">
						Welcome Offer
					</span>
				</div>
				<h2 className="text-2xl sm:text-3xl font-semibold mb-3">
					Get 10% Off Your First Order
				</h2>
				<p className="text-red-100 text-sm mb-8 max-w-md mx-auto">
					Subscribe to our newsletter for exclusive deals, new arrivals, and reading
					recommendations.
				</p>

				{status === "success" ? (
					<div className="flex flex-col items-center gap-3">
						<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
							<Check className="w-8 h-8" />
						</div>
						<span className="text-lg font-medium">Welcome aboard!</span>
						<span className="text-red-100 text-sm">
							Check your inbox for your 10% discount code.
						</span>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
					>
						<input
							type="email"
							placeholder="your@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-1 px-4 py-3.5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-sm"
						/>
						<button
							type="submit"
							disabled={status === "loading"}
							className="bg-gray-900 text-white px-6 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
						>
							{status === "loading" ? (
								<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							) : (
								<>
									<Send className="w-4 h-4" />
									Get 10% Off
								</>
							)}
						</button>
					</form>
				)}

				{error && <p className="text-red-200 text-xs mt-3">{error}</p>}

				<p className="text-red-200/60 text-xs mt-6">
					No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
				</p>
			</div>
		</section>
	);
};

export default Newsletter;
