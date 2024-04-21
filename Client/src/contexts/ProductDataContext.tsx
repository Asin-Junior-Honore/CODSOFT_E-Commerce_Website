import React, { createContext, useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCategories {
  [category: string]: Product[];
}

const ProductDataContext = createContext<Product[] | undefined>(undefined);

export const useProductData = () => {
  const context = React.useContext(ProductDataContext);
  if (!context) {
    throw new Error('useProductData must be used within a ProductDataProvider');
  }
  return context;
};

export const ProductDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [_, setIndividualProductCategories] = useState<ProductCategories>({});

  const fetchProductData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const products: Product[] = await response.json();
      setProductData(products);

      const groupedProducts: ProductCategories = {};
      products.forEach(product => {
        if (!groupedProducts[product.category]) {
          groupedProducts[product.category] = [];
        }
        groupedProducts[product.category].push(product);
      });
      setIndividualProductCategories(groupedProducts);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <ProductDataContext.Provider value={productData}>
      {children}
    </ProductDataContext.Provider>
  );
};
