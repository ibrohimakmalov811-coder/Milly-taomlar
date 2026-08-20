'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBoughtStore } from '@/store/BoughtProducts';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CARD_TYPES = [
    { id: 'humo', label: 'Humo', color: '#1e7a3d' },
    { id: 'uzcard', label: 'UzCard', color: '#0f5ea8' },
    { id: 'xalq', label: "Xalq banki", color: '#a01f2e' },
    { id: 'kapital', label: 'Kapitalbank', color: '#ef6c00' },
    { id: 'boshqa', label: 'Boshqa', color: '#725927' },
];

const BuyPage = () => {
    const boughtProducts = useBoughtStore((state) => state.boughtProducts);
    const toggleShop = useBoughtStore((state) => state.toggleShop);
    const clearCart = useBoughtStore((state) => state.clearCart);
    const router = useRouter();

    const [messageApi, contextHolder] = message.useMessage();

    // Checkout formasi uchun state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        cardType: '',
        cardNumber: '',
        address: '',
        note: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Telefon raqamini +998 XX XXX XX XX formatida ko'rsatish
    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 12);
        let out = '+998';
        const rest = digits.startsWith('998') ? digits.slice(3) : digits;
        const p = rest.slice(0, 9);
        if (p.length > 0) out += ' ' + p.slice(0, 2);
        if (p.length > 2) out += ' ' + p.slice(2, 5);
        if (p.length > 5) out += ' ' + p.slice(5, 7);
        if (p.length > 7) out += ' ' + p.slice(7, 9);
        return out;
    };

    // Karta raqamini 0000 0000 0000 0000 formatida ko'rsatish
    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    const handleChange = (field, value) => {
        let newValue = value;
        if (field === 'phone') newValue = formatPhone(value);
        if (field === 'cardNumber') newValue = formatCardNumber(value);
        setForm((prev) => ({ ...prev, [field]: newValue }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    // Buyurtma tugmasi bosilganda — avval savat tekshiriladi, keyin forma ochiladi
    const openCheckoutForm = () => {
        if (boughtProducts.length === 0) {
            messageApi.open({
                type: 'warning',
                content: "Savatingiz bo'sh!",
            });
            return;
        }
        setIsFormOpen(true);
    };

    const closeForm = () => setIsFormOpen(false);

    const validateForm = () => {
        const newErrors = {};
        if (form.name.trim().length < 2) newErrors.name = "Ismingizni to'liq kiriting";
        if (form.phone.replace(/\D/g, '').length < 12) newErrors.phone = "Telefon raqamini to'liq kiriting";
        if (!form.cardType) newErrors.cardType = 'Karta turini tanlang';
        if (form.cardNumber.replace(/\D/g, '').length !== 16) newErrors.cardNumber = "Karta raqami 16 xonali bo'lishi kerak";
        if (form.address.trim().length < 5) newErrors.address = 'Yetkazib berish manzilini kiriting';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmOrder = () => {
        if (!validateForm()) {
            messageApi.open({
                type: 'error',
                content: 'Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring',
            });
            return;
        }

        // Bu yerda kelajakda backendga (API) yuborish mumkin:
        // await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ ...form, items: boughtProducts, total: totalSum }) })

        messageApi.open({
            type: 'success',
            content: 'Buyurtma muvaffaqiyatli qabul qilindi! 😁',
            duration: 2,
        });

        setIsFormOpen(false);
        setTimeout(() => {
            clearCart();
            setForm({ name: '', phone: '', cardType: '', cardNumber: '', address: '', note: '' });
            router.push('/');
        }, 1200);
    };

    const totalSum = boughtProducts.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="p-5 md:p-10 max-w-[1000px] mx-auto min-h-screen text-gray-800">
            {contextHolder}

            <Navbar />
            <h1
                data-aos="fade-down"
                className="text-3xl font-bold text-[#725927] mt-30 text-center mb-6"
            >
                Xaridlaringiz
            </h1>

            {boughtProducts.length === 0 ? (
                <div data-aos="fade-up" className="text-center py-10 text-gray-500">
                    Savatingiz hozircha bo'sh.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {boughtProducts.map((item, index) => (
                        <div
                            key={item.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="flex items-center justify-between bg-[#fdf6e2] p-4 rounded-xl border border-[#A08141]/30 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="font-bold text-[#725927]">{item.title}</h3>
                                    <p className="text-sm font-semibold text-[#d9381e]">
                                        {item.price.toLocaleString()} so'm
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleShop(item)}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                O'chirish
                            </button>
                        </div>
                    ))}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mt-6 p-4 bg-[#f5eace] rounded-xl flex items-center justify-between border border-[#A08141]/40"
                    >
                        <div>
                            <span className="text-sm text-gray-600">Jami:</span>
                            <p className="text-2xl font-bold text-[#d9381e]">
                                {totalSum.toLocaleString()} so'm
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={clearCart}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                            >
                                Tozalash
                            </button>

                            <button
                                onClick={openCheckoutForm}
                                className="px-6 py-2 bg-[#A08141] hover:bg-[#886d34] text-white rounded-xl font-semibold text-sm transition-colors shadow-md cursor-pointer active:scale-95 duration-150"
                            >
                                Xaridni rasmiylashtirish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============ CHECKOUT FORM MODAL ============ */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] p-4"
                        onClick={closeForm}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#fdf6e2] border-2 border-[#A08141] w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-3xl relative p-6 shadow-2xl"
                        >
                            <button
                                onClick={closeForm}
                                className="absolute top-4 right-4 bg-[#e2d2b4] text-[#725927] hover:bg-red-500 hover:text-white w-8 h-8 rounded-full font-bold flex items-center justify-center transition-colors z-10"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-serif font-bold text-[#725927] mb-1">
                                Buyurtmani rasmiylashtirish
                            </h2>
                            <p className="text-xs text-[#8c7b5b] mb-5">
                                Ma'lumotlaringizni kiriting, buyurtmangiz tez orada yetkaziladi
                            </p>

                            <div className="flex flex-col gap-4">
                                {/* Ism */}
                                <div>
                                    <label className="text-xs font-semibold text-[#725927] mb-1 block">
                                        Ismingiz
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="Masalan: Ibrohim Aliyev"
                                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#f5eace] border text-sm text-[#443a29] placeholder:text-[#a0937d] outline-none transition-colors focus:border-[#A08141] ${
                                            errors.name ? 'border-red-400' : 'border-[#A08141]/30'
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Telefon */}
                                <div>
                                    <label className="text-xs font-semibold text-[#725927] mb-1 block">
                                        Telefon raqami
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.phone || '+998'}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder="+998 90 123 45 67"
                                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#f5eace] border text-sm text-[#443a29] placeholder:text-[#a0937d] outline-none transition-colors focus:border-[#A08141] ${
                                            errors.phone ? 'border-red-400' : 'border-[#A08141]/30'
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Karta turi */}
                                <div>
                                    <label className="text-xs font-semibold text-[#725927] mb-1 block">
                                        To'lov karta turi
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {CARD_TYPES.map((c) => (
                                            <button
                                                type="button"
                                                key={c.id}
                                                onClick={() => handleChange('cardType', c.id)}
                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                                                    form.cardType === c.id
                                                        ? 'bg-[#A08141] text-white border-[#A08141] shadow-md'
                                                        : 'bg-[#f5eace] text-[#665c49] border-[#A08141]/20 hover:border-[#A08141]/60'
                                                }`}
                                            >
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full"
                                                    style={{ backgroundColor: form.cardType === c.id ? '#fff' : c.color }}
                                                />
                                                {c.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.cardType && (
                                        <p className="text-[11px] text-red-500 mt-1">{errors.cardType}</p>
                                    )}
                                </div>

                                {/* Karta raqami */}
                                <div>
                                    <label className="text-xs font-semibold text-[#725927] mb-1 block">
                                        Karta raqami
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={form.cardNumber}
                                        onChange={(e) => handleChange('cardNumber', e.target.value)}
                                        placeholder="0000 0000 0000 0000"
                                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#f5eace] border text-sm text-[#443a29] placeholder:text-[#a0937d] outline-none tracking-wider transition-colors focus:border-[#A08141] ${
                                            errors.cardNumber ? 'border-red-400' : 'border-[#A08141]/30'
                                        }`}
                                    />
                                    {errors.cardNumber && (
                                        <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>
                                    )}
                                </div>

                                {/* Manzil */}
                                <div>
                                    <label className="text-xs font-semibold text-[#725927] mb-1 block">
                                        Yetkazib berish manzili
                                    </label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                        placeholder="Shahar, tuman, ko'cha, uy raqami"
                                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#f5eace] border text-sm text-[#443a29] placeholder:text-[#a0937d] outline-none transition-colors focus:border-[#A08141] ${
                                            errors.address ? 'border-red-400' : 'border-[#A08141]/30'
                                        }`}
                                    />
                                    {errors.address && (
                                        <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                                    )}
                                </div>

                                {/* Izoh (ixtiyoriy) */}
                                <div>
                                    <label className="text-xs font-semibold text-[#725927] mb-1 block">
                                        Izoh <span className="text-[#a0937d] font-normal">(ixtiyoriy)</span>
                                    </label>
                                    <textarea
                                        value={form.note}
                                        onChange={(e) => handleChange('note', e.target.value)}
                                        placeholder="Qo'shimcha izoh, masalan: achchiq bo'lmasin"
                                        rows={2}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5eace] border border-[#A08141]/30 text-sm text-[#443a29] placeholder:text-[#a0937d] outline-none resize-none focus:border-[#A08141] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#A08141]/30 mt-6 pt-4">
                                <div>
                                    <div className="text-[11px] text-[#8c7b5b] font-bold">JAMI TO'LOV</div>
                                    <div className="text-2xl font-extrabold text-[#d9381e]">
                                        {totalSum.toLocaleString()} so'm
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleConfirmOrder}
                                    className="px-6 py-2.5 bg-[#A08141] hover:bg-[#886d34] text-white rounded-xl font-bold text-sm shadow-md transition-colors"
                                >
                                    Buyurtmani tasdiqlash
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BuyPage;