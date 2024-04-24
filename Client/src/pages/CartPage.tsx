import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FaTrash, FaSpinner } from 'react-icons/fa';

const CartPage: React.FC = () => {
    const [cartProducts, setCartProducts] = useState<any[] | null>(null);
    const [cookies] = useCookies(['token']);
    const [usermail, setUsermail] = useState("");
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const token = cookies.token;
                if (!token) {
                    console.error('Token not found');
                    return;
                }
                const response = await axios.get('https://codsoft-e-commerce-website-server.onrender.com/auth/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsermail(response.data.userEmail);
                setCartProducts(response.data.cartItems);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, [cookies.token]);

    useEffect(() => {
        if (cartProducts !== null) {
            const totalPriceSum = cartProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            setTotalPrice(totalPriceSum);
        }
    }, [cartProducts]);

    const handleDeleteProduct = async (productId: number) => {
        try {
            const token = cookies.token;
            if (!token) {
                console.error('Token not found');
                return;
            }
            await axios.delete(`https://codsoft-e-commerce-website-server.onrender.com/auth/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (cartProducts !== null) {
                setCartProducts(cartProducts.filter(item => item.product.id !== productId));
            }
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    };

    const handleProceedToPayment = async () => {
        try {
            const token = cookies.token;
            if (!token) {
                console.error('Token not found');
                return;
            }

            if (usermail === "" || totalPrice === null) {
                console.error('User email or total price not found');
                return;
            }

            setPaymentLoading(true);

            const amountInKobo = totalPrice * 1000;

            const response = await axios.post(
                'https://codsoft-e-commerce-website-server.onrender.com/auth/acceptpayment',
                { email: usermail, amount: amountInKobo },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            //console.log('Response Data:', response.data);
            setPaymentLoading(false);

            const authorizationUrl = response.data?.data?.authorization_url;
            if (authorizationUrl) {
                window.open(authorizationUrl, '_blank');
            } else {
                console.error('Authorization URL not found in response data');
            }
        } catch (error) {
            console.error('Error proceeding to payment:', error);
            setPaymentLoading(false);
        }
    };

    const handleDeleteAll = async () => {
        try {
            const token = cookies.token;
            if (!token) {
                console.error('Token not found');
                return;
            }

            setLoadingDelete(true);

            await axios.delete('https://codsoft-e-commerce-website-server.onrender.com/auth/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartProducts([]);
            setTotalPrice(0);
            setLoadingDelete(false);
        } catch (error) {
            console.error('Error deleting all items from cart:', error);
            setLoadingDelete(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
            {cartProducts === null ? (
                <div className="flex justify-center items-center h-[300px]">
                    <FaSpinner className="animate-spin text-3xl mr-2 text-black" />
                    <h3>Loading your cart...</h3>
                </div>
            ) : cartProducts.length === 0 ? (
                <div className="flex items-center justify-center h-[500px]">
                    <h1 className="text-xl">Your cart is empty</h1>
                    <FaTrash className="w-8 h-8 ml-2" />
                </div>
            ) : (

                <div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mapping-userscart">
                        {cartProducts.map((item, index) => (
                            <li key={index} className="bg-white shadow-md p-4 rounded-md">
                                <div className="mb-4 flex justify-between items-start">
                                    <div className='w-[10rem]'>
                                        <img src={item.product.image} alt={item.product.name} className="w-full" />
                                    </div>
                                    <button onClick={() => handleDeleteProduct(item.product.id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-gray-600 text-lg text-end">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600 text-lg mt-6">Price: ${item.product.price.toFixed(2)}</p>
                                    <p className="text-gray-600 text-lg mt-6 text-end">Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='mt-6 deleteall-logic'>
                        <button
                            onClick={handleDeleteAll}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            disabled={loadingDelete}
                        >
                            {loadingDelete ? (
                                <FaSpinner className="animate-spin w-5 h-5 inline-block mr-2" />
                            ) : (
                                <FaTrash className="inline-block mr-2" />
                            )}
                            {loadingDelete ? 'Deleting All...' : 'Delete All'}
                        </button>
                    </div>

                    <div className="mt-8 proceedtopayment-logic">
                        {totalPrice !== null && (
                            <p className="text-xl mb-5 font-semibold">Total Cost: ${totalPrice.toFixed(2)}</p>
                        )}
                        <button onClick={handleProceedToPayment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
                            {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
