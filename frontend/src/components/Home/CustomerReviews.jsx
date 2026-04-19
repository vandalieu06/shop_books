import { Star, MessageCircle } from "lucide-react";

const reviews = [
	{
		id: 1,
		name: "María García",
		location: "Madrid, Spain",
		rating: 5,
		text: "Found rare Murakami editions I couldn't get anywhere else. The packaging was beautiful and delivery was super fast. Already planning my next order!",
		date: "2 weeks ago",
	},
	{
		id: 2,
		name: "Carlos Rodríguez",
		location: "Barcelona, Spain",
		rating: 5,
		text: "Best online bookstore for Japanese literature. The curated collection is impressive and the customer service is exceptional. Highly recommended!",
		date: "1 month ago",
	},
	{
		id: 3,
		name: "Laura Martín",
		location: "Valencia, Spain",
		rating: 4,
		text: "Love the variety and the quality of the books. Prices are competitive and the free shipping threshold is very achievable. Will definitely buy again.",
		date: "3 weeks ago",
	},
];

const StarRating = ({ rating }) => (
	<div className="flex gap-0.5">
		{[...Array(5)].map((_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
			/>
		))}
	</div>
);

const ReviewCard = ({ review }) => (
	<div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow">
		<div className="flex items-center gap-4 mb-4">
			<div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium">
				{review.name.charAt(0)}
			</div>
			<div>
				<p className="font-medium text-gray-900 text-sm">{review.name}</p>
				<p className="text-xs text-gray-500">{review.location}</p>
			</div>
		</div>
		<div className="flex items-center gap-2 mb-3">
			<StarRating rating={review.rating} />
			<span className="text-xs text-gray-400">{review.date}</span>
		</div>
		<p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
			"{review.text}"
		</p>
	</div>
);

const CustomerReviews = () => {
	return (
		<section className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-3">
						<MessageCircle className="w-6 h-6 text-red-700" />
						<h2 className="text-2xl font-semibold text-gray-900">
							What Readers Say
						</h2>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
						<span className="font-semibold text-gray-900">4.8/5</span>
						<span>from 12,500+ reviews</span>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{reviews.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
				</div>
			</div>
		</section>
	);
};

export default CustomerReviews;
