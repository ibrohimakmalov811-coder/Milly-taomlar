'use client'
import React, { useEffect, useRef, useState } from "react";
import {
    FaAward,
    FaUsers,
    FaLeaf,
    FaMedal,
} from "react-icons/fa";
import { GiCook, GiHotMeal, GiMeal } from "react-icons/gi";

const FEATURES = [
    { icon: GiHotMeal, label: "Milliy retseptlar" },
    { icon: GiCook, label: "Tajribali oshpazlar" },
    { icon: GiMeal, label: "An'anaviy ta'm" },
];

const STATS = [
    { icon: FaAward, value: "35+", label: "Yillik tajriba" },
    { icon: FaUsers, value: "50 000+", label: "Mamnun mehmonlar" },
    { icon: FaLeaf, value: "120+", label: "Milliy taom retseptlari" },
];

function useReveal(threshold = 0.2) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children }) {
    const [ref, visible] = useReveal();
    return (
        <Tag
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
}

export default function About() {
    return (
        <section className="about-section min-h-screen w-ful bg-[#F4EBDD] px-6 py-20 md:px-12 lg:px-20">
            <Reveal className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#D4A72C]" />
                    <span className="text-sm font-semibold tracking-[0.35em] text-[#D4A72C] uppercase">
                        Biz haqimizda
                    </span>
                    <span className="h-px w-8 bg-[#D4A72C]" />
                </div>

                <h2 className="mt-4 font-serif text-4xl font-bold text-[#4B352A] md:text-5xl lg:text-6xl">
                    O'zbek Milliy Taomlari
                </h2>

                <div className="mt-5 flex items-center gap-2">
                    <span className="h-[2px] w-10 rounded-full bg-[#D4A72C]" />
                    <span className="h-2 w-2 rotate-45 bg-[#D4A72C]" />
                    <span className="h-[2px] w-10 rounded-full bg-[#D4A72C]" />
                </div>
            </Reveal>

            <div className="mt-16 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
                {/* ---------- Left: text ---------- */}
                <Reveal delay={100} className="w-full lg:w-1/2">
                    <div className="space-y-6 text-[17px] leading-relaxed text-[#2F2F2F]">
                        <p>
                            Biz <span className="font-bold text-[#4B352A]">1990-yilda</span>{" "}
                            tashkil etilganmiz va bugungi kungacha{" "}
                            <span className="font-bold text-[#D4A72C]">
                                O'zbek milliy taomlarining asl ta'mini
                            </span>{" "}
                            saqlab kelmoqdamiz.
                        </p>

                        <p>
                            Bizning oshxonamizda{" "}
                            <span className="font-bold text-[#4B352A]">
                                35 yildan ortiq tajribaga ega
                            </span>{" "}
                            mohir oshpazlar faoliyat yuritadi. Har bir taom qadimiy
                            retseptlar asosida, zamonaviy gigiyena talablari asosida
                            tayyorlanadi.
                        </p>

                        <div className="rounded-2xl border border-[#D4A72C]/30 bg-[#D4A72C]/5 p-5">
                            <p>
                                Bizning asoschimiz — usta oshpaz{" "}
                                <span className="font-bold text-[#4B352A]">
                                    Abdulaziz Rahmonov
                                </span>{" "}
                                1990-yilda ushbu maskanga asos solgan. Uning maqsadi O'zbek
                                milliy taomlarini yosh avlodga yetkazish va xorijlik
                                mehmonlarga haqiqiy o'zbek mehmondo'stligini namoyish etish
                                edi.
                            </p>
                            <p className="mt-3">
                                Bugungi kunda restoran uning shogirdi{" "}
                                <span className="font-bold text-[#4B352A]">
                                    Jamshid Qodirov
                                </span>{" "}
                                rahbarligida faoliyat yuritmoqda. Jamshid Qodirov milliy
                                oshxona an'analarini saqlab qolish bilan birga zamonaviy
                                xizmat ko'rsatish tizimini ham yo'lga qo'ygan.
                            </p>
                        </div>

                        <p>
                            Biz uchun{" "}
                            <span className="font-bold text-[#4B352A]">
                                har bir mehmon oilamizning bir a'zosi
                            </span>{" "}
                            hisoblanadi. Shuning uchun har kuni eng sifatli mahsulotlar
                            tanlanadi. Har bir taom mehr bilan tayyorlanadi.
                        </p>

                        <p>
                            Bizning maqsadimiz nafaqat mazali ovqat tayyorlash, balki{" "}
                            <span className="font-bold text-[#D4A72C]">
                                O'zbek xalqining mehmondo'stligini
                            </span>{" "}
                            his qildirishdir.
                        </p>
                    </div>
                </Reveal>

                {/* ---------- Right: image + feature cards ---------- */}
                <Reveal delay={200} className="w-full lg:w-1/2">
                    <div className="group relative overflow-hidden rounded-3xl border-2 border-[#D4A72C]/40 shadow-xl shadow-[#4B352A]/10">
                        <img
                            src="/about-image.png"
                            alt="Eski O'zbek milliy choyxonasi — yog'och ustunlar, milliy naqshlar, supada dasturxon atrofida choy va osh ichayotgan qariyalar, orqa fonda tandir va samovar"
                            className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[420px]"
                        />
                    </div>

                    {/* feature cards */}
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {FEATURES.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center gap-2 rounded-xl border border-[#D4A72C]/25 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <Icon className="text-2xl text-[#D4A72C]" />
                                <span className="text-sm font-semibold text-[#4B352A]">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* ---------- Stats ---------- */}
            <Reveal delay={300} className="mt-20">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {STATS.map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="group relative flex flex-col items-center gap-3 rounded-2xl border-2 border-[#D4A72C]/30 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#D4A72C] hover:shadow-xl"
                        >
                            <Icon className="text-3xl text-[#D4A72C] transition-transform duration-300 group-hover:scale-110" />
                            <span className="font-serif text-4xl font-bold text-[#4B352A] md:text-5xl">
                                {value}
                            </span>
                            <span className="text-sm font-medium tracking-wide text-[#666666] uppercase">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}