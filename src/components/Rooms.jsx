'use client';

import React, { useState, useMemo, useEffect } from 'react';

const STORAGE_KEY = 'tapchan_bookings_v1';
const CANCELLED_STORAGE_KEY = 'tapchan_cancelled_v1';

const INITIAL_TAPCHANS = [
  {
    id: 1,
    name: "The choyxona Chodiri",
    capacity: 8,
    view: "Favvora ko'rinishi",
    status: "available",
    price: "Minimal buyurtma: 300,000 so'm",
    popularity: 98,
    image: "https://avatars.mds.yandex.net/get-altay/14712641/2a00000197361363a4c60357fc4cd876a778/orig"
  },
  {
    id: 2,
    name: "The choyxona VIP xonasi",
    capacity: 6,
    view: "Yashil bog' manzarasi",
    status: "available",
    price: "Bepul band qilish",
    popularity: 92,
    image: "https://ultima.guide/images/uzbekistan/tashkent/2026/193687795731/gallery-1-src.webp"
  },
  {
    id: 3,
    name: "The choyxona Gaming xonasi",
    capacity: 12,
    view: "Sharqona hovli",
    status: "limited",
    price: "Minimal buyurtma: 500,000 so'm",
    popularity: 99,
    image: "https://www.afisha.uz/uploads/media/2023/02/3ca52143b29241ad83b1133093aff874_lf.jpg"
  },
  {
    id: 4,
    name: "Toshkent Shinam Tapchani",
    capacity: 4,
    view: "Choyxona ichki ko'rinishi",
    status: "reserved",
    price: "Bepul band qilish",
    popularity: 85,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUhB8zpa5AqDimlliCE63SXdj5dFTLfAgEHSpal_KIJ217x7J83wtiFOvs&s=10"
  },
  {
    id: 5,
    name: "Farg'ona Milliy Tapchan",
    capacity: 10,
    view: "Anorzor manzarasi",
    status: "available",
    price: "Minimal buyurtma: 400,000 so'm",
    popularity: 90,
    image: "https://avatars.mds.yandex.net/get-altay/14021521/2a00000193a69514a810be96a48066bb87a7/L_height"
  },
  {
    id: 6,
    name: "Ipak Yo'li Kichik Tapchan",
    capacity: 4,
    view: "Tinch sharqona burchak",
    status: "available",
    price: "Bepul band qilish",
    popularity: 88,
    image: "https://avatars.mds.yandex.net/get-altay/16341471/2a000001999bb44a40870c0b43fb4af1610f/L_height"
  },
  {
    id: 7,
    name: "The choxona Camfort xonasi",
    capacity: 6,
    view: "",
    status: "available",
    price: "Bepul band qilish",
    popularity: 94,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQLS391hTQLvbI3MNN-Cpo59HBqF5504jf79SKzQo01XHFzcC0S-pkeOK&s=10"
  },
  {
    id: 8,
    name: "The choyxona Uchrashuv xonasi",
    capacity: 10,
    view: "Xon saroyi ko'rinishi",
    status: "limited",
    price: "Minimal buyurtma: 450,000 so'm",
    popularity: 96,
    image: "https://ultima.guide/images/uzbekistan/tashkent/2026/193687795731/gallery-2-src.webp"
  },
  {
    id: 9,
    name: "The choyxona Milliy Tapchani",
    capacity: 8,
    view: "Osuda xonalar",
    status: "available",
    price: "Minimal buyurtma: 350,000 so'm",
    popularity: 91,
    image: "https://eurasia.travel/wp-content/uploads/2024/07/chayhana-2.jpg"
  },
  {
    id: 10,
    name: "The choyxona Manzarali Tapchani",
    capacity: 6,
    view: "Tog' va suv manzarasi",
    status: "available",
    price: "Bepul band qilish",
    popularity: 97,
    image: "https://storage.kun.uz/source/3/VGompc94QMA9XNy2MMNLpNootGD9Tr2l.png"
  }
];

const makeDefaultBookings = () => {
  const endTime = Date.now() + 1 * 20 * 20 * 1000;
  return {
    4: {
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      guests: 4,
      paymentAmount: "Bepul band qilish",
      endTime: endTime
    }
  };
};

