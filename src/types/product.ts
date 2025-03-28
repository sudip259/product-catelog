
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Extended interface for display purposes
export interface ExtendedProduct extends Product {
  availabilityStatus: string;
  minimumOrderQuantity: number;
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}
