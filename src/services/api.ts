
import { ExtendedProduct, Product, ProductReview, ProductsResponse } from "../types/product";

const API_URL = "https://dummyjson.com";


const getRandomMinimumOrderQuantity = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

const getAvailabilityStatus = (stock: number): string => {
  if (stock <= 0) return "Out of Stock";
  if (stock < 10) return "Low Stock";
  if (stock < 50) return "In Stock";
  return "High Availability";
};


const generateMockReviews = (productId: number): ProductReview[] => {
  const numberOfReviews = Math.floor(Math.random() * 5) + 1;
  const reviews: ProductReview[] = [];

  const comments = [
    "Great product, highly recommend!",
    "Not bad, but could be better.",
    "Exactly what I was looking for!",
    "Disappointed with the quality.",
    "Amazing value for the price!",
    "Shipping was fast, product works well.",
    "Would buy again!",
    "Perfect fit for my needs.",
    "The description was accurate.",
    "Better than expected!"
  ];

  const usernames = [
    "John D.",
    "Sarah M.",
    "Michael T.",
    "Jessica K.",
    "David R.",
    "Emily S.",
    "Robert J.",
    "Jennifer L.",
    "William P.",
    "Elizabeth B."
  ];

  // Generate random reviews
  for (let i = 0; i < numberOfReviews; i++) {
    const randomDate = new Date();
    // Random date in the last 90 days
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 90));
    
    reviews.push({
      id: i + 1,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: randomDate.toISOString().split('T')[0]
    });
  }

  return reviews;
};


const extendProduct = (product: Product): ExtendedProduct => {
  return {
    ...product,
    availabilityStatus: getAvailabilityStatus(product.stock),
    minimumOrderQuantity: getRandomMinimumOrderQuantity(),
  };
};


const extendProductWithReviews = (product: Product): ExtendedProduct => {
  return {
    ...product,
    availabilityStatus: getAvailabilityStatus(product.stock),
    minimumOrderQuantity: getRandomMinimumOrderQuantity(),
    reviews: generateMockReviews(product.id)
  };
};


export const getAllProducts = async (limit = 10, skip = 0): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data: ProductsResponse = await response.json();
    
    
    const extendedProducts = data.products.map(extendProduct);
    
    return {
      ...data,
      products: extendedProducts as Product[]
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProductById = async (id: number): Promise<ExtendedProduct> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const product: Product = await response.json();
    
    return extendProductWithReviews(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};


