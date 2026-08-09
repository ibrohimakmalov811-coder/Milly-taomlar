import React from 'react'

const Service = () => {
    const services = [
        { id: 1, title: "🍴 Milliy Taomlar", description: "An'anaviy retseptlar asosida tayyorlangan mazali taomlar." },
        { id: 2, title: "🚚 Tez Yetkazish", description: "30–60 daqiqa ichida eshigingizgacha." },
        { id: 3, title: "👨‍🍳 Professional Oshpazlar", description: "Mahoratli va tajribali oshpazlar xizmati." },
        { id: 4, title: "🎉 Catering", description: "To'y, bayram va tadbirlar uchun xizmat." },
        { id: 5, title: "📦 Maxsus Buyurtma", description: "Oilaviy va korporativ buyurtmalar." },
        { id: 6, title: "⭐️ 100% Sifat", description: "Tabiiy mahsulotlar va yuqori sifat kafolati." },
    ]

    return (
        <div id="service">
            <div className="services py-16 sm:py-20 md:py-[100px] px-4">
                <div className="container mx-auto">
                    
                    {/* Sarlavha */}
                    <h2 
                        data-aos='zoom-in' 
                        data-aos-delay='200' 
                        className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-[#4B352A]"
                    >
                        Bizning Xizmatlarimiz
                    </h2>

                    {/* Kartochkalar to'plami */}
                    <div className="services grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-10 sm:pt-16">
                        {
                            services?.map((service, index) => (
                                <div
                                    key={service.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="group border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 bg-white transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF5] cursor-pointer"
                                >
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#AA771C] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Service