import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Categories from "../components/Home/Categories";
import FeaturedBooks from "../components/Home/FeaturedBooks";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { addToCart } = useOutletContext();

	return (
		<>
			<Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<Features />
			<Categories />
			<FeaturedBooks onAddToCart={addToCart} />
			<Newsletter />
		</>
	);
};

export default Home;
