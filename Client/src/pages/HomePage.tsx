import React, { useEffect, useState } from 'react';
import { Product, useCart } from '../contexts/CartContext';
import { useProductData } from '../contexts/ProductDataContext';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DisplayedProduct extends Product {
  quantity: number;
}

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const productData = useProductData();
  const [loading, setLoading] = useState<boolean>(true);
  const [displayedProducts, setDisplayedProducts] = useState<DisplayedProduct[]>([]);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (productData) {
      const shuffledProducts = shuffleArray(productData);
      const initialDisplayedProducts: DisplayedProduct[] = shuffledProducts.slice(0, 12).map((product) => ({
        ...product,
        quantity: 1,
      }));
      setDisplayedProducts(initialDisplayedProducts);
      setLoading(false);
    }
  }, [productData]);

  const shuffleArray = (array: Product[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAddToCart = async (product: DisplayedProduct) => {
    const { token } = cookies;
    if (token) {
      try {
        await addToCart(product, product.quantity, token);
        toast.success(`${product.title} added to cart!`);
      } catch (error) {
        toast.error(`Failed to add ${product.title} to cart.`);
      }
    } else {
      console.error('Token not found');
      toast.error('Please log in to add to cart.');
    }
  };

  const handleIncrement = (index: number) => {
    const updatedProducts = [...displayedProducts];
    updatedProducts[index].quantity++;
    setDisplayedProducts(updatedProducts);
  };

  const handleDecrement = (index: number) => {
    const updatedProducts = [...displayedProducts];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity--;
      setDisplayedProducts(updatedProducts);
    }
  };

  return (
    <main>
      <section className="relative">
        <div>
          <div className="relative h-[40rem]">
            <img
              src="https://media.istockphoto.com/id/1347626309/photo/latina-female-using-desktop-computer-with-clothing-online-web-store-to-choose-and-buy-clothes.jpg?s=612x612&w=0&k=20&c=SGKPpmCvxMFYld_4MXuSUBFmAcHylKNp2kJgWuszmgw="
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-75">
              <div className="text-white max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our Online Store</h1>
                <p className="text-lg text-gray-200 mb-8">Discover the latest trends in fashion, electronics, jewelry, and more.</p>
                <Link to="/products">
                  <button className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 px-3">
        <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-12">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            displayedProducts.map((product, index) => (
              <div key={product.id} className="bg-gray-100 border-2 flex flex-col justify-between rounded-lg overflow-hidden shadow-md">
                <div className="lg:w-[400px] h-[400px]">
                  <img src={product.image} alt={product.title} className="w-full h-full" />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-800 font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className={`bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 ${!cookies.token ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={!cookies.token}
                    >
                      {cookies.token ? 'Add to Cart' : 'Login to Add to Cart'}
                    </button>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md text-lg"
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                      <div className="bg-gray-100 text-lg px-4 py-2">{product.quantity}</div>
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md text-lg"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
