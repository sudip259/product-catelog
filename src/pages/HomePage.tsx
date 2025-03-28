
import React from 'react';
import ProductList from '../components/ProductList';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Left side - Product details placeholder */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm mb-6 md:mb-0">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Select a Product</h2>
          <p className="text-gray-500">
            Click on a product from the list to view its details.
          </p>
        </div>
      </div>
      
      {/* Right side - Product list */}
      <div className="w-full md:w-1/2 md:pl-4">
        <ProductList />
      </div>
    </>
  );
};

export default HomePage;
