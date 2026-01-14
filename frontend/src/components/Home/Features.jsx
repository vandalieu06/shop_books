import { Package, Shield, Truck } from "lucide-react";

const typeFeatures = [
	{
		id: 1,
		icon: <Truck className="w-8 h-8 text-amber-600" />,
		title: "Envío Gratis",
		description: "En pedidos superiores a €25",
	},
	{
		id: 2,
		icon: <Package className="w-8 h-8 text-blue-600" />,
		title: "Devoluciones Fáciles",
		description: "30 días para devoluciones",
	},
	{
		id: 3,
		icon: <Shield className="w-8 h-8 text-green-600" />,
		title: "Pago Seguro",
		description: "Pago seguro con tarjeta de crédito",
	},
];

const FeatureBoxElement = ({ id, icon, title, description }) => {
	const typeBg = {
		1: "bg-amber-100",
		2: "bg-blue-100",
		3: "bg-green-100",
	};
	return (
		<div
			id={`feature-${id}`}
			className="flex items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition"
		>
			<div className={`${typeBg[id]} bg-amber-100 p-3 rounded-full`}>
				{icon}
			</div>
			<div>
				<h3 className="font-semibold text-lg">{title}</h3>
				<p className="text-gray-600 text-sm">{description}</p>
			</div>
		</div>
	);
};

const Features = () => {
	return (
		<section className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{typeFeatures.map((item) => (
						<FeatureBoxElement
							key={item.id}
							id={item.id}
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
