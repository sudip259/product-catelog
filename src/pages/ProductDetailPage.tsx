import React from "react";
import ProductDetail from "../components/ProductDetail";
import ProductList from "../components/ProductList";

const ProductDetailPage: React.FC = () => {
  return (
    <>
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm mb-6 md:mb-0">
        <ProductDetail />
      </div>

      <div className="w-full md:w-1/2 md:pl-4">
        <ProductList />
      </div>
    </>
  );
};

export default ProductDetailPage;
