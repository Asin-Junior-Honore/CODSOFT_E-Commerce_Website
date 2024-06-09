import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface SignupForm {
  username: string;
  password: string;
  email: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data: SignupForm) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://codsoft-e-commerce-website-nine.vercel.app/auth/signup",
        data
      );

      const successMessage =
        response.data?.message || "Signup successful! Redirecting to login...";
      toast.success(successMessage, {
        autoClose: 2000,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      let errorMessage = "Sorry, something went wrong. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }

      toast.error(errorMessage, {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 lg:px-0">
      <div className="w-[28rem] bg-white mx-auto p-4 border rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              {...register("username")}
              className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4 relative">
            {" "}
            {/* Add relative positioning for the eye icon */}
            <label className="block mb-1">Password</label>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle type based on visibility
              {...register("password")}
              className="w-full px-4 py-2 rounded border bg-gray-100 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[3.2rem] right-2 transform -translate-y-1/2 text-blue-500 text-2xl"
            >
              {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={isSubmitting || loading}
          >
            {loading ? (
              <BiLoaderAlt className="animate-spin inline-block mr-2" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
