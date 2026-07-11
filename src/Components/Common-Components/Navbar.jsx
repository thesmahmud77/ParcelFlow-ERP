"use client";
import Image from "next/image";
import logo from "../logo/logo";
import Link from "next/link";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useUser } from "@/Custom-Hooks/useUser";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Track Parcel", href: "/public-page/track-parcel" },
  { name: "Services", href: "/public-page/services" },
  { name: "Pricing", href: "/public-page/pricing" },
  { name: "Contact", href: "/public-page/contact" },
];

const Navbar = () => {
  const { fullLogo, logoIcon } = logo();
  const { user } = useUser();
  console.log(user);
  const [mobileClick, setMobileClick] = useState(false);
  const patheName = usePathname();
  // console.log(patheName);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between gap-10 px-5 md:px-60">
        <div>
          <Link href={"/"}>
            <Image src={fullLogo}></Image>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center gap-3">
          {navLinks.map((nav) => {
            const isActive = patheName === nav.href;
            return (
              <Link
                key={nav.name}
                href={nav.href}
                className={`flex items-center justify-center ${isActive ? " text-blue-700 font-bold border-b-3 border-blue-700" : "text=black"}`}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4 text-sm font-medium justify-self-end">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-gray-900"
            >
              Signin
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#4F46E5] py-3 px-5 flex items-center justify-center text-white font-bold rounded-xl"
            >
              Get Started
            </Link>
          </div>

          <div>
            <h2>Hi, {user?.name}</h2>
            <Link href={"/"}>
              <Image
                src={user?.image}
                alt={user?.name || "User profile"}
                width={40}
                height={40}
              ></Image>
            </Link>
          </div>

          <button
            onClick={() => setMobileClick(!mobileClick)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {mobileClick ? (
              <RxCross2 width={100} height={100} className="cursor-pointer" />
            ) : (
              <HiDotsVertical
                width={100}
                height={100}
                className="cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>
      {mobileClick && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-4 shadow-lg absolute left-0 right-0 top-[73px]">
          <div className="flex flex-col space-y-3 font-medium text-gray-600">
            {navLinks.map((nav) => {
              const isActive = patheName === nav.href;
              return (
                <Link
                  key={nav.name}
                  href={nav.href}
                  className={`flex items-center justify-center ${isActive ? " bg-blue-700 font-bold w-full py-2 text-white" : "text=black"}`}
                >
                  {nav.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-gray-100" />
          <div className="flex flex-col space-y-3 pt-2">
            <Link
              href="/login"
              className="text-center font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/get-started"
              className="bg-[#4F46E5] text-white text-center px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
