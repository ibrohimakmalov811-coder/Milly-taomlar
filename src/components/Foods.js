export const foods = [
  {
    id: 1, category: "Milliy Taom", title: "O'zbekcha Osh (Plov)", price: 44000, oldPrice: "55,000 so'm",
    desc: "O'zbekistonning eng mashhur milliy taomi. Guruch, go'sht, sabzi va piyozdan tayyorlanadi.",
    time: "2 soat", portion: "6-8 kishi", level: "O'rta", rating: "4.9 (120+)",
    img: "https://odam.uz/upload/media/entries/2019-11/22/2132-entry-0-1574410996.jpg",
    ingredients: ["1 kg qo'y go'shti", "1 kg guruch (devzira)", "1 kg sabzi", "300 g piyoz"],
    addonsTitle: "🥗 Salatlar va Ichimliklar",
    addons: [
      { name: "Achichuk salati", price: 10000 },
      { name: "Suzma / Qatiq", price: 12000 },
      { name: "Meva sharbati (1L)", price: 15000 },
      { name: "Ko'k / Qora choy", price: 8000 }
    ]
  },
  {
    id: 2, category: "Xamir Taom", title: "Manti (Go'shtli)", price: 38000, oldPrice: "45,000 so'm",
    desc: "Yupqa xamir ichiga to'g'ralgan sersuv go'sht va piyoz solib, bug'da pishirilgan taom.",
    time: "50 min", portion: "4 kishi", level: "O'rta", rating: "4.8 (95+)",
    img: "https://tavsiyalar.uz/wp-content/uploads/2022/01/manti-tayyorlash-retsepti-ketma-ketligi.jpg",
    ingredients: ["500g qo'y go'shti", "400g xamir", "400g piyoz", "Ziravorlar"],
    addonsTitle: "🥗 Salatlar va Qatiq",
    addons: [
      { name: "Smetana / Qatiq", price: 8000 },
      { name: "Murchli Achichuk", price: 10000 },
      { name: "Mors / Sharbat", price: 12000 }
    ]
  },
  {
    id: 3, category: "Tandir Taom", title: "Tandir Somsa", price: 12000, oldPrice: "15,000 so'm",
    desc: "Qatlama xamirdan tandirda pishirilgan, ichi sersuv va xushbo'y go'shtli somsa.",
    time: "35 min", portion: "1-2 kishi", level: "Oson", rating: "4.9 (200+)",
    img: "https://uzbekistan.travel/storage/app/media/nargiza/cropped-images/somsa-0-0-0-0-1588923963.jpg",
    ingredients: ["Qatlama xamir", "Mol go'shti", "Piyoz", "Kunjut & Zira"],
    addonsTitle: "🍅 Souslar va Choy",
    addons: [
      { name: "Achchiq Tomat Sousi", price: 5000 },
      { name: "Sirkali Piyoz", price: 4000 },
      { name: "Limonli Ko'k Choy", price: 8000 }
    ]
  },
  {
    id: 4, category: "Kabab", title: "Qiyqim Shashlik", price: 16000, oldPrice: "20,000 so'm",
    desc: "Ko'mir cho'g'ida pishirilgan yumshoq qo'y go'shti va dumba shashligi.",
    time: "25 min", portion: "1 kishi", level: "Oson", rating: "4.7 (80+)",
    img: "https://dostavo4ka.uz/upload-file/2021/07/05/6224/750x750-7604ac10-76ba-4b9f-9eeb-851a843e8ae8.jpg",
    ingredients: ["Qo'y go'shti", "Dumba", "Piyoz", "Maxsus marinad"],
    addonsTitle: "🌶 Souslar va Piyoz",
    addons: [
      { name: "To'g'ralgan Sirkali Piyoz", price: 4000 },
      { name: "Shashlik Sousi (Tomat)", price: 5000 },
      { name: "Peta non", price: 6000 },
      { name: "Coca-Cola (0.5L)", price: 9000 }
    ]
  },
  {
    id: 5, category: "Xamir Taom", title: "Quyuq Lag'mon", price: 40000, oldPrice: "48,000 so'm",
    desc: "Qo'lda cho'zilgan xamir va mazali go'shtli-sabzavotli say bilan uzatiladi.",
    time: "45 min", portion: "2 kishi", level: "Qiyin", rating: "4.8 (110+)",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNUmdz_3nwdu7Z116Kef3dQU4pdPW9Y0dBEBUzr_RoZGy0R_BDtwFS0I&s=10",
    ingredients: ["Cho'zma xamir", "Mol go'shti", "Sabzavotlar", "Ziravorlar"],
    addonsTitle: "🌶 Lazjan va Ichimliklar",
    addons: [
      { name: "Lazjan (Achchiq yog')", price: 4000 },
      { name: "Choy (Ko'k/Qora)", price: 8000 },
      { name: "Achichuk salat", price: 10000 }
    ]
  },
  {
    id: 6, category: "Milliy Taom", title: "Toshkent Norini", price: 42000, oldPrice: "50,000 so'm",
    desc: "Mayda to'g'ralgan pishirilgan xamir va ot go'shti (qazi) aralashmasi.",
    time: "1.5 soat", portion: "2-3 kishi", level: "Qiyin", rating: "4.9 (75+)",
    img: "https://avatars.mds.yandex.net/get-altay/13220791/2a000001958c2808f46470a4f11b5ecace24/L_height",
    ingredients: ["Yupqa xamir", "Ot go'shti", "Qazi", "Murch va Bulyon"],
    addonsTitle: "🥣 Sho'rva va Salatlar",
    addons: [
      { name: "Issiq Bulyon (Kosada)", price: 6000 },
      { name: "Qazi bo'lagi (Ekstra)", price: 15000 },
      { name: "Limonli Choy", price: 8000 }
    ]
  },
  {
    id: 7, category: "Delikates", title: "Uy Qazisi (1 Porsiya)", price: 35000, oldPrice: "40,000 so'm",
    desc: "Maxsus ziravorlar bilan boyitilgan, pishirilgan ot go'shti va yog'i.",
    time: "2 soat", portion: "1-2 kishi", level: "O'rta", rating: "5.0 (60+)",
    img: "https://i.ytimg.com/vi/D8PRG16EFZg/sddefault.jpg",
    ingredients: ["Ot go'shti", "Ot yog'i", "Zira va Murch", "Sarimsoq"],
    addonsTitle: "🥗 Qo'shimcha Garneerlar",
    addons: [
      { name: "Sirkali Piyoz", price: 4000 },
      { name: "Yangi Yopgan Non", price: 7000 },
      { name: "Meva Sharbati", price: 12000 }
    ]
  },
  {
    id: 8, category: "Sho'rva", title: "Chuchvara Sho'rva", price: 32000, oldPrice: "38,000 so'm",
    desc: "Mitti go'shtli tugunchalar va xushbo'y bulyon bilan tortiladigan issiq taom.",
    time: "30 min", portion: "1 kishi", level: "O'rta", rating: "4.6 (90+)",
    img: "https://i.ytimg.com/vi/W7moXoRQ-1w/sddefault.jpg",
    ingredients: ["Mitti chuchvara", "Tiniq bulyon", "Ko'katlar", "Piyoz"],
    addonsTitle: "🥛 Kaymak va Salatlar",
    addons: [
      { name: "Katta Qatiq / Smetana", price: 7000 },
      { name: "Yangi Ko'katlar to'plami", price: 5000 },
      { name: "Non", price: 6000 }
    ]
  },
  {
    id: 9, category: "Parranda", title: "Tok Osh (Dolma)", price: 36000, oldPrice: "42,000 so'm",
    desc: "Uzum bargiga tugilgan qiyma va sabzavotlar bilan tayyorlanadigan delikates.",
    time: "1 soat", portion: "2 kishi", level: "O'rta", rating: "4.8 (50+)",
    img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Uzum barglari", "Qo'y qiymasi", "Guruch", "Piyoz va Sariyog'"],
    addonsTitle: "🥣 Sous va Qatiq",
    addons: [
      { name: "Sarimsoqli Qatiq", price: 8000 },
      { name: "Sariyog'li Sous", price: 6000 },
      { name: "Ko'k Choy", price: 8000 }
    ]
  },
  {
    id: 10, category: "Tovuq Taom", title: "Jo'ja Tabaka", price: 45000, oldPrice: "52,000 so'm",
    desc: "Sariyog'da qisirlatib qovurilgan butun tovuq go'shti, sarimsoqli sous bilan.",
    time: "40 min", portion: "2 kishi", level: "Oson", rating: "4.7 (105+)",
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Butun jo'ja", "Sarimsoq sousi", "Sariyog'", "Paprika"],
    addonsTitle: "🍟 Garneer va Souslar",
    addons: [
      { name: "Kartoshka Fri", price: 15000 },
      { name: "Sarimsoqli Mayonez", price: 5000 },
      { name: "Pepsi (1L)", price: 14000 }
    ]
  },
  {
    id: 11, category: "Qovurma", title: "Qozon Kabob (Qo'y go'shti)", price: 58000, oldPrice: "68,000 so'm",
    desc: "Qozonda oltin rangga kirguncha qovurilgan yumshoq qo'y go'shti va qarsillama kartoshka.",
    time: "50 min", portion: "2 kishi", level: "O'rta", rating: "5.0 (320+)",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLlHrSpXVkb51LTvIPb2h6nj37UYe0alJWH6Fb-pmiSS0Jg6rFpCWwrGV&s=100",
    ingredients: ["Qo'y qovurg'asi", "Kartoshka", "Zira", "O'simlik yog'i"],
    addonsTitle: "🥗 Salatlar va Non",
    addons: [
      { name: "Achichuk salati", price: 10000 },
      { name: "Patir non", price: 8000 },
      { name: "Coca-Cola (1.5L)", price: 16000 }
    ]
  },
  {
    id: 12, category: "Kabab", title: "Lula shashlik", price: 18000, oldPrice: "22,000 so'm",
    desc: "Yumshoq qiymadan ko'mir cho'g'ida pishirilgan va sirkali piyoz bilan tortiladigan shashlik.",
    time: "20 min", portion: "1 kishi", level: "Oson", rating: "4.9 (210+)",
    img: "https://thumbs.dreamstime.com/b/none-158253748.jpg",
    ingredients: ["Qo'y va mol qiymasi", "Dumba", "Piyoz", "Ziravorlar"],
    addonsTitle: "🌶 Sous va Piyoz",
    addons: [
      { name: "Sirkali piyoz", price: 4000 },
      { name: "Tomat sousi", price: 5000 },
      { name: "Yangi tandir non", price: 7000 }
    ]
  },
  {
    id: 13, category: "Kabab", title: "Jigar Shashlik", price: 16000, oldPrice: "19,000 so'm",
    desc: "Mol jigari va sersuv dumba yog'i bilan navbatma-navbat terilib pishirilgan shashlik.",
    time: "15 min", portion: "1 kishi", level: "Oson", rating: "4.8 (140+)",
    img: "https://www.centralasia-travel.com/uploads/gallery/499/shashlik-05.jpg",
    ingredients: ["Mol jigari", "Dumba yog'i", "Zira", "Piyoz"],
    addonsTitle: "🍋 Piyoz va Choy",
    addons: [
      { name: "Sirkali piyoz", price: 4000 },
      { name: "Ko'k choy", price: 8000 }
    ]
  },
  {
    id: 14, category: "Milliy Taom", title: "Choyxona Oshi (Qora osh)", price: 46000, oldPrice: "55,000 so'm",
    desc: "Erkaklar choyxonasiga mos, ziravorlarga boy, sersuv va o'tkir ta'mli maxsus osh.",
    time: "2 soat", portion: "6-8 kishi", level: "Qiyin", rating: "5.0 (450+)",
    img: "https://pbs.twimg.com/media/F7GINWyaUAAgFh3.jpg",
    ingredients: ["Devzira guruch", "Qo'y go'shti", "Sariq sabzi", "Sarmisoq va Qalampir"],
    addonsTitle: "🥗 Salatlar",
    addons: [
      { name: "Achichuk salati", price: 10000 },
      { name: "Suzma", price: 12000 },
      { name: "Qazi (bo'lak)", price: 15000 }
    ]
  },
  {
    id: 15, category: "Tandir Taom", title: "Tandir Go'sht (Qashqadaryo)", price: 68000, oldPrice: "80,000 so'm",
    desc: "Archa shoxlari hidi anqib turgan, tandirda dumlangan nihoyatda yumshoq go'sht.",
    time: "3 soat", portion: "1-2 kishi", level: "Qiyin", rating: "5.0 (500+)",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjJLos1h5uDCB09DNls-odfZZ-menmSV3Ttj8h5IxP143bB0KEWV01DBg&s=10",
    ingredients: ["Qo'y go'shti", "Archa shoxlari", "Murch", "Tuz"],
    addonsTitle: "🥗 Sirkali Piyoz va Non",
    addons: [
      { name: "Tandir non", price: 7000 },
      { name: "Sirkali piyoz", price: 4000 }
    ]
  },
  {
    id: 16, category: "Sho'rva", title: "Kozacha Qozon Sho'rva", price: 34000, oldPrice: "40,000 so'm",
    desc: "Kozachada sekin pishirilgan toza bulyonli, go'shtli va sabzavotli vitaminsimon sho'rva.",
    time: "1 soat", portion: "1 kishi", level: "O'rta", rating: "4.8 (110+)",
    img: "https://zira.uz/wp-content/uploads/2017/11/hiva-13-shurpa.jpg",
    ingredients: ["Qo'y qovurg'asi", "Kartoshka", "Sabzi", "Noxot"],
    addonsTitle: "🥛 Qo'shimchalar",
    addons: [
      { name: "Smetana / Qatiq", price: 6000 },
      { name: "Patir non", price: 8000 }
    ]
  },
  {
    id: 17, category: "Sho'rva", title: "Noxot Sharak", price: 36000, oldPrice: "42,000 so'm",
    desc: "Uzoq vaqt qaynatilgan noxot va yumshoq mol go'shtidan tayyorlangan Samarkandcha taom.",
    time: "2 soat", portion: "1 kishi", level: "O'rta", rating: "4.7 (90+)", img: "https://zira.uz/wp-content/uploads/2018/07/nohat-shorak-2.jpg",
    ingredients: ["Noxot", "Mol go'shti", "Piyoz", "Ziravorlar"],
    addonsTitle: "🥗 Piyoz va Non",
    addons: [
      { name: "Sirkali piyoz", price: 4000 },
      { name: "Yangi yopgan non", price: 7000 }
    ]
  },
  {
    id: 18, category: "Xamir Taom", title: "Qovurma Lag'mon", price: 39000, oldPrice: "45,000 so'm",
    desc: "Cho'zma xamir, go'sht va sabzavotlarning tovada baland otashda qovurilgan variant.",
    time: "30 min", portion: "1-2 kishi", level: "O'rta", rating: "4.8 (230+)",
    img: "https://makepedia.uz/wp-content/uploads/2018/10/qovurma-lagmon.jpg",
    ingredients: ["Cho'zma xamir", "Mol go'shti", "Tuxum", "Bulg'or qalampiri"],
    addonsTitle: "🌶 Lazjan",
    addons: [
      { name: "Lazjan achchiq sous", price: 4000 },
      { name: "Achichuk salat", price: 10000 }
    ]
  },
  {
    id: 19, category: "Kabab", title: "Oramacha Shashlik (Rulet)", price: 20000, oldPrice: "24,000 so'm",
    desc: "Yupqa mol go'shti va dumba yog'i rulet qilib o'ralib pishirilgan sersuv shashlik.",
    time: "25 min", portion: "1 kishi", level: "Oson", rating: "4.9 (180+)",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80https://cdn-ru20.foodpicasso.com/assets/2022/08/15/f9cc475e72dc2c231a0c7f7db8621349---jpeg_1000x_103c0_convert.jpeg",
    ingredients: ["Mol go'shti", "Dumba yog'i", "Zira va tuz"],
    addonsTitle: "🌶 Souslar",
    addons: [
      { name: "Tomat sous", price: 5000 },
      { name: "Sirkali piyoz", price: 4000 }
    ]
  },
  {
    id: 20, category: "Milliy Taom", title: "Beshbarmak", price: 58000, oldPrice: "68,000 so'm",
    desc: "Xamir, ot go'shti va qazining mayin qaynatmasi, ustiga quyuq piyozli kayla bilan.",
    time: "1.5 soat", portion: "2 kishi", level: "Qiyin", rating: "4.9 (160+)",
    img: "https://nutriscan.app/calories-nutrition/images/beshbarmak-876d1.webp",
    ingredients: ["Yupqa xamir", "Ot go'shti", "Qazi", "Piyoz bulyoni"],
    addonsTitle: "🥣 Bulyon",
    addons: [
      { name: "Sho'rva bulyoni (Kosa)", price: 6000 },
      { name: "Ko'k choy", price: 8000 }
    ]
  },
  {
    id: 21, category: "Sho'rva", title: "Mastava", price: 30000, oldPrice: "35,000 so'm",
    desc: "Guruch va to'g'ralgan go'sht-sabzavotlardan pishiriladigan quyuq va to'q tutuvchi sho'rva.",
    time: "40 min", portion: "1 kishi", level: "O'rta", rating: "4.7 (120+)",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy7As46jB-HUD8bIhDfRUiLM5SRlAUZPjY9YjGDth88As1cWZO-sDUqL8&s=10",
    ingredients: ["Guruch", "Mol go'shti", "Kartoshka", "Piyoz va Pomidor"],
    addonsTitle: "🥛 Qatiq va Non",
    addons: [
      { name: "Qatiq", price: 5000 },
      { name: "Tandir non", price: 6000 }
    ]
  },
  {
    id: 22, category: "Sho'rva", title: "Moshxorda", price: 29000, oldPrice: "34,000 so'm",
    desc: "Mosh, guruch va mol go'shtining an'anaviy aralashmasidan tayyorlanadigan milliy suyuq taom.",
    time: "45 min", portion: "1 kishi", level: "O'rta", rating: "4.6 (80+)",
    img: "https://sun9-87.userapi.com/impg/c837225/v837225269/a440/5-3RjmrzMFU.jpg?size=750x532&quality=96&sign=8ea6d86fb5d125e2d8c22858b2644b82&type=album",
    ingredients: ["Mosh", "Guruch", "Mol go'shti", "Qatiq"],
    addonsTitle: "🥛 Qatiq",
    addons: [
      { name: "Qatiq / Suzma", price: 6000 },
      { name: "Yangi non", price: 6000 }
    ]
  },
  {
    id: 23, category: "Qovurma", title: "Jiz-Biz (Qashqadaryocha)", price: 62000, oldPrice: "72,000 so'm",
    desc: "Qo'y go'shti va qovurg'alarining o'z yog'ida qarsillab qovurilgan ko'rinishi.",
    time: "40 min", portion: "2 kishi", level: "O'rta", rating: "4.9 (290+)",
    img: "https://dostavo4ka.uz/upload-file/2022/11/02/6301/750x750-bc5ba3c9-67f4-49e9-8bea-40d8b0624259.jpg",
    ingredients: ["Qo'y qovurg'asi", "Piyoz", "Tuz va Zira"],
    addonsTitle: "🥗 Salatlar",
    addons: [
      { name: "Achichuk salati", price: 10000 },
      { name: "Tuzlama (Assorti)", price: 14000 }
    ]
  },
  {
    id: 24, category: "Tandir Taom", title: "Varqi Somsa", price: 14000, oldPrice: "17,000 so'm",
    desc: "Qat-qat mo'rt xamirli, go'sht va dumba yog'iga boy tandir somsa.",
    time: "30 min", portion: "1 kishi", level: "O'rta", rating: "4.9 (380+)",
    img: "https://i.ytimg.com/vi/n7aaNhNcShY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA8--36noZHZbMN2DTuFxa4Uo7yqAg",
    ingredients: ["Varqi xamir", "Mol/Qo'y go'shti", "Dumba", "Kunjut"],
    addonsTitle: "☕️ Choy va Sous",
    addons: [
      { name: "Achchiq tomat sous", price: 4000 },
      { name: "Ko'k choy (Choynak)", price: 8000 }
    ]
  },
  {
    id: 25, category: "Tandir Taom", title: "Qovoqli Somsa", price: 10000, oldPrice: "12,000 so'm",
    desc: "Shirin qovoq, jizza va ziravorlar bilan to'ldirilgan parxez tandir somsa.",
    time: "30 min", portion: "1 kishi", level: "Oson", rating: "4.7 (150+)",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE4di1sm_HMrYyOaTa1LWI8x4Z3jVQxdvHErPAE2cgIY-IJ_i8rOW448bE&s=10",
    ingredients: ["Qatlama xamir", "Qovoq", "Jizza / Sariyog'", "Zira"],
    addonsTitle: "☕️ Choy",
    addons: [
      { name: "Limonli ko'k choy", price: 8000 }
    ]
  },]
