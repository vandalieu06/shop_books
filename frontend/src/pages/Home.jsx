import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import Hero from "../components/Home/Hero";
import TrustBar from "../components/Home/TrustBar";
import ShippingProgress from "../components/Home/ShippingProgress";
import DealsSection from "../components/Home/DealsSection";
import TrendingNow from "../components/Home/TrendingNow";
import FeaturedBooks from "../components/Home/FeaturedBooks";
import WhyUs from "../components/Home/WhyUs";
import CustomerReviews from "../components/Home/CustomerReviews";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useOutletContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <TrustBar />
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <ShippingProgress />
      <TrendingNow />
      <FeaturedBooks onAddToCart={addToCart} />
      <WhyUs />
      <CustomerReviews />
      <Newsletter />
    </>
  );
};

export default Home;
