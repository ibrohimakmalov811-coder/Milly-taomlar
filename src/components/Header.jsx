import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div>
            <section className="hero relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-20">

                <div className="absolute inset-0 bg-[url('/hero-image.png')] bg-cover bg-center animate-hero-zoom" />
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Hero kontenti */}
                <div className="container relative z-20 text-center text-white flex flex-col items-center">
                    <div data-aos="zoom-in" data-aos-duration="1000" className="flex flex-col items-center">
                        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-[96px] font-extrabold text-[#F5EFE0] max-w-[600px] text-center leading-tight">
                            O'zbek
                        </h1>
                        <h2 className="hero-title2 text-3xl sm:text-5xl md:text-7xl lg:text-[96px] font-extrabold italic text-[#E8C87A] leading-tight mt-1 sm:mt-2">
                            Milliy Taomlari
                        </h2>
                    </div>

                    <p
                        data-aos="zoom-in"
                        data-aos-duration="900"
                        className="hero-description mt-4 text-[#d4d3d2] text-center max-w-xl text-base sm:text-lg md:text-xl px-2"
                    >
                        O'zbek milliy taomlari tarixi, tarkibi va tayyorlanish sirlarini o'rganing. Mazali retseptlarni sinab ko'ring va yaqinlaringizni xursand qiling.
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
                        {/* 1. Boshlash tugmasi (Oltin rangli gradient va milliy uslubda) */}
                        <Link data-aos="fade-right" data-aos-duration="700" href="#contact" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-3.5 cursor-pointer bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-black font-extrabold text-base sm:text-lg rounded-full border-2 border-[#FFE898] shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] active:scale-95">
                                Bog'lanish
                            </button>
                        </Link>

                        {/* 2. Barcha taomlar tugmasi (Shaffof va oltin hoshiyali) */}
                        <Link data-aos="fade-left" data-aos-duration="700" href="/products" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-3.5 cursor-pointer bg-black/40 backdrop-blur-md text-[#F3E5AB] font-extrabold text-base sm:text-lg rounded-full border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300 hover:bg-[#D4AF37]/20 hover:text-white hover:brightness-125 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] active:scale-95">
                                Barcha Taomlar
                            </button>
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Header