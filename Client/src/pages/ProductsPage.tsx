import React, { useState, useEffect } from 'react';
import { useProductData } from '../contexts/ProductDataContext';
import { useCart, Product } from '../contexts/CartContext';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify'; // Import the toast library

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const productData = useProductData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cookies] = useCookies(['token']);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (productData) {
      const initialQuantities: { [key: number]: number } = {};
      productData.forEach(product => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [productData]);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  let filteredProducts: Product[] = [];

  if (productData) {
    if (selectedCategory) {
      filteredProducts = productData.filter(product => product.category === selectedCategory);
    } else {
      filteredProducts = productData;
    }
  }

  const allCategories = productData ? [...new Set(productData.map(product => product.category))] : [];

  const handleAddToCart = (product: Product) => {
    const { token } = cookies;
    if (token) {
      addToCart(product, quantities[product.id], token)
        .then(() => {
          toast.success(`Added ${product.title} to cart!`); // Success toast when added to cart
        })
        .catch(error => {
          toast.error('Error adding to cart'); // Error toast if there is a problem
          console.error(error);
        });
    } else {
      toast.error('You need to be logged in to add items to the cart'); // Error toast if no token found
    }
  };

  const incrementQuantity = (productId: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
    toast.info(`Increased quantity`); 
  };

  const decrementQuantity = (productId: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }));
    toast.info(`Decreased quantity`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <ul className="flex mb-4 flex-wrap">
        <li className={`mr-4 cursor-pointer ${selectedCategory === null ? 'font-bold' : ''}`} onClick={() => handleCategoryClick(null)}>All Products</li>
        {allCategories.map(category => (
          <li key={category} className={`mr-4 cursor-pointer ${selectedCategory === category ? 'font-bold text-blue-500' : ''}`} onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white shadow-md border-2 flex justify-between flex-col rounded-md overflow-hidden">
            <div className="lg:w-[400px] h-[400px]">
              <img src={product.image} alt={product.title} className="w-full h-full" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-800 font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <div className="flex items-center">
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md text-lg" onClick={() => decrementQuantity(product.id)}>-</button>
                  <span className="bg-gray-100 text-lg px-4 py-2">{quantities[product.id]}</span>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md text-lg" onClick={() => incrementQuantity(product.id)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
