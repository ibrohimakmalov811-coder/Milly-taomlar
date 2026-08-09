'use client';

import Navbar from '@/components/Navbar';
import { useBoughtStore } from '@/store/BoughtProducts';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

const BuyPage = () => {
    const boughtProducts = useBoughtStore((state) => state.boughtProducts);
    const toggleShop = useBoughtStore((state) => state.toggleShop);
    const clearCart = useBoughtStore((state) => state.clearCart);
    const router = useRouter();

    // Ant Design message uchun hook
    const [messageApi, contextHolder] = message.useMessage();

    const handleBack = () => {
        // 1. Savatda mahsulot bor-yo'qligini tekshiruv
        if (boughtProducts.length === 0) {
            messageApi.open({
                type: 'warning',
                content: "Savatingiz bo'sh!",
            });
            return;
        }

        // 2. Ant Design muvaffaqiyatli xabarini ko'rsatish
        messageApi.open({
            type: 'success',
            content: "Buyurtma muvaffaqiyatli amalga oshirildi! 😁",
            duration: 2, // Xabar 2 soniya ko'rinib turadi
        });

        // 3. Zustand store'ni tozalash va sahifaga yo'naltirish
        setTimeout(() => {
            clearCart();
            router.push('/');
        }, 1200); // Bildirishnoma o'qilishi uchun biroz kechikish
    };

    const totalSum = boughtProducts.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="p-5 md:p-10 max-w-[1000px] mx-auto min-h-screen text-gray-800">
            {/* Ant Design contextHolder - pop-up xabar ko'rinishi uchun shart */}
            {contextHolder}

            <Navbar />
            <h1 className="text-3xl font-bold text-[#725927] mt-30 text-center mb-6">Xaridlaringiz</h1>

            {boughtProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    Savatingiz hozircha bo'sh.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {boughtProducts.map((item) => (
                        <div
                            key={item.id}
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

                    <div className="mt-6 p-4 bg-[#f5eace] rounded-xl flex items-center justify-between border border-[#A08141]/40">
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

                            {/* Ant Design Message chaqiruvchi tugma */}
                            {contextHolder}
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 bg-[#A08141] hover:bg-[#886d34] text-white rounded-xl font-semibold text-sm transition-colors shadow-md cursor-pointer active:scale-95 duration-150"
                            >
                                Xaridni rasmiylashtirish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyPage;