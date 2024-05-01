import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Product {
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

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    username: string;
    cartCount: number;
    addToCart: (product: Product, quantity: number, token: string) => Promise<void>;
    updateCartItem: (productId: number, quantity: number, token: string) => Promise<void>;
    fetchUserDetails: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [username, setUsername] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [cookies] = useCookies(['token']);

    // Fetch user details, including cart count and username
    const fetchUserDetails = async () => {
        try {
            const token = cookies.token;
            if (!token) {
                console.error("Token not found: PLEASE LOGIN FIRST!");
                return;
            }
            const response = await axios.get(
                'https://codsoft-e-commerce-website-server.onrender.com/auth/user-details',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsername(response.data.username);
            setCartCount(response.data.totalItemsInCart);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [cookies.token]);

    //logic t0 add to cart
    const addToCart = async (product: Product, quantity: number, token: string) => {
        try {
            const { id, title, image, price } = product;
            await axios.post(
                'https://codsoft-e-commerce-website-server.onrender.com/auth/cart/add',
                {
                    productId: id,
                    quantity,
                    productName: title,
                    productImage: image,
                    productPrice: price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCart((prevCart) => [...prevCart, { product, quantity }]); // Adding to cart
            setCartCount(cartCount + 1); // Increment the cart count
            toast.success(`Added ${title} to cart`);
            fetchUserDetails();
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    };

    const updateCartItem = async (productId: number, quantity: number, token: string) => {
        try {
            await axios.patch(
                `https://codsoft-e-commerce-website-server.onrender.com/auth/cart/update/${productId}`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCart((prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                );
                return updatedCart;
            });
            // Re-fetch user details to update cart count
        } catch (error) {
            console.error('Error updating cart item:', error);
            toast.error('Failed to update cart item');
        }
    };

    const contextValue: CartContextType = {
        cart,
        username,
        cartCount,
        addToCart,
        updateCartItem,
        fetchUserDetails,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
