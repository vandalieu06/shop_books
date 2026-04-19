import { BookHeart, Sparkles, Truck, Search, Star, Globe } from "lucide-react";

const reasons = [
	{
		icon: BookHeart,
		title: "Curated Selection",
		description: "Hand-picked titles by literature experts",
	},
	{
		icon: Search,
		title: "Rare Finds",
		description: "Hard-to-find Japanese editions & classics",
	},
	{
		icon: Star,
		title: "Quality Guaranteed",
		description: "Every book inspected before shipping",
	},
	{
		icon: Globe,
		title: "Worldwide Shipping",
		description: "Delivering to 50+ countries",
	},
	{
		icon: Truck,
		title: "Fast Delivery",
		description: "24-48h express shipping available",
	},
	{
		icon: Sparkles,
		title: "Exclusive Collections",
		description: "Limited editions you won't find elsewhere",
	},
];

const WhyUs = () => {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						Why AkiraBooks?
					</h2>
					<p className="text-gray-500 text-sm max-w-xl mx-auto">
						More than a bookstore. A gateway to extraordinary stories.
					</p>
					<div className="h-px bg-red-700 w-12 mx-auto mt-4" />
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{reasons.map((reason, i) => (
						<div
							key={i}
							className="bg-white p-6 border border-gray-200 hover:border-red-200 hover:shadow-md transition-all text-center group"
						>
							<div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
								<reason.icon className="w-6 h-6 text-red-700 group-hover:text-white transition-colors" />
							</div>
							<h3 className="font-medium text-gray-900 text-sm mb-1">
								{reason.title}
							</h3>
							<p className="text-gray-500 text-xs">
								{reason.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyUs;
