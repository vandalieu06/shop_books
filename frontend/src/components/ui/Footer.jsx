import { BookOpen } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-white border-t border-gray-100 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
					<div className="col-span-2">
						<div className="flex items-center gap-2 mb-4">
							<div className="bg-red-700 p-1">
								<BookOpen className="w-4 h-4 text-white" />
							</div>
							<span className="text-base font-semibold text-gray-900">
								AkiraBooks
							</span>
						</div>
						<p className="text-gray-500 text-sm font-light max-w-xs">
							Your trusted online bookstore since 2010
						</p>
					</div>
					<div>
						<h3 className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-4">
							Shop
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									New arrivals
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Bestsellers
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Offers
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Pre-orders
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-4">
							Help
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Shipping
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Returns
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									FAQ
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-4">
							Legal
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Privacy
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Terms
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-500 hover:text-red-700 transition-colors"
								>
									Cookies
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="pt-6 border-t border-gray-100 text-center">
					<p className="text-xs text-gray-400">
						© 2024 AkiraBooks. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
