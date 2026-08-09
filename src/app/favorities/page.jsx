'use client';
import { AiFillHeart } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoriteStore } from '@/store/Favorities'
import Navbar from '@/components/Navbar';

const FavoritesPage = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const favorites = useFavoriteStore((state) => state.favorites);
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null; // Hydration xatosini oldini olish uchun

    return (
        <div>
            <Navbar />
            <div className="text-gray-800 font-sans mt-30 md:p-10 min-h-screen">

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-[#725927] text-3xl md:text-4xl font-bold mb-9"
                >
                    Tanlangan Taomlar
                </motion.h1>

                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-[#8c7b5b]"
                    >
                        <p className="text-xl font-semibold mb-2">Hozircha hech qanday taom tanlanmagan 😔</p>
                        <p className="text-sm">Menyudan yoqqan taomlaringizga yurakcha tugmasini bosing!</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 max-w-[1400px] mx-auto">
                        <AnimatePresence>
                            {favorites.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className="bg-[#fdf6e2] rounded-2xl overflow-hidden shadow-lg border border-[#A08141]/30 flex flex-col relative"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <span className="absolute top-3 left-3 z-10 bg-[#A08141]/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase">
                                            {item.category}
                                        </span>

                                        {/* Favoritdan chiqarish tugmasi */}
                                        <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.8 }}
                                            onClick={() => toggleFavorite(item)}
                                            className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-lg flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <AiFillHeart className="text-red-500"/>
                                        </motion.button>

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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;