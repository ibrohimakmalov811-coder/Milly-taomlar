"use client";
import { foods } from "@/components/Foods";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Products = () => {
  // Tanlangan taom holati (Modal uchun)
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Modalni yopish funksiyasi
  const closeModal = () => setSelectedFood(null);

  return (
    <div className=" min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Tepa Sarlavha qismi */}
        <div className="pt-28 sm:pt-36 pb-6 px-4 sm:px-6 text-center" data-aos="fade-down">
          <span className="inline-block bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-[#8B0000]/20">
            Lazzatli & Haqiqiy
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2C1810] tracking-tight mb-3">
            Milliy Taomlar Menyusi - {foods.length} ta taom bilan
          </h1>

          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] text-lg">✦</span>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          </div>

          <p className="text-[#665A52] text-sm sm:text-base max-w-xl mx-auto font-medium">
            Bizning mohir oshpazlarimiz tomonidan sharqona an'analar va mehr bilan tayyorlangan shirin taomlar to'plami.
          </p>
        </div>

        {/* Taomlar Grid Ro'yxati */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
          {foods.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 100}
              className="group relative bg-[#FDF6E2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#F0E6D2] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 bg-[#8B0000] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </span>

                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-[#FFD700] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                    ⭐ {item.rating}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <h2 className="text-lg sm:text-xl font-bold text-[#2C1810] mb-2 line-clamp-1 group-hover:text-[#B8860B] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[#665A52] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#8C7A6B] pb-4 mb-4 border-b border-dashed border-[#E6DBCB]">
                    <span className="flex items-center gap-1 bg-[#FAF6F0] px-2 py-1 rounded-md border border-[#F0E6D2]">
                      ⏱️ {item.time}
                    </span>
                    <span className="flex items-center gap-1 bg-[#FAF6F0] px-2 py-1 rounded-md border border-[#F0E6D2]">
                      👥 {item.portion}
                    </span>
                    <span className="flex items-center gap-1 bg-[#FAF6F0] px-2 py-1 rounded-md border border-[#F0E6D2]">
                      📊 {item.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Pastki Qismi */}
              <div className="px-4 sm:px-5 pb-5 pt-0 flex items-center justify-between">
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#B8860B]">
                    {item.price?.toLocaleString()} so'm
                  </div>
                  {item.oldPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      {item.oldPrice}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedFood(item)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#966F0D] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BATAFSIL MODAL OYNASI */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            data-aos="zoom-in" 
            data-aos-duration="300"
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-[#D4AF37]/30"
          >
            
            {/* Modal Sarlavhasi / Rasm */}
            <div className="relative h-56 sm:h-64 w-full shrink-0">
              <img
                src={selectedFood.img}
                alt={selectedFood.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Yopish tugmasi */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all text-lg cursor-pointer"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#8B0000] text-xs font-semibold px-2.5 py-1 rounded-full mr-2">
                  {selectedFood.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  {selectedFood.title}
                </h2>
              </div>
            </div>

            {/* Modal Ichidagi Kontent (Scroll bo'ladigan) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#2C1810]">
              
              {/* Narx va Ko'rsatkichlar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF6F0] p-3.5 rounded-xl border border-[#F0E6D2]">
                <div>
                  <span className="text-xs text-stone-500 block">Narxi:</span>
                  <span className="text-xl font-black text-[#B8860B]">
                    {selectedFood.price?.toLocaleString()} so'm
                  </span>
                </div>
                <div className="flex gap-2 text-xs font-semibold">
                  <span className="bg-white px-2.5 py-1.5 rounded-lg border border-stone-200">⏱️ {selectedFood.time}</span>
                  <span className="bg-white px-2.5 py-1.5 rounded-lg border border-stone-200">👥 {selectedFood.portion}</span>
                  <span className="bg-white px-2.5 py-1.5 rounded-lg border border-stone-200">⭐ {selectedFood.rating}</span>
                </div>
              </div>

              {/* To'liq Ta'rif */}
              <div>
                <h3 className="text-base font-bold text-[#8B0000] mb-1">
                  Taom Haqida
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {selectedFood.fullDesc || selectedFood.desc}
                </p>
              </div>

              {/* Masalliqlar Ro'yxati */}
              {selectedFood.ingredients && (
                <div>
                  <h3 className="text-base font-bold text-[#8B0000] mb-2">
                    🛒 Kerakli Masalliqlar:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700">
                    {selectedFood.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                        <span className="text-[#D4AF37]">✔</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tayyorlanish Ketma-ketligi */}
              {selectedFood.recipe && (
                <div>
                  <h3 className="text-base font-bold text-[#8B0000] mb-2">
                    👨‍🍳 Tayyorlanish Bosqichlari:
                  </h3>
                  <ol className="space-y-2 text-sm text-stone-700">
                    {selectedFood.recipe.map((step, idx) => (
                      <li key={idx} className="flex gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                        <span className="font-bold text-[#B8860B] shrink-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Modal Pastki Qismi */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#2C1810] hover:bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;