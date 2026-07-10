"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Company", href: "/company" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Home", href: "/" },
        { name: "Track Parcel", href: "/public-page/track-parcel" },
        { name: "Services", href: "/public-page/services" },
        { name: "Pricing", href: "/public-page/pricing" },
        { name: "Contact", href: "/public-page/contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { name: "Support", href: "/support" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 pb-12 border-b border-gray-100">
          <div className="col-span-1 sm:col-span-3 md:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Parcel<span className="text-[#4F46E5]">Flow</span>
              </span>
              <span className="bg-indigo-50 text-[#4F46E5] text-xs font-semibold px-2 py-0.5 rounded-full">
                ERP
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Optimizing your logistics and supply chain management with our
              modern, efficient ERP tracking solutions.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col space-y-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`transition-colors ${
                          isActive
                            ? "text-[#4F46E5] font-semibold"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 space-y-4 sm:space-y-0 text-xs text-gray-500">
          <p className="text-center sm:text-left">
            © {currentYear} ParcelFlow ERP. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 font-medium">
            <a href="#" className="hover:text-gray-900 transition">
              FB
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              TW
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              IG
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              LN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