export default function RoomBooking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTapchanId, setSelectedTapchanId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Xona band qilindi');

  const [bookings, setBookings] = useState({});
  const [cancelledIds, setCancelledIds] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  const [tick, setTick] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    guests: 6,
    paymentCard: 'Humo',
    cardNumber: '',
    specialRequests: ''
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setBookings(JSON.parse(saved));
      } else {
        setBookings(makeDefaultBookings());
      }
      const savedCancelled = window.localStorage.getItem(CANCELLED_STORAGE_KEY);
      if (savedCancelled) {
        setCancelledIds(JSON.parse(savedCancelled));
      }
    } catch (err) {
      console.error('localStorage o\'qishda xatolik:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (err) {
      console.error('localStorage yozishda xatolik:', err);
    }
  }, [bookings, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(CANCELLED_STORAGE_KEY, JSON.stringify(cancelledIds));
    } catch (err) {
      console.error('localStorage yozishda xatolik:', err);
    }
  }, [cancelledIds, isHydrated]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTapchanRealStatus = (tapchan) => {
    const booking = bookings[tapchan.id];
    if (booking) {
      const now = new Date().getTime();
      if (now < booking.endTime) {
        return { isReserved: true, label: "Bu xona band qilindi", details: booking };
      } else {
        return { isReserved: false, label: "Bu xona ishlatish uchun bo'sh", details: null };
      }
    }
    if (tapchan.status === 'reserved' && !cancelledIds[tapchan.id]) {
      return { isReserved: true, label: "Bu xona band qilindi", details: null };
    }
    return { isReserved: false, label: "Bu xona ishlatish uchun bo'sh", details: null };
  };

  const handleCancelBooking = (id) => {
    setBookings(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setCancelledIds(prev => ({ ...prev, [id]: true }));

    setToastMessage('Bandlov bekor qilindi');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const filteredTapchans = useMemo(() => {
    return INITIAL_TAPCHANS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCapacity = true;
      if (capacityFilter === '10') {
        matchesCapacity = item.capacity >= 10;
      } else if (capacityFilter !== 'all') {
        matchesCapacity = item.capacity === parseInt(capacityFilter, 10);
      }

      let matchesAvailability = true;
      if (availabilityFilter !== 'all') {
        const currentStatus = getTapchanRealStatus(item);
        if (availabilityFilter === 'available') matchesAvailability = !currentStatus.isReserved;
        if (availabilityFilter === 'reserved') matchesAvailability = currentStatus.isReserved;
      }

      return matchesSearch && matchesCapacity && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === 'capacity-asc') return a.capacity - b.capacity;
      if (sortBy === 'capacity-desc') return b.capacity - a.capacity;
      return b.popularity - a.popularity;
    });
  }, [searchQuery, capacityFilter, availabilityFilter, sortBy, bookings, cancelledIds, tick]);

  const handleOpenModal = (id) => {
    setSelectedTapchanId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTapchanId) {
      const selectedTapchan = INITIAL_TAPCHANS.find(t => t.id === selectedTapchanId);
      const bookingEnd = new Date(`${formData.date}T${formData.time}`).getTime() + (3 * 60 * 60 * 1000);

      setBookings(prev => ({
        ...prev,
        [selectedTapchanId]: {
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          paymentAmount: selectedTapchan?.price || "To'langan",
          endTime: isNaN(bookingEnd) ? new Date().getTime() + (3 * 60 * 60 * 1000) : bookingEnd
        }
      }));

      setCancelledIds(prev => {
        if (!prev[selectedTapchanId]) return prev;
        const updated = { ...prev };
        delete updated[selectedTapchanId];
        return updated;
      });
    }

    setIsModalOpen(false);
    setShowSuccessAlert(true);

    setFormData({
      fullName: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      guests: 6,
      paymentCard: 'Humo',
      cardNumber: '',
      specialRequests: ''
    });
  };

  return (
    <section className="site-bg-pattern min-h-screen py-16 px-4 md:px-8 text-[#2C1E11] font-sans relative">

      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 animate-bounce">
          <div className="bg-white border border-emerald-200 shadow-2xl rounded-2xl px-6 py-3.5 flex items-center gap-3 text-emerald-900 border-l-4 border-l-emerald-500">
            <i className="fa-solid fa-circle-check text-emerald-500 text-xl"></i>
            <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Muvaffaqiyatli to'lov alert oynasi */}
      {showSuccessAlert && (
        <div 
          onClick={() => setShowSuccessAlert(false)}
          className="fixed inset-0 bg-[#2C1E11]/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4 transition-all"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-emerald-200 rounded-3xl max-w-[420px] w-full p-8 shadow-2xl text-center relative animate-in fade-in zoom-in duration-300"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl shadow-inner">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h3 className="font-serif-title text-2xl font-bold text-[#2C1E11] mb-2">Ajoyib!</h3>
            <p className="text-[#7A6A58] text-sm md:text-base mb-6 leading-relaxed">
              To'lov muvofaqiyatli amalga oshirildi.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessAlert(false)}
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-300"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto relative z-10">

        <div className="text-center max-w-[760px] mx-auto mb-14">
          <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#725927] tracking-tight mb-4">
            Xonalarni Band Qilish
          </h2>
          <p className="text-[#7A6A58] text-base md:text-lg leading-relaxed">
            Oila a'zolaringiz va do'stlaringiz bilan milliy taomlarimizdan bahramand bo'lish uchun o'zingizga ma'qul shinam tapchanni onlayn band qiling.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E2D8C3] p-5 rounded-2xl shadow-sm mb-12 flex flex-wrap gap-4 items-center justify-between">

          <div className="relative flex-1 min-w-[260px]">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#B2935B]"></i>
            <input
              type="text"
              placeholder="Tapchan nomi bo'yicha qidiruv..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-4 pl-11 bg-[#F9F7F1] border border-[#E2D8C3] rounded-xl outline-none focus:border-[#B2935B] focus:bg-white text-sm text-[#2C1E11] transition-all placeholder-[#A39585]"
            />
          </div>

          <div className="flex flex-wrap gap-3 flex-2 min-w-[300px] justify-end">

            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="py-3 px-4 text-sm font-medium text-[#4A3525] bg-[#F9F7F1] border border-[#E2D8C3] rounded-xl outline-none hover:border-[#B2935B] focus:border-[#B2935B] cursor-pointer transition-all"
            >
              <option value="all">Barcha sig'imlar</option>
              <option value="4">4 kishilik</option>
              <option value="6">6 kishilik</option>
              <option value="8">8 kishilik</option>
              <option value="10">10+ kishilik</option>
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="py-3 px-4 text-sm font-medium text-[#4A3525] bg-[#F9F7F1] border border-[#E2D8C3] rounded-xl outline-none hover:border-[#B2935B] focus:border-[#B2935B] cursor-pointer transition-all"
            >
              <option value="all">Barcha holatlar</option>
              <option value="available">Bo'sh</option>
              <option value="reserved">Band qilingan</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-4 text-sm font-medium text-[#4A3525] bg-[#F9F7F1] border border-[#E2D8C3] rounded-xl outline-none hover:border-[#B2935B] focus:border-[#B2935B] cursor-pointer transition-all"
            >
              <option value="popular">Ommabopligi bo'yicha</option>
              <option value="capacity-asc">Sig'imi: Kamdan ko'pga</option>
              <option value="capacity-desc">Sig'imi: Ko'pdan kamga</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTapchans.length > 0 ? (
            filteredTapchans.map((item) => {
              const statusInfo = getTapchanRealStatus(item);
              const isReserved = statusInfo.isReserved;

              return (
                <div
                  key={item.id}
                  className="bg-[#FDF6E2] border border-[#E2D8C3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
                >
                  <div className="relative h-[210px] overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className={`absolute top-4 right-4 py-1.5 px-3 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1.5 border shadow-sm transition-all ${isReserved
                      ? "bg-rose-500/90 text-white border-rose-600"
                      : "bg-emerald-500/90 text-white border-emerald-600"
                      }`}>
                      <span className={`w-2 h-2 rounded-full ${isReserved ? "bg-white animate-pulse" : "bg-white"}`}></span>
                      {statusInfo.label}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-[#2C1E11]/85 text-[#F3EFE0] py-1.5 px-3 rounded-lg text-xs font-medium backdrop-blur-sm">
                      {item.price}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif-title text-xl font-bold text-[#2C1E11] mb-2">{item.name}</h3>

                    {isReserved && (
                      <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl mb-3 text-xs text-[#4A3525] flex flex-col gap-2">
                        {statusInfo.details && (
                          <>
                            <div className="font-semibold text-rose-700 flex items-center gap-1">
                              <i className="fa-solid fa-clock text-rose-600"></i>
                              <span>Band vaqti: {statusInfo.details.date} ({statusInfo.details.time})</span>
                            </div>
                            <div className="flex justify-between items-center text-[#7A6A58]">
                              <span>Odamlar: {statusInfo.details.guests} kishi</span>
                              <span className="font-medium text-[#2C1E11]">{statusInfo.details.paymentAmount}</span>
                            </div>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(item.id)}
                          className="mt-1 w-full py-2 px-3 rounded-lg text-xs font-semibold bg-white text-rose-600 border border-rose-300 hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-1.5"
                        >
                          <i className="fa-solid fa-ban"></i>
                          Bandlovni bekor qilish
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-dashed border-[#E2D8C3]">
                      <div className="text-xs text-[#7A6A58] flex items-center gap-2">
                        <i className="fa-solid fa-users text-[#B2935B] w-4 text-center"></i> {item.capacity} kishilik
                      </div>
                      <div className="text-xs text-[#7A6A58] flex items-center gap-2">
                        <i className="fa-solid fa-eye text-[#B2935B] w-4 text-center"></i> {item.view}
                      </div>
                      <div className="text-xs text-[#7A6A58] flex items-center gap-2">
                        <i className="fa-solid fa-couch text-[#B2935B] w-4 text-center"></i> Yumshoq ko'rpacha
                      </div>
                      <div className="text-xs text-[#7A6A58] flex items-center gap-2">
                        <i className="fa-solid fa-wifi text-[#B2935B] w-4 text-center"></i> Bepul Wi-Fi
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto pt-2">
                      {/* Faqat Bitta Band qilish tugmasi */}
                      <button
                        disabled={isReserved}
                        onClick={() => handleOpenModal(item.id)}
                        className={`w-full py-3.5 px-5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isReserved
                          ? "bg-[#EFECE6] text-[#A39585] cursor-not-allowed border border-[#E2D8C3]"
                          : "bg-[#B2935B] text-white hover:bg-[#8C6F36] shadow-sm hover:shadow"
                          }`}
                      >
                        {isReserved ? 'Band Qilingan' : 'Band qilish'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-[#7A6A58] py-12">
              So'rovingizga mos keladigan tapchanlar topilmadi.
            </p>
          )}
        </div>
      </div>

      {/* Yagona Birlashtirilgan Modal Oyna */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-[#2C1E11]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDF6E2] border border-[#E2D8C3] rounded-3xl max-w-[580px] w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2D8C3]">
              <div>
                <h3 className="font-serif-title text-2xl font-bold text-[#2C1E11]">Buyurtmani rasmiylashtirish</h3>
                <p className="text-xs text-[#7A6A58] mt-1">Ma'lumotlaringizni kiriting, buyurtmangiz tez orada rasmiylashtiriladi</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#7A6A58] hover:text-[#2C1E11] text-xl transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-[#E2D8C3]/40 hover:bg-[#E2D8C3]"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Tanlangan Tapchan</label>
                <select
                  value={selectedTapchanId || ''}
                  onChange={(e) => setSelectedTapchanId(Number(e.target.value))}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all"
                  required
                >
                  {INITIAL_TAPCHANS.map((t) => {
                    const st = getTapchanRealStatus(t);
                    return (
                      <option key={t.id} value={t.id} disabled={st.isReserved}>
                        {t.name} ({t.capacity} kishilik) {st.isReserved ? "- [BAND]" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Ismingiz</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Masalan: Ibrohim Aliyev"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all placeholder-[#A39585]"
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Telefon raqami</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all placeholder-[#A39585]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Sana</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Vaqt</label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all"
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Mehmonlar Soni</label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="20"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all"
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">To'lov karta turi</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Humo', 'UzCard', 'Xalq banki', 'Kapitalbank', 'Boshqa'].map((card) => (
                    <button
                      type="button"
                      key={card}
                      onClick={() => setFormData(prev => ({ ...prev, paymentCard: card }))}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center gap-2 ${
                        formData.paymentCard === card 
                          ? 'bg-white border-[#B2935B] shadow-sm text-[#2C1E11] ring-1 ring-[#B2935B]' 
                          : 'bg-[#F3EFE0]/60 border-[#E2D8C3] text-[#7A6A58] hover:bg-white'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        formData.paymentCard === card ? 'bg-[#B2935B]' : 'bg-[#C5B9A5]'
                      }`}></span>
                      {card}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Karta raqami</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] tracking-widest transition-all placeholder-[#A39585]"
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4A3525]">Izoh (ixtiyoriy)</label>
                <textarea
                  id="specialRequests"
                  rows="2"
                  placeholder="Qo'shimcha izoh, masalan: achchiq bo'lmasin, bezatib qo'yilsin..."
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="p-3 bg-white border border-[#E2D8C3] rounded-xl outline-none text-sm focus:border-[#B2935B] text-[#2C1E11] transition-all placeholder-[#A39585]"
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-3 border-t border-[#E2D8C3] flex items-center justify-between gap-4 mt-2">
                <div>
                  <span className="text-xs text-[#7A6A58] block uppercase tracking-wider">Jami to'lov</span>
                  <span className="font-bold text-lg text-[#8C6F36]">
                    {INITIAL_TAPCHANS.find(t => t.id === selectedTapchanId)?.price || "Bepul"}
                  </span>
                </div>
                <button
                  type="submit"
                  className="py-3.5 px-8 bg-[#8C6F36] hover:bg-[#725927] text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                >
                  Buyurtmani tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}