'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CgShoppingCart } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useFavoriteStore } from '@/store/Favorities';
import { useBoughtStore } from '@/store/BoughtProducts';

const navLinks = [
  { href: '#home', label: 'Asosiy' },
  { href: '#about', label: 'Biz haqimizda' },
  { href: '#service', label: 'Bizning Hizmatlar' },
  { href: '#staff', label: 'Bizning Oshpazlar' },
  { href: '#products', label: 'Taomlar Menusi' },
  { href: '#rooms', label: 'Xonalar' },
  { href: '#contact', label: "Biz bilan bog'lanish" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const favorites = useFavoriteStore((state) => state.favorites);
  const boughtProducts = useBoughtStore((state) => state.boughtProducts);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

  const favCount = mounted ? favorites?.length || 0 : 0;
  const boughtCount = mounted ? boughtProducts?.length || 0 : 0;

  return (
    <header className="fixed top-0 left-0 w-full bg-[#A1883E]/80 backdrop-blur-md z-50 transition-all duration-300 border-b border-white/10">
      <nav className="py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo */}
          <Link href="/">
            <Image
              data-aos="fade-right"
              data-aos-duration="700"
              src="/logo.png"
              alt="Milliy Taomlar Logotipi"
              width={100}
              height={100}
              priority
              className="w-20 sm:w-24 md:w-[100px] h-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul
            data-aos="zoom-in"
            data-aos-duration="700"
            className="hidden lg:flex items-center gap-6 text-slate-200 font-medium"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white hover:text-[#FFE680] drop-shadow-md transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action Items */}
          <div data-aos="fade-left" data-aos-duration="700" className="flex items-center gap-3 sm:gap-6 lg:gap-8">
            
            {/* Phone Info */}
            <div className="flex flex-col text-right sm:text-center">
              <a
                href="tel:+998888555351"
                className="font-bold text-xs sm:text-base md:text-lg text-white hover:text-[#FFE680] transition-colors whitespace-nowrap"
              >
                +998 88 855 53 51
              </a>
              <span className="text-slate-200 text-[10px] sm:text-xs whitespace-nowrap">
                Har kuni 7:00 dan 1:00 gacha
              </span>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Favorites Icon */}
              <Link href="/favorities" className="group flex flex-col items-center relative">
                <div className="relative">
                  <AiOutlineHeart className="text-xl sm:text-2xl text-white group-hover:text-[#FFE680] group-hover:-translate-y-0.5 transition-all duration-300" />
                  {favCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white px-1">
                      {favCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-xs text-white group-hover:text-[#FFE680] transition-colors duration-300">
                  Favorites
                </span>
              </Link>

              {/* Cart Icon */}
              <Link href="/buyPage" className="group flex flex-col items-center relative">
                <div className="relative">
                  <CgShoppingCart className="text-xl sm:text-2xl text-white group-hover:text-[#FFE680] group-hover:-translate-y-0.5 transition-all duration-300" />
                  {boughtCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white px-1">
                      {boughtCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-xs text-white group-hover:text-[#FFE680] transition-colors duration-300">
                  Shop
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-white hover:text-[#FFE680] transition-colors duration-300 p-1 focus:outline-none"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isOpen}
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
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#8C7433]/95 backdrop-blur-lg border-t border-white/10 ${
          isOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-2 px-4">
          {navLinks.map((link) => (
            <li key={link.href} className="w-full text-center">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-white hover:text-[#FFE680] font-medium text-sm transition-colors duration-200 border-b border-white/10 w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}