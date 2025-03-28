import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { ExtendedProduct } from "../types/product";
import Skeleton from "./Skeleton";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await getProductById(parseInt(id));
        setProduct(productData);
        setSelectedImage(productData.thumbnail);
        setError(null);
      } catch (err) {
        setError("Failed to load product details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    return price * (1 - discountPercentage / 100);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-40 bg-gray-200 mb-4"></div>
        <div className="h-60 w-full bg-gray-200 mb-4 rounded-lg"></div>
        <div className="h-10 w-3/4 bg-gray-200 mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-200 mb-2"></div>
        <div className="h-6 w-1/3 bg-gray-200 mb-4"></div>
        <div className="h-24 w-full bg-gray-200 mb-4"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Error Loading Product</h2>
        <p className="mb-4">{error || "Product not found"}</p>
        <button
          onClick={goBack}
          className="px-4 py-2 bg-white border border-red-300 rounded hover:bg-red-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );

  return (
    <div>
      <button
        onClick={goBack}
        className="mb-6 px-4 py-2 flex items-center text-blue-600 hover:bg-blue-50 rounded"
      >
        ← Back
      </button>

      <div>
        <div className="mb-6">
          <div className="bg-white rounded-lg overflow-hidden border mb-4 h-64">
            {!imageLoaded && <Skeleton />}
            <img
              onLoad={() => setImageLoaded(true)}
              src={selectedImage}
              alt={product.title}
              className={`w-full h-64 object-contain ${
                !imageLoaded ? "invisible" : "visible"
              }`}
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer border rounded overflow-hidden h-16 
                  ${
                    selectedImage === image
                      ? "border-blue-500 border-2"
                      : "hover:opacity-80"
                  }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`text-lg ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-600">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <span className="text-sm text-gray-500">
              Brand: <span className="font-medium">{product.brand}</span>
            </span>
          </div>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {product.availabilityStatus}
            </span>
            <span className="text-sm text-gray-600 ml-3">
              {product.stock} in stock • Minimum Order:{" "}
              {product.minimumOrderQuantity}
            </span>
          </div>

          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold text-gray-900 mr-3">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through mr-2">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <button className="w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>

          <div className="text-sm text-gray-500 mb-6">
            Category: <span className="font-medium">{product.category}</span>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.username}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`text-sm ${
                              index < review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No reviews yet for this product.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
