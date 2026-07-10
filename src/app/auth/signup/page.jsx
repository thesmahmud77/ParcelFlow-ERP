"use client";

import { useState } from "react";
import logo from "@/Components/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; // রিডাইরেক্টের জন্য
import Swal from "sweetalert2"; // SweetAlert ইম্পোর্ট করা হলো

const SignUp = () => {
  const { logoWithIcon } = logo();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imgFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imgFile);

      // ImgBB-তে ইমেজ আপলোড
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=d11b800a59dcca4d8f9ddb86c014f5f7`,
        {
          method: "POST",
          body: formData,
        },
      );
      const imgbbData = await imgbbRes.json();
      const photoURL = imgbbData.data.url;

      // Better Auth-এর মাধ্যমে সাইন আপ
      const { data: response, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: photoURL,
        role: "user",
      });

      if (error) {
        console.error("SignUp Error:", error); // এটা যোগ করুন
        Swal.fire({
          icon: "error",
          title: "Sign Up Failed",
          text: error.message,
        });
        return;
      }

      router.push("/");

      console.log("From Data", response);
    } catch (error) {
      console.error("Error From", error);
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
            Create your Account
          </h1>
          <p className="text-sm text-gray-500">
            Join us today! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* নাম ইনপুট ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
              aria-invalid={errors.name ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                errors.name
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              }`}
            />
            {errors.name && (
              <p
                role="alert"
                className="text-xs text-red-500 font-medium pt-0.5"
              >
                {errors.name.message}
              </p>
            )}
          </div>

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

          {/* পাসওয়ার্ড ইনপুট ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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

          {/* প্রোফাইল ফটো আপলোড ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Your Photo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-[#4F46E5] file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-indigo-100 ${
                errors.photo ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.photo && (
              <p
                role="alert"
                className="text-xs text-red-500 font-medium pt-0.5"
              >
                {errors.photo.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              className="text-[#4F46E5] font-medium hover:underline transition-colors"
              href="/auth/signin"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
