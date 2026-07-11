"use client";

import { useState } from "react";
import logo from "@/Components/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { logoWithIcon } = logo();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: response, error } = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("SignIn Error:", error);
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: error.message,
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have signed in successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/");

      console.log("From Data", response);
    } catch (error) {
      console.error("Unexpected Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text:
          error.message || "একটি অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
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
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-[#4F46E5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                })}
                aria-invalid={errors.password ? "true" : "false"}
                className={`w-full px-4 py-3 pr-16 rounded-xl border text-sm transition-all outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                }`}
              />
              <button
                type="button"
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

          <button
            type="submit"
            disabled={loading}
            className=" cursor-pointer w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link
              className="text-[#4F46E5] font-medium hover:underline transition-colors"
              href="/auth/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
