"use client";
import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    // Custom Toast Alert holati (type: 'success' | 'error')
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // Toast ko'rsatish funksiyasi
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 4000); // 4 soniyadan so'ng avtomatik yo'qoladi
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
                
            if (res.ok) {
                // Standart alert o'rniga chiroyli toast
                showToast(`Rahmat, ${formData.name}! Xabaringiz Telegram botga yuborildi. Tez orada bog'lanamiz.`, 'success');
                setFormData({ name: '', phone: '', message: '' });
            } else {
                showToast(data.error || "Xatolik yuz berdi, qaytadan urinib ko'ring.", 'error');
            }
        } catch (error) {
            console.error(error);
            showToast("Internet bilan aloqani tekshiring.", 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='container mx-auto relative'>
            <h2 className="text-center text-[#725927] mt-15 text-3xl md:text-5xl font-bold drop-shadow-sm">
                Aloqaga Chiqish
            </h2>
            <div className='min-h-[70vh] pt-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">

                    {/* Chap taraf: Milliy taklif va ma'lumotlar */}
                    <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white p-8 flex flex-col justify-between">
                        <div>
                            <span className="text-amber-300 text-sm font-semibold tracking-widest uppercase">
                                Oshingiz halol bo'lsin!
                            </span>
                            <h2 className="text-3xl font-bold mt-2 font-serif">
                                Milliy Taomlar
                            </h2>
                            <p className="mt-4 text-amber-100 text-sm leading-relaxed">
                                Aziz mehmon, fikr-mulohazalaringiz yoki maxsus buyurtmalaringiz bo'lsa,
                                bizga xabar qoldiring. Dasturxoningiz har doim to'kin bo'lsin!
                            </p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📍</span>
                                <p className="text-sm text-amber-100">Toshkent sh., Chorsu maydoni, 7-uy</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📞</span>
                                <p className="text-sm text-amber-100">+998 (90) 123-45-67</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">⏰</span>
                                <p className="text-sm text-amber-100">Har kuni: 08:00 - 23:00</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-amber-600/50 text-center text-amber-200 text-xs italic">
                            "Mehmonsiz uy — barakasiz hovli."
                        </div>
                    </div>

                    {/* O'ng taraf: Forma */}
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-stone-800 mb-2 font-serif">
                            Bizga xabar yo'llang
                        </h3>
                        <p className="text-stone-500 text-sm mb-6">
                            Savollaringiz bo'lsa, formani to'ldiring. Siz bilan tezda bog'lanamiz.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Ismingiz
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Masalan: Ali Valiyev"
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-stone-800"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Telefon raqamingiz
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+998 90 123 45 67"
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-stone-800"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Xabaringiz yoki Buyurtmangiz
                                </label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Qanday taomlar yoki xizmatlarimiz sizni qiziqtirmoqda?..."
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-stone-800 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>{loading ? "Yuborilmoqda..." : "Xabarni yuborish"}</span>
                                <span>☕</span>
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* CHIROYLI CUSTOM ALERT / TOAST (Pastki o'ng burchakda) */}
            {toast.show && (
                <div
                    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border transition-all duration-300 ${
                        toast.type === 'success'
                            ? 'bg-[#2C1810] text-white border-[#D4AF37]/60'
                            : 'bg-red-950 text-white border-red-500/60'
                    }`}
                >
                    <span className="text-xl">
                        {toast.type === 'success' ? '✅' : '⚠️'}
                    </span>
                    <p className="text-xs sm:text-sm font-medium max-w-xs sm:max-w-sm">
                        {toast.message}
                    </p>
                    <button
                        onClick={() => setToast({ show: false, message: '', type: 'success' })}
                        className="ml-2 text-stone-400 hover:text-white text-xs font-bold p-1 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            )}
        </section>
    );
}