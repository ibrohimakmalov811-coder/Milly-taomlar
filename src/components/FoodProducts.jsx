'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { foods } from './Foods';
import { useFavoriteStore } from '../store/Favorities';
import { useBoughtStore } from '@/store/BoughtProducts';
import { HiHeart, HiOutlineHeart, HiShoppingCart, HiOutlineShoppingCart } from "react-icons/hi";
import { message } from 'antd';

export default function FoodProducts() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFood, setSelectedFood] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hydration xatosining oldini olish uchun
  const [hasMounted, setHasMounted] = useState(false);

  // Zustand store'dan holat va funksiyalarni olish
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const boughtProducts = useBoughtStore((state) => state.boughtProducts);
  const toggleShop = useBoughtStore((state) => state.toggleShop);
  const clearCart = useBoughtStore((state) => state.clearCart);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  function openModal(id) {
    const food = foods.find((f) => f.id === id);
    if (food) {
      setSelectedFood(food);
      setQty(1);
      setSelectedAddons([]);
      setIsModalOpen(true);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function changeQty(delta) {
    setQty((prev) => {
      const newQty = prev + delta;
      return newQty < 1 ? 1 : newQty;
    });
  }

  function handleAddonChange(price, isChecked) {
    if (isChecked) {
      setSelectedAddons((prev) => [...prev, price]);
    } else {
      setSelectedAddons((prev) => prev.filter((p) => p !== price));
    }
  }

  const handleBack = () => {
    if (boughtProducts.length === 0) {
      messageApi.open({
        type: 'warning',
        content: "Savatingiz bo'sh!",
      });
      return;
    }

    messageApi.open({
      type: 'success',
      content: "Buyurtma muvaffaqiyatli amalga oshirildi! 😁",
      duration: 2,
    });

    setTimeout(() => {
      if (typeof clearCart === 'function') {
        clearCart();
      }
      closeModal();
      router.push('/');
    }, 1200);
  };

  const addonsSum = selectedAddons.reduce((acc, curr) => acc + curr, 0);
  const totalPrice = selectedFood ? selectedFood.price * qty + addonsSum : 0;

  // ANIMATSIYA VARIANTLARI
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="text-gray-800 font-sans p-5 md:p-10 min-h-screen overflow-x-hidden">
      {contextHolder}

      <motion.h1
        data-aos="zoom-in"
        data-aos-duration="1000"
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="text-center text-[#725927] text-3xl md:text-5xl font-bold mb-9 drop-shadow-sm"
      >
        🍲 Milliy Taomlar Menusi
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        id="menu-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8 gap-7 max-w-[1400px] mx-auto"
      >
        {foods?.slice(0, 8)?.map((item, index) => {
          const isFav = hasMounted && favorites.some((fav) => fav.id === item.id);
          const isBought = hasMounted && boughtProducts.some((bought) => bought.id === item.id);
          const aosAnimation = index % 2 === 0 ? "fade-left" : "zoom-in";

          return (
            <motion.div
              key={item.id}
              data-aos={aosAnimation}
              data-aos-delay={index * 100}
              data-aos-duration="800"
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(item.id)}
              className="bg-[#fdf6e2] rounded-2xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#A08141] hover:shadow-2xl transition-shadow duration-300 flex flex-col relative cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <span className="absolute top-3 left-3 z-10 bg-[#A08141]/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase backdrop-blur-md">
                  {item.category}
                </span>

                <motion.button
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                  className="absolute top-3 right-3 z-20 p-2.5 rounded-full shadow-md flex items-center justify-center bg-white/80 backdrop-blur-sm"
                >
                  {isFav ? (
                    <HiHeart className="w-5 h-5 text-red-500 transition-colors" />
                  ) : (
                    <HiOutlineHeart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  )}
                </motion.button>

                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
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

                <div className="flex justify-between text-xs text-[#8c7b5b] pb-3 mb-4 border-b border-[#A08141]/20">
                  <span>⏱️ {item.time}</span>
                  <span>👥 {item.portion}</span>
                  <span>⭐️ {item.rating}</span>
                </div>

                <div className="flex items-center justify-between mt-auto gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#a0937d] line-through">
                      {item.oldPrice}
                    </span>
                    <span className="text-lg font-extrabold text-[#d9381e]">
                      {item.price.toLocaleString()} so'm
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleShop(item);
                      }}
                      title={isBought ? "Savatdan olib tashlash" : "Savatga qo'shish"}
                      className={`p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center ${
                        isBought
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-[#e2d2b4] hover:bg-[#d4c09c] text-[#725927]'
                      }`}
                    >
                      {isBought ? (
                        <HiShoppingCart className="w-5 h-5" />
                      ) : (
                        <HiOutlineShoppingCart className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && selectedFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] p-5"
            onClick={closeModal}
          >
            <motion.div
              data-aos="zoom-in"
              data-aos-duration="300"
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fdf6e2] border-2 border-[#A08141] text-gray-800 w-full max-w-[550px] max-h-[90vh] rounded-3xl overflow-y-auto relative p-6 shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-[#e2d2b4] text-[#725927] hover:bg-red-500 hover:text-white w-8 h-8 rounded-full font-bold flex items-center justify-center transition-colors"
              >
                &times;
              </button>

              <img
                src={selectedFood?.img}
                alt={selectedFood?.title || ''}
                className="w-full h-48 object-cover rounded-2xl mb-5"
              />

              <h2 className="text-2xl font-serif font-bold text-[#725927] mb-2">
                {selectedFood?.title}
              </h2>
              <p className="text-sm text-[#665c49] leading-relaxed mb-5">
                {selectedFood?.desc}
              </p>

              <div className="grid grid-cols-3 gap-2 bg-[#f5eace] p-3 rounded-xl border border-[#A08141]/30 mb-5 text-center">
                <div>
                  <div className="text-sm font-bold text-[#725927]">
                    {selectedFood?.time}
                  </div>
                  <div className="text-[10px] text-[#8c7b5b] font-semibold uppercase mt-0.5">
                    TAYYORLASH VAQTI
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#725927]">
                    {selectedFood?.portion}
                  </div>
                  <div className="text-[10px] text-[#8c7b5b] font-semibold uppercase mt-0.5">
                    PORSIYA
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#725927]">
                    {selectedFood?.level}
                  </div>
                  <div className="text-[10px] text-[#8c7b5b] font-semibold uppercase mt-0.5">
                    QIYINLIK DARAJASI
                  </div>
                </div>
              </div>

              <div className="text-base font-bold text-[#725927] mb-3 flex items-center gap-2">
                ❄️ Kerakli Mahsulotlar
              </div>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {selectedFood?.ingredients?.map((ing, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f5eace] p-2.5 rounded-lg text-xs text-[#554832] border border-[#A08141]/20"
                  >
                    ✦ {ing}
                  </div>
                ))}
              </div>

              <div className="text-base font-bold text-[#725927] mb-3 flex items-center gap-2">
                {selectedFood?.addonsTitle}
              </div>
              <div className="flex flex-col gap-2.5 mb-6">
                {selectedFood?.addons?.map((add, idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between bg-[#f5eace] p-3 rounded-xl border border-[#A08141]/20 cursor-pointer hover:border-[#A08141] hover:bg-[#eee0be] transition-all"
                  >
                    <div className="flex items-center gap-2.5 text-sm text-[#443a29]">
                      <input
                        type="checkbox"
                        value={add.price}
                        className="modal-addon-cb accent-[#A08141] w-4 h-4"
                        onChange={(e) =>
                          handleAddonChange(add.price, e.target.checked)
                        }
                      />
                      <span>{add.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#d9381e]">
                      +{add.price.toLocaleString()} so'm
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between bg-[#f5eace] p-3 rounded-xl border border-[#A08141]/30 mb-5">
                <span className="text-sm text-[#665c49] font-semibold">
                  Porsiya miqdori:
                </span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => changeQty(-1)}
                    className="bg-[#A08141] hover:bg-[#886d34] text-white w-7 h-7 rounded-md font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </motion.button>
                  <span className="font-bold text-base text-[#725927]">
                    {qty}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => changeQty(1)}
                    className="bg-[#A08141] hover:bg-[#886d34] text-white w-7 h-7 rounded-md font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#A08141]/30 pt-4">
                <div>
                  <div className="text-[11px] text-[#8c7b5b] font-bold">
                    JAMI SUMMA
                  </div>
                  <div className="text-2xl font-extrabold text-[#d9381e]">
                    {totalPrice.toLocaleString()} so'm
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="bg-[#A08141] hover:bg-[#886d34] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-md"
                >
                  Buyurtma Berish
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}