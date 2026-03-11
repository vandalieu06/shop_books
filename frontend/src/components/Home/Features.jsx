import { Package, Shield, Truck } from "lucide-react";

const typeFeatures = [
	{
		id: 1,
		icon: <Truck className="w-5 h-5" />,
		title: "Free Shipping",
		description: "On orders over €25",
	},
	{
		id: 2,
		icon: <Package className="w-5 h-5" />,
		title: "Easy Returns",
		description: "30-day return policy",
	},
	{
		id: 3,
		icon: <Shield className="w-5 h-5" />,
		title: "Secure Payment",
		description: "SSL encrypted checkout",
	},
];

const FeatureBoxElement = ({ icon, title, description }) => {
	return (
		<div className="flex items-center gap-4 py-6 border-b border-gray-100 last:border-b-0">
			<div className="text-gray-400">{icon}</div>
			<div>
				<h3 className="font-medium text-gray-900 text-sm">{title}</h3>
				<p className="text-gray-500 text-xs">{description}</p>
			</div>
		</div>
	);
};

const Features = () => {
	return (
		<section className="py-8 bg-white border-y border-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
					{typeFeatures.map((item) => (
						<FeatureBoxElement
							key={item.id}
							icon={item.icon}
							title={item.title}
							description={item.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
