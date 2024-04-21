import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between lg:items-center items-start">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-white text-lg font-bold">Stay Connected</h3>
                        <div className="flex mt-2">
                            <a href="#" className="text-gray-400 hover:text-white mr-4"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-white mr-4"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Cart</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
                        </ul>
                    </div>
                </div>
                <hr className="border-t border-gray-700 my-6" />
                <p className="text-center text-gray-400">&copy; 2024 My Store. All rights reserved.</p>
                <strong className='text-center text-gray-400 block mt-2'>made by Asin-Honore</strong>
            </div>
        </footer>
    );
}

export default Footer;
