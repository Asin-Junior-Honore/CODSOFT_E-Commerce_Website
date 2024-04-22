import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiLoaderAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Required CSS for react-toastify

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [_, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const response = await axios.post('https://codsoft-e-commerce-website-server.onrender.com/auth/login', data);
      const { token } = response.data;
      setCookie('token', token, { path: '/' });
      toast.success('Login successful! Redirecting...', {
        autoClose: 2000, // Toast duration
      });
      setTimeout(() => navigate('/'), 2000); // Redirect after toast
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials and try again.', {
        autoClose: 5000, // Toast duration for error messages
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 lg:px-0">
      <div className="w-[28rem] mx-auto bg-white p-4 border rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('username')}
              placeholder="Username"
              type="text"
              className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register('password')}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            disabled={isSubmitting || loading}
          >
            {loading ? <BiLoaderAlt className="animate-spin inline-block mr-2" /> : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">Signup here</Link>
        </p>
      </div>
      <ToastContainer /> {/* Ensure the ToastContainer is included */}
    </div>
  );
};

export default LoginPage;
