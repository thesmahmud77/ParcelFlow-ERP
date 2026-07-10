"use client";

import { useState } from "react"; // পাসওয়ার্ড টগল স্টেটের জন্য
import logo from "@/Components/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const { logoWithIcon } = logo();
  const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড ভিজিবিলিটি স্টেট

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      {/* ফর্মের মূল কার্ড কন্টেইনার */}
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        {/* হেডার অংশ (লোগো এবং টেক্সট) */}
        <div className="flex flex-col items-center text-center space-y-3">
          {logoWithIcon && (
            <div className="relative w-12 h-12">
              <Image
                src={logoWithIcon}
                alt="ParcelFlow Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Sign in to your Account
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* ফর্ম এলিমেন্ট */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* ইমেইল ইনপুট ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              }`}
            />
            {errors.email && (
              <p
                role="alert"
                className="text-xs text-red-500 font-medium pt-0.5"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* পাসওয়ার্ড ইনপুট ফিল্ড (টগল বাটন সহ) */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"} // স্টেটের ওপর ভিত্তি করে টাইপ চেঞ্জ হবে
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                aria-invalid={errors.password ? "true" : "false"}
                className={`w-full px-4 py-3 pr-16 rounded-xl border text-sm transition-all outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                }`}
              />

              {/* পাসওয়ার্ড শো/হাইড টেক্সট বাটন */}
              <button
                type="button" // এটি অত্যন্ত জরুরি যাতে ফর্ম সাবমিট না হয়ে যায়
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-xs font-semibold text-gray-500 hover:text-[#4F46E5] transition-colors select-none uppercase tracking-wider"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p
                role="alert"
                className="text-xs text-red-500 font-medium pt-0.5"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-sm"
          >
            Sign In
          </button>
        </form>

        {/* নিচের রেজিস্টার লিংক */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              className="text-[#4F46E5] font-medium hover:underline transition-colors"
              href="/auth/signup"
            >
              Please Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
