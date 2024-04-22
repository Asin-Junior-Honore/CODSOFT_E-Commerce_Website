import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BiLoaderAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password must be at least 6 characters'),
});

interface SignupForm {
    username: string;
    password: string;
    email: string;
}

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: SignupForm) => {
        try {
            setLoading(true);
            const response = await axios.post('https://codsoft-e-commerce-website-server.onrender.com/auth/signup', data);

            toast.success('Signup successful! Redirecting to login...', {
                autoClose: 2000, // Toast duration
            });
            console.log(response.data);

            setTimeout(() => navigate('/login'), 2000); // Redirect to login page after toast
        } catch (error) {
            toast.error('Signup failed. Please try again.', {
                autoClose: 5000, // Toast duration for error messages
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-5 lg:px-0">
                <div className="w-[28rem] bg-white mx-auto p-4 border rounded-lg shadow-md">
                    <h2 className="text-center text-2xl font-semibold mb-4">Signup</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block mb-1">Username</label>
                            <input
                                {...register('username')}
                                className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
                            />
                            {errors.username && <p className="text-red-500 mt-1">{errors.username.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                {...register('email')}
                                className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
                            />
                            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4"> {/* Fixed typo */}
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
                            />
                            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            disabled={isSubmitting || loading}
                        >
                            {loading ? <BiLoaderAlt className="animate-spin inline-block mr-2" /> : 'Submit'}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500">Login here</Link>
                    </p>
                </div>
                <ToastContainer /> {/* Toast notifications */}
            </div>
        </>
    );
};

export default Signup;
