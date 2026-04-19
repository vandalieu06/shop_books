import { Star, Shield, Package, Award } from "lucide-react";

const stats = [
	{ icon: Star, label: "4.8/5 Rating", sublabel: "12,500+ Reviews" },
	{ icon: Package, label: "50,000+", sublabel: "Orders Shipped" },
	{ icon: Shield, label: "Secure", sublabel: "Checkout" },
	{ icon: Award, label: "Award", sublabel: "Winning" },
];

const TrustBar = () => {
	return (
		<section className="bg-gray-50 border-b border-gray-200 py-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{stats.map((stat, i) => (
						<div
							key={i}
							className="flex items-center justify-center gap-3 py-2"
						>
							<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
								<stat.icon className="w-5 h-5 text-red-700" />
							</div>
							<div>
								<p className="text-sm font-semibold text-gray-900">
									{stat.label}
								</p>
								<p className="text-xs text-gray-500">{stat.sublabel}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TrustBar;
