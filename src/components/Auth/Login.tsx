import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import { motion } from "motion/react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser } from "../../store/slices/userSlice";

type logInValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<logInValues>();

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<logInValues> = (data) => {
    dispatch(loginUser({ ...data, dispatch }));
  };

  return (
    <div className="h-[calc(100vh-59px)] relative z-0 flex flex-col md:flex-row ">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <h3 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-100">
            Log in to Your Account
          </h3>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                  onBlur: () => trigger("email"),
                })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: 8,
                  onBlur: () => trigger("password"),
                })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
              <div className=" flex items-center space-x-2">
                <input
                  id="show"
                  type="checkbox"
                  className="size-4"
                  onChange={(event) => setShowPassword(event.target.checked)}
                  checked={showPassword}
                />
                <label htmlFor="show">Show Password</label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary/90 transition cursor-pointer"
            >
              Log In
            </button>
            <p className="text-center text-sm mt-4">
              Don't have an account?
              <NavLink
                to="/auth/signup"
                className="text-secondary hover:underline ml-1"
              >
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 hidden md:block h-full">
        <motion.img
          src="https://media.licdn.com/dms/image/v2/D5612AQENltQvmBK5Gg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1713421064651?e=2147483647&v=beta&t=nEx2PdetKjbU-evubqR_Bv2VRqfpRMJRWtRJZYYKFmo"
          alt="Illustration"
          className="w-full h-full object-cover"
          layoutId="authimage"
        />
      </div>
    </div>
  );
};

export default Login;
