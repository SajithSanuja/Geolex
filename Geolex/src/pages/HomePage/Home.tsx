import React from "react";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { BannerImages, SampleProducts } from "../../assets/assets";

const Home: React.FC = () => {
  return (
    <>
      {/* Banner Section */}
      <div className="px-4 py-4 md:px-6 md:py-6 lg:px-0 lg:py-0">
        <Banner
          images={BannerImages}
          height="h-[80vh]"
          autoSlideInterval={3000}
        />
      </div>

      {/* Categories Section */}
      <Categories />

      {/* Featured Products Section */}
      <ProductGrid
        title="Featured Products"
        products={SampleProducts}
        columns={4}
        maxItems={8}
      />

      {/* Welcome Section */}
      <main className="w-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Geolex
          </h1>
          <p className="text-lg text-gray-600">
            Your premier destination for quality computer hardware and
            electronics
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
