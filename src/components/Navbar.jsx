'use client'
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Burger va Close ikonkasi
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFavoriteStore } from "@/store/Favorities";
import { useBoughtStore } from "@/store/BoughtProducts";

const Navbar = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const buyProductsLength = useBoughtStore((state) => state.boughtProducts);

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobil menyu holati

  useEffect(() => {
    setMounted(true);
  }, []);

  // Menyu havolalari ro'yxati
  const navLinks = [
    { href: "#home", label: "Asosiy" },
    { href: "#about", label: "Biz haqimizda" },
    { href: "#service", label: "Bizning Hizmatlar" },
    { href: "#staff", label: "Bizning Oshpazlar" },
    { href: "#products", label: "Taomlar Menusi" },
    { href: "#rooms", label: "Xonalar" },
    { href: "#contact", label: "Biz bilan bog'lanish" },
  ];

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-[#A1883E]/70 backdrop-blur-md z-50 transition-all duration-300">
        <div className="navbar py-3">
          <div className="mx-auto px-4 flex items-center justify-between gap-2 sm:gap-4">

            {/* Logo */}
            <Link href={"/"}>
              <Image
                data-aos="fade-right"
                data-aos-duration="700"
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-20 sm:w-24 md:w-[100px] h-auto object-contain"
              />
            </Link>

            
            <ul
              data-aos="zoom-in"
              data-aos-duration="700"
              className="hidden lg:flex items-center gap-6 text-slate-200 font-medium"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-[#FFE680] drop-shadow-md duration-300 text-[14px]"
                >
                  {link.label}
                </Link>
              ))}
            </ul>

            {/* Right Action Items */}
            <div data-aos="fade-left" data-aos-duration="700" className="flex items-center gap-3 sm:gap-6 lg:gap-10">

              {/* Phone Info */}
              <div className="flex items-center flex-col text-right sm:text-center">
                <a className="font-bold text-xs sm:text-base md:text-[20px] text-white whitespace-nowrap" href="tel:+998888555351">
                  +998 88 855 53 51
                </a>
                <span className="text-slate-200 sm:text-slate-300 font-normal text-[9px] sm:text-[12px] whitespace-nowrap">
                  Har kuni 7:00 dan 1:00 gacha
                </span>
              </div>

              {/* Icons (Favorites, Cart, & Burger Menu) */}
              <div className="flex items-center gap-3 sm:gap-5">

                {/* Favorites Icon */}
                <div className="group cursor-pointer">
                  <Link className="flex items-center flex-col relative" href={"/favorities"}>
                    <div className="relative">
                      <AiOutlineHeart className="text-xl sm:text-2xl text-[#fff] group-hover:text-[#FFE680] group-hover:drop-shadow-[0_0_10px_rgba(255,230,128,0.7)] group-hover:-translate-y-0.5 duration-300 transition-all" />
                      {mounted && favorites?.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white px-1">
                          {favorites.length}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:inline-block text-[12px] md:text-[14px] text-[#fff] group-hover:text-[#FFE680] duration-300">
                      Favorites
                    </span>
                  </Link>
                </div>

                {/* Cart Icon */}
                <div className="group cursor-pointer">
                  <Link className="flex items-center flex-col relative" href={"/buyPage"}>
                    <div className="relative">
                      <CgShoppingCart className="text-xl sm:text-2xl text-[#fff] group-hover:text-[#FFE680] group-hover:drop-shadow-[0_0_10px_rgba(255,230,128,0.7)] group-hover:-translate-y-0.5 duration-300 transition-all" />
                      {mounted && buyProductsLength?.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white px-1">
                          {buyProductsLength.length}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:inline-block text-[12px] md:text-[14px] text-[#fff] group-hover:text-[#FFE680] duration-300">
                      Shop
                    </span>
                  </Link>
                </div>

                {/* Burger Menu Button (Mobil ekranlar uchun) */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden text-white hover:text-[#FFE680] transition-colors duration-300 p-1 focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? (
                    <HiX className="text-2xl sm:text-3xl" />
                  ) : (
                    <HiMenuAlt3 className="text-2xl sm:text-3xl" />
                  )}
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu (Tepadan tushadigan qismi) */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#8C7433]/95 backdrop-blur-lg border-t border-white/10 ${isOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
        >
          <ul className="flex flex-col items-center gap-4 px-4">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full text-center">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Bosilganda menyu yopiladi
                  className="block py-2 text-white hover:text-[#FFE680] font-medium text-[15px] transition-colors duration-200 border-b border-white/12 w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;