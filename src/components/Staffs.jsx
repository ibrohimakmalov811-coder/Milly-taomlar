import React from 'react'
import { chefs } from './chefs'

const Staffs = () => {
    return (
        <div id="staff">
            <div className="staffs-section py-16 sm:py-20 md:py-[100px] px-4">
                <div className="container mx-auto">

                    {/* Sarlavha */}
                    <h2
                        data-aos='zoom-in'
                        data-aos-delay='200'
                        className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-[#4B352A]"
                    >
                        Bizning Oshpazlarimiz
                    </h2>

                    {/* Oshpazlar kartochkalari to'plami */}
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

                                            <button className="block w-full mt-5 py-3.5 rounded-xl font-bold text-[15px] text-[#2c1810] cursor-pointer
                                               bg-gradient-to-br from-[#f5d77f] to-[#c59b27]
                                               shadow-[0_4px_15px_rgba(197,155,39,0.35)]
                                               transition-all duration-300
                                               hover:from-[#ffe599] hover:to-[#d4af37]
                                               hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] active:scale-95">
                                                Oshpazni band etish
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Staffs