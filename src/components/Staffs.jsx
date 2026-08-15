'use client'

import React, { useState } from 'react'
import { chefs } from './chefs'

// Har bir oshpaz uchun qo'shimcha, qiziqarli ma'lumotlar (namunaviy matnlar)
const chefExtras = [
    {
        specialty: "Milliy taomlar ustasi",
        bio: "Yoshligidan oshxonaga bo'lgan ishtiyoq bilan o'sgan, an'anaviy retseptlarni zamonaviy taqdimot bilan uyg'unlashtiradi.",
        achievements: ["\"Yilning eng yaxshi oshpazi\" nominatsiyasi g'olibi", "3 xalqaro gastronomiya festivalida ishtirok etgan"],
        signatureDish: "Osh va Norin"
    },
    {
        specialty: "Grill va kabob mutaxassisi",
        bio: "10 yildan ortiq tajribasi davomida o't ustida pishirish san'atini mukammal darajaga yetkazgan.",
        achievements: ["Mintaqaviy oshxona chempionatida kumush medal", "50 dan ortiq shogird tayyorlagan"],
        signatureDish: "Mangalda pishirilgan lyulya-kabob"
    },
    {
        specialty: "Shirinliklar va desert ustasi",
        bio: "Fransuz va o'zbek shirinlik an'analarini birlashtirib, mehmonlarni har safar hayratda qoldiradi.",
        achievements: ["Xalqaro pazandachilik akademiyasini tamomlagan", "O'z retseptiga ega desert liniyasi muallifi"],
        signatureDish: "Pista bilan pishirilgan halva tort"
    },
    {
        specialty: "Sho'rva va dam olish taomlari",
        bio: "Har bir taomga ona uyining iliqligini qo'shishga harakat qiladi, bu uning eng katta mahorati.",
        achievements: ["Oilaviy retseptlar to'plami muallifi", "Mahalliy oshxona tanlovida finalist"],
        signatureDish: "Mastava va Shurpa"
    },
    {
        specialty: "Fusion oshxona ustasi",
        bio: "Sharq va G'arb pazandachiligini uyg'unlashtirib, mutlaqo yangi ta'm uyg'unliklarini yaratadi.",
        achievements: ["Zamonaviy oshxona bo'yicha master-klasslar o'tkazgan", "Gastro-blog muallifi"],
        signatureDish: "Osh-risotto uyg'unligi"
    },
    {
        specialty: "Non va xamir mahsulotlari ustasi",
        bio: "Har kuni tongda yangi non yopish bilan kunni boshlaydi va bu jarayonni haqiqiy san'at deb biladi.",
        achievements: ["An'anaviy tandir texnologiyasi bo'yicha ekspert", "Nafis xamir mahsulotlari uchun mashhur"],
        signatureDish: "Tandir non va Samsa"
    }
]

const getChefExtra = (index) => chefExtras[index % chefExtras.length]

