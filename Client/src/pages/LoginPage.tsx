import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiLoaderAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the password field type
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://codsoft-e-commerce-website-server.onrender.com/auth/login',
        data
      );

      const { token, message } = response.data; // Extract token and message from response
      setCookie('token', token, { path: '/' }); // Store token in cookies
      
      // Show success message
      toast.success(message || 'Login successful! Redirecting...', {
        autoClose: 2000,
      });
      
      setTimeout(() => navigate('/'), 2000); // Redirect to homepage after 2 seconds
    } catch (error: unknown) {
      let errorMessage = "Login failed. Please check your credentials and try again.";

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      }

      toast.error(`Sorry, ${errorMessage}`, {
        autoClose: 5000,
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
          <div className="mb-4 relative"> {/* Add relative positioning for the eye icon */}
            <input
              {...register('username')}
              placeholder="Username"
              type="text"
              className="w-full px-4 py-2 rounded border bg-gray-100"
              focus:outline-none
              focus:border-blue-500
            />
            {errors.username && (
              <p className="text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4 relative"> {/* Update for password visibility toggle */}
            <input
              {...register('password')}
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'} // Toggle field type based on visibility state
              className="w-full px-4 py-2 rounded border bg-gray-100"
              focus:outline-none
              focus:border-blue-500
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-500 text-2xl"
            >
              {passwordVisible ? <AiOutlineEye />   :   <AiOutlineEyeInvisible />}
            </button>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded"
            hover:bg-blue-700
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
    </div>
  );
};

export default LoginPage;
