import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Signup from './pages/Signup';
import PrivateRoutes from './utils/PrivateRoutes';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <div className='bg-gray-200'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
