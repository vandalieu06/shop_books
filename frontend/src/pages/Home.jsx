import { useState } from "react";
import Categories from "../components/Home/Categories";
import FeaturedBooks from "../components/Home/FeaturedBooks";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Newsletter from "../components/Home/Newsletter";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
			<Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<Features />
			<Categories />
			<FeaturedBooks />
			<Newsletter />
		</div>
	);
};

export default App;
