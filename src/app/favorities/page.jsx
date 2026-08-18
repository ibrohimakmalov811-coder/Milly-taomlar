'use client';
import { AiFillHeart } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { useFavoriteStore } from '@/store/Favorities';
import Navbar from '@/components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FavoritesPage = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const favorites = useFavoriteStore((state) => state.favorites);
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

    useEffect(() => {
        setHasMounted(true);
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    if (!hasMounted) return null; // Hydration xatosini oldini olish uchun

    return (
        <div>
            <Navbar />
            <div className="text-gray-800 font-sans mt-30 md:p-10 min-h-screen">

                <h1
                    data-aos="fade-down"
                    className="text-center text-[#725927] text-3xl md:text-4xl font-bold mb-9"
                >
                    Tanlangan Taomlar
                </h1>

                {favorites.length === 0 ? (
                    <div
                        data-aos="fade-up"
                        className="text-center py-20 text-[#8c7b5b]"
                    >
                        <p className="text-xl font-semibold mb-2">Hozircha hech qanday taom tanlanmagan 😔</p>
                        <p className="text-sm">Menyudan yoqqan taomlaringizga yurakcha tugmasini bosing!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 max-w-[1400px] mx-auto">
                        {favorites.map((item, index) => (
                            <div
                                key={item.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-[#fdf6e2] rounded-2xl overflow-hidden shadow-lg border border-[#A08141]/30 flex flex-col relative transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <span className="absolute top-3 left-3 z-10 bg-[#A08141]/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase">
                                        {item.category}
                                    </span>

                                    {/* Favoritdan chiqarish tugmasi */}
                                    <button
                                        onClick={() => toggleFavorite(item)}
                                        className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-90 transition-all duration-200"
                                    >
                                        <AiFillHeart className="text-red-500"/>
                                    </button>

                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-xl font-serif font-bold text-[#725927] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-[#665c49] leading-relaxed mb-4 flex-grow">
                                        {item.desc}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#A08141]/20">
                                        <span className="text-lg font-extrabold text-[#d9381e]">
                                            {item.price.toLocaleString()} so'm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;