const Staffs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedChef, setSelectedChef] = useState(null)

    const handleOpenModal = (chef, index) => {
        setSelectedChef({ ...chef, extra: getChefExtra(index) })
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div id="staff">
            <div className="staffs-section py-16 sm:py-20 md:py-[100px] px-4">
                <div className="container mx-auto">

                    <h2
                        data-aos='zoom-in'
                        data-aos-delay='200'
                        className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-[#4B352A]"
                    >
                        Bizning Oshpazlarimiz
                    </h2>

                    <div className="staffs py-10 sm:py-[60px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
                            {
                                chefs?.map((chef, index) => (
                                    <div
                                        key={chef.id}
                                        data-aos='fade-up'
                                        data-aos-delay={index * 100}
                                        className='w-full max-w-sm rounded-3xl p-4 bg-gradient-to-b from-[#fdf6e3] to-[#f5e6c8] shadow-[0_15px_35px_rgba(212,175,55,0.25)] overflow-hidden transition-all duration-300 hover:-translate-y-2'
                                    >
                                        <div className="overflow-hidden rounded-2xl border-[3px] border-[#d4af37] aspect-square">
                                            <img className='w-full h-full object-cover' src={chef.image} alt={`${chef.firstName} ${chef.lastName}`} />
                                        </div>

                                        <div className="mt-4 px-1.5">
                                            <h3 className="text-xl sm:text-2xl font-bold text-[#2c1810] mb-3">
                                                {chef.firstName} {chef.lastName}
                                            </h3>

                                            <p className="text-[15px] leading-relaxed my-2">
                                                <span className="text-[#d97706] font-semibold">Yoshi:</span>
                                                <span className="text-gray-600"> {chef.age} </span>
                                            </p>

                                            <p className="text-[15px] leading-relaxed my-2">
                                                <span className="text-[#d97706] font-semibold">Tajribasi:</span>
                                                <span className="text-gray-600"> {chef.experience}</span>
                                            </p>

                                            <p className="text-[15px] leading-relaxed my-2 flex items-center gap-1">
                                                <span className="text-[#d97706] font-semibold">Reytingi:</span>
                                                <span className="text-amber-400">⭐️</span>
                                                <span className="text-gray-600"> {chef.rating}</span>
                                            </p>

                                            <button
                                                onClick={() => handleOpenModal(chef, index)}
                                                className="block w-full mt-5 py-3.5 rounded-xl font-bold text-[15px] text-[#2c1810] cursor-pointer bg-gradient-to-br from-[#f5d77f] to-[#c59b27] shadow-[0_4px_15px_rgba(197,155,39,0.35)] transition-all duration-300 hover:from-[#ffe599] hover:to-[#d4af37] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] active:scale-95">
                                                Batafsil
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>

            {/* Batafsil ma'lumot modali */}
            {isModalOpen && selectedChef && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 bg-[#2C1E11]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white border border-[#E2D8C3] rounded-3xl max-w-[600px] w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 z-10 text-white bg-black/30 hover:bg-black/50 text-xl w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                        >
                            ✕
                        </button>

                        <div className="w-full h-[260px] overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src={selectedChef.image}
                                alt={`${selectedChef.firstName} ${selectedChef.lastName}`}
                            />
                        </div>

                        <div className="p-6 md:p-8">
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1E11] mb-1">
                                {selectedChef.firstName} {selectedChef.lastName}
                            </h3>
                            <p className="text-[#B2935B] font-semibold text-sm mb-5">
                                {selectedChef.extra.specialty}
                            </p>

                            <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-dashed border-[#E2D8C3]">
                                <div className="text-center">
                                    <p className="text-xs text-[#7A6A58] mb-1">Yoshi</p>
                                    <p className="text-lg font-bold text-[#2C1E11]">{selectedChef.age}</p>
                                </div>
                                <div className="text-center border-x border-dashed border-[#E2D8C3]">
                                    <p className="text-xs text-[#7A6A58] mb-1">Tajribasi</p>
                                    <p className="text-lg font-bold text-[#2C1E11]">{selectedChef.experience}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-[#7A6A58] mb-1">Reytingi</p>
                                    <p className="text-lg font-bold text-[#2C1E11]">⭐ {selectedChef.rating}</p>
                                </div>
                            </div>

                            <div className="mb-5">
                                <h4 className="text-sm font-semibold text-[#4A3525] mb-2">Haqida</h4>
                                <p className="text-[15px] leading-relaxed text-gray-600">
                                    {selectedChef.extra.bio}
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4 className="text-sm font-semibold text-[#4A3525] mb-2">Mashhur taomi</h4>
                                <p className="text-[15px] leading-relaxed text-gray-600">
                                    {selectedChef.extra.signatureDish}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-[#4A3525] mb-2">Yutuqlari</h4>
                                <ul className="space-y-1.5">
                                    {selectedChef.extra.achievements.map((item, i) => (
                                        <li key={i} className="text-[15px] text-gray-600 flex items-start gap-2">
                                            <span className="text-[#B2935B] mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={handleCloseModal}
                                className="w-full mt-7 py-3.5 rounded-xl font-bold text-[15px] text-[#2c1810] cursor-pointer bg-gradient-to-br from-[#f5d77f] to-[#c59b27] shadow-[0_4px_15px_rgba(197,155,39,0.35)] transition-all duration-300 hover:from-[#ffe599] hover:to-[#d4af37] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] active:scale-95">
                                Yopish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Staffs