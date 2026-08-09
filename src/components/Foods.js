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
  }
];