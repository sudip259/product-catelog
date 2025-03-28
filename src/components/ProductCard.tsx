import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExtendedProduct } from "../types/product";
import Skeleton from "./Skeleton";

interface ProductCardProps {
  product: ExtendedProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white"
    >
      <div className="w-full overflow-hidden bg-gray-100 h-48 relative">
        {!imageLoaded && <Skeleton />}

        <img
          src={product.thumbnail}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300 ${
            !imageLoaded ? "invisible" : "visible"
          }`}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {product.title}
        </h3>

        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-500 mr-2">
            {product.brand}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {product.category}
          </span>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.floor(product.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-baseline mb-2">
          <span className="text-lg font-bold text-gray-900 mr-2">
            {formatPrice(discountedPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs font-semibold text-green-600">
                {product.discountPercentage.toFixed(0)}% OFF
              </span>
            </>
          )}
        </div>

        <div className="flex justify-between items-center mt-3 text-xs">
          <span className="font-medium text-blue-600">
            {product.availabilityStatus}
          </span>
          <span className="text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
