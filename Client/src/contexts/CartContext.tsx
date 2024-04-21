import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
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
    addToCart: (product: Product, quantity: number, token: string) => Promise<void>;
    updateCartItem: (productId: number, quantity: number, token: string) => Promise<void>;
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

    const addToCart = async (product: Product, quantity: number, token: string) => {
        try {
            const { id, title, image, price } = product;
            await axios.post(
                'http://localhost:4000/auth/cart/add',
                { productId: id, quantity, productName: title, productImage: image, productPrice: price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCart(prevCart => [...prevCart, { product, quantity }]);
            toast.success(`Added ${title} to cart`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    };

    const updateCartItem = async (productId: number, quantity: number, token: string) => {
        try {
            await axios.patch(
                `http://localhost:4000/auth/cart/update/${productId}`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCart(prevCart => {
                const updatedCart = prevCart.map(item =>
                    item.product.id === productId ? { ...item, quantity } : item
                );
                return updatedCart;
            });
            toast.success('Updated cart item quantity');
        } catch (error) {
            console.error('Error updating cart item:', error);
            toast.error('Failed to update cart item');
        }
    };

    const contextValue: CartContextType = {
        cart,
        addToCart,
        updateCartItem,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick draggable pauseOnHover />
        </CartContext.Provider>
    );
};
