import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const CartIcon: React.FC<{ count: number }> = ({ count }) => (
    <Link to="/protected/cart" className="relative text-white hover:text-gray-300">
        <AiOutlineShoppingCart className="text-xl" />
        {count > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                {count}
            </span>
        )}
    </Link>
);

const UserIcon: React.FC<{ username: string; token: string; onLogout: () => void }> = ({ username, onLogout, token }) => (
    <>
        <div className="flex items-center space-x-2">
            <AiOutlineUser className="text-xl text-white" />
            <span className="text-white">{username}</span>
        </div>
        {
            token ? (
                <button
                    onClick={onLogout}
                    className="bg-transparent lg:block hidden hover:bg-gray-600 text-white font-semibold hover:text-white py-1 px-2 border border-white rounded"
                >
                    Logout
                </button>
            ) : (

                <>
                    <a
                        href="/login"
                        className="bg-transparent lg:block hidden hover:bg-gray-600 text-white font-semibold hover:text-white py-1 px-2 border border-white rounded"
                    >
                        Login
                    </a>
                </>

            )
        }
    </>
);

const Navbar: React.FC = () => {
    const [cartItems, setCartItems] = useState<number>(0);
    const [username, setUsername] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cookies, _, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = cookies.token;
                if (!token) {
                    console.error("Token not found: PLEASE LOGIN FIRST!");
                    return;
                }
                const response = await axios.get('https://codsoft-e-commerce-website-server.onrender.com/auth/user-details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.username);
                setCartItems(response.data.totalItemsInCart);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [cookies.token, navigate]);

    //logic to handle logout
    const handleLogout = async () => {
        try {
            const token = cookies.token;
            if (!token) {
                console.error('Token not found: PLEASE LOGIN FIRST!');
                return;
            }
            await axios.post('https://codsoft-e-commerce-website-server.onrender.com/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            removeCookie('token', { path: '/' })
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    //add overflowy to window when  nav is
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to={'/'} className="flex items-center">
                        <AiOutlineShoppingCart className="text-white text-2xl mr-2 hidden lg:block" />
                        <h1 className="text-white font-bold text-lg">MyStore</h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 justify-center">
                    <div className="flex items-center space-x-4 relative">
                        <div className={isMenuOpen ? 'absolute top-[2.6rem] z-20 right-[-5rem] flex  px-6 space-y-3 bg-gray-800 whitespace-nowrap py-5 rounded-md flex-col' : 'hidden lg:flex lg:space-x-3'}>
                            <Link to="/" className="text-white hover:text-gray-300" onClick={closeMenu}>Home</Link>
                            <Link to="/protected/products" className="text-white  hover:text-gray-300" onClick={closeMenu}>All Products</Link>
                            <Link to="/protected/cart" className="text-white  hover:text-gray-300" onClick={closeMenu}>My Cart</Link>
                            {
                                cookies.token ? (
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMenu();
                                        }}
                                        className="bg-transparent lg:hidden hover:bg-gray-600 text-white font-semibold hover:text-white py-1 px-2 border border-white rounded"
                                    >
                                        Logout
                                    </button>
                                ) : (

                                    <a

                                        href="/login"

                                    >
                                        <button className="bg-transparent lg:hidden block hover:bg-gray-600 text-white font-semibold w-full hover:text-white py-1 px-2 border border-white rounded">
                                            Login
                                        </button>
                                    </a>
                                )
                            }

                        </div>
                        <CartIcon count={cartItems} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <UserIcon username={username} onLogout={handleLogout} token={cookies.token} />
                    </div>
                    <div className="lg:hidden flex">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <AiOutlineMenu className="text-white text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
