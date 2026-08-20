  'use client'

  import React, { useState, useMemo, useRef, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import { useAuth } from "@/context/AuthContext";
  import {
    LayoutDashboard, ShoppingBag, CalendarCheck, UtensilsCrossed, Tags, ChefHat,
    Users, Star, Armchair, Bell, Settings, LogOut, Search, Menu, X, Sun, Moon,
    Globe, ChevronDown, Plus, Pencil, Trash2, Eye, Filter, ArrowUpDown,
    TrendingUp, TrendingDown, DollarSign, Package, CalendarPlus, UserPlus,
    Check, XCircle, Clock, MoreVertical, Phone, Mail, MapPin, Flame, Award,
    ImagePlus, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, Info,
  } from "lucide-react";
  import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    Tooltip, CartesianGrid,
  } from "recharts";

  /* ============================================================
    TOKENS
    ============================================================ */
  const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');`;

  const THEME_VARS = `
  :root{
    --cream:#F6EFE0; --cream-soft:#FBF7EE; --paper:#EFE6D2;
    --ink:#241A10; --ink-soft:#5B4A38;
    --brown:#2B1D12; --brown-700:#4A3520;
    --green:#1E3A2C; --green-700:#27503C; --green-100:#E4ECE3;
    --gold:#C69A3C; --gold-300:#E7CD8C; --gold-100:#F6ECD3;
    --line: rgba(43,29,18,0.10);
    --surface:#FFFFFF;
    --shadow: 0 1px 2px rgba(43,29,18,0.06), 0 8px 24px -12px rgba(43,29,18,0.18);
  }
  .dark{
    --cream:#1A130D; --cream-soft:#15100B; --paper:#221A12;
    --ink:#F3E9D6; --ink-soft:#C2AF93;
    --brown:#F3E9D6; --brown-700:#DCC9A6;
    --green:#8FBBA0; --green-700:#6FA085; --green-100:#20302A;
    --gold:#D8B45E; --gold-300:#E7CD8C; --gold-100:#2A2313;
    --line: rgba(243,233,214,0.10);
    --surface:#211910;
    --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.5);
  }
  .font-display{ font-family:'Fraunces', Georgia, serif; }
  .font-body{ font-family:'Inter', system-ui, sans-serif; }
  .seam{
    height:6px; width:100%;
    background-image: repeating-linear-gradient(135deg, var(--gold) 0 6px, transparent 6px 12px);
    opacity:0.35;
  }
  .scrollbar-thin::-webkit-scrollbar{ height:6px; width:6px; }
  .scrollbar-thin::-webkit-scrollbar-thumb{ background:var(--line); border-radius:8px; }
  @keyframes riseIn{ from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
  .rise{ animation: riseIn 0.35s ease both; }
  @keyframes toastIn{ from{opacity:0; transform:translateX(16px);} to{opacity:1; transform:translateX(0);} }
  .toast-anim{ animation: toastIn 0.25s ease both; }
  `;

  /* ============================================================
    MOCK DATA
    ============================================================ */
  const FOOD_EMOJI = {
    Osh: "🍚", Manti: "🥟", Somsa: "🥐", "Lag'mon": "🍜", Shashlik: "🍢",
    Chuchvara: "🥣", Qozonkabob: "🍲", Norin: "🍝", Dimlama: "🍛", Achichuk: "🥗",
    Naryn: "🍝", Halim: "🥘", Baklava: "🍯", Chak_chak: "🍪", Kompot: "🥤", Choy: "🍵",
  };

  const initialCategories = [
    { id: 1, name: "Milliy taomlar", count: 12 },
    { id: 2, name: "Sho'rvalar", count: 6 },
    { id: 3, name: "Xamirli taomlar", count: 9 },
    { id: 4, name: "Kaboblar", count: 7 },
    { id: 5, name: "Salatlar", count: 5 },
    { id: 6, name: "Shirinliklar", count: 4 },
    { id: 7, name: "Ichimliklar", count: 6 },
  ];

  const initialFoods = [
    { id: 1, name: "Osh (Palov)", category: "Milliy taomlar", price: 38000, rating: 4.9, available: true, prepTime: 25, desc: "An'anaviy o'zbek palovi, qo'y go'shti va sabzi bilan.", ingredients: "Guruch, qo'y go'shti, sabzi, piyoz, zira" },
    { id: 2, name: "Manti", category: "Xamirli taomlar", price: 28000, rating: 4.8, available: true, prepTime: 35, desc: "Bug'da pishirilgan, qiyma va qovoq bilan to'ldirilgan xamir.", ingredients: "Xamir, mol go'shti, qovoq, piyoz" },
    { id: 3, name: "Somsa", category: "Xamirli taomlar", price: 12000, rating: 4.7, available: true, prepTime: 20, desc: "Tandirda pishirilgan xamir, go'sht va piyoz bilan.", ingredients: "Xamir, qo'y go'shti, piyoz, yog'" },
    { id: 4, name: "Lag'mon", category: "Milliy taomlar", price: 32000, rating: 4.8, available: true, prepTime: 30, desc: "Qo'lda tortilgan uzun xamir, sabzavotli sous bilan.", ingredients: "Xamir, mol go'shti, bulg'or qalampiri, pomidor" },
    { id: 5, name: "Shashlik (qo'y)", category: "Kaboblar", count: 0, price: 26000, rating: 4.9, available: true, prepTime: 18, desc: "Cho'g'da pishirilgan qo'y go'shti kaboblari.", ingredients: "Qo'y go'shti, piyoz, ziravorlar" },
    { id: 6, name: "Chuchvara", category: "Sho'rvalar", price: 24000, rating: 4.6, available: true, prepTime: 22, desc: "Go'shtli kichik pelmen, sho'rvada.", ingredients: "Xamir, mol go'shti, piyoz, sho'rva" },
    { id: 7, name: "Qozonkabob", category: "Kaboblar", price: 36000, rating: 4.7, available: false, prepTime: 40, desc: "Qozonda dimlangan qovurma go'sht va kartoshka.", ingredients: "Qo'y go'shti, kartoshka, piyoz" },
    { id: 8, name: "Norin", category: "Milliy taomlar", price: 30000, rating: 4.5, available: true, prepTime: 28, desc: "Yupqa xamir va otgo'sht bilan sovuq taom.", ingredients: "Xamir, ot go'shti, piyoz" },
    { id: 9, name: "Dimlama", category: "Milliy taomlar", price: 29000, rating: 4.6, available: true, prepTime: 45, desc: "Sabzavot va go'sht bilan sekin dimlangan taom.", ingredients: "Go'sht, kartoshka, karam, pomidor" },
    { id: 10, name: "Achichuk salat", category: "Salatlar", price: 9000, rating: 4.4, available: true, prepTime: 8, desc: "Pomidor va piyozdan tayyorlangan yangi salat.", ingredients: "Pomidor, piyoz, ko'kat" },
    { id: 11, name: "Baklava", category: "Shirinliklar", price: 15000, rating: 4.8, available: true, prepTime: 10, desc: "Yong'oqli, asalli qatlamli shirinlik.", ingredients: "Xamir, yong'oq, asal" },
    { id: 12, name: "Ko'k choy", category: "Ichimliklar", price: 5000, rating: 4.9, available: true, prepTime: 5, desc: "An'anaviy choynakda tortilgan ko'k choy.", ingredients: "Choy bargi" },
  ];

  const statuses = {
    order: ["Pending", "Confirmed", "Preparing", "Ready", "Delivered", "Cancelled"],
    reservation: ["Pending", "Confirmed", "Completed", "Cancelled"],
    customer: ["Active", "Inactive"],
    review: ["Published", "Hidden"],
    chef: ["Active", "On leave"],
    tapchan: ["Available", "Occupied", "Reserved"],
  };

  const custNames = ["Aziz Karimov", "Malika Yusupova", "Sardor Tashkentov", "Nilufar Rashidova", "Bobur Alimov", "Feruza Nazarova", "Jasur Yoldashev", "Dilnoza Saidova", "Ravshan Ergashev", "Gulnora Toshpulatova", "Otabek Mirzaev", "Shahzoda Xoliqova"];

  function seedOrders() {
    const foods = ["Osh (Palov)", "Manti", "Shashlik (qo'y)", "Lag'mon", "Somsa", "Qozonkabob", "Chuchvara"];
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const qty = 1 + Math.floor(Math.random() * 4);
      const price = 12000 + Math.floor(Math.random() * 26000);
      arr.push({
        id: `MT-${2410 + i}`,
        customer: custNames[i % custNames.length],
        food: foods[i % foods.length],
        qty,
        total: qty * price,
        date: `2026-08-${String(18 - (i % 12)).padStart(2, "0")}`,
        status: statuses.order[i % statuses.order.length],
      });
    }
    return arr;
  }

  function seedReservations() {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      arr.push({
        id: `RS-${330 + i}`,
        customer: custNames[(i + 3) % custNames.length],
        date: `2026-08-${String(18 + (i % 6)).padStart(2, "0")}`,
        time: ["18:00", "19:30", "20:00", "13:00", "14:30"][i % 5],
        guests: 2 + (i % 6),
        tapchan: `Tapchan ${1 + (i % 8)}`,
        status: statuses.reservation[i % statuses.reservation.length],
      });
    }
    return arr;
  }

  function seedChefs() {
    const names = ["Usta Alisher Nazarov", "Usta Karim Rustamov", "Usta Zebo Ahmedova", "Usta Bekzod Yusupov", "Usta Madina Qodirova"];
    const specialties = ["Palov ustasi", "Kabob ustasi", "Xamirli taomlar", "Sho'rva ustasi", "Shirinliklar ustasi"];
    return names.map((n, i) => ({
      id: i + 1, name: n, specialty: specialties[i], experience: 5 + i * 3,
      rating: (4.4 + i * 0.1).toFixed(1), status: i === 3 ? "On leave" : "Active",
    }));
  }

  function seedCustomers() {
    return custNames.map((n, i) => ({
      id: i + 1, name: n, email: n.toLowerCase().replace(" ", ".") + "@gmail.com",
      phone: `+998 9${i % 9}${1 + i} ${300 + i * 7}-${10 + i}-${20 + i}`,
      orders: 2 + (i * 3) % 24, registered: `2025-0${1 + (i % 9)}-1${i % 9}`,
      status: i % 5 === 0 ? "Inactive" : "Active",
    }));
  }

  function seedReviews() {
    const foods = ["Osh (Palov)", "Manti", "Shashlik (qo'y)", "Lag'mon", "Baklava"];
    const comments = [
      "Osh juda mazali edi, go'shti yumshoq va guruchi mukammal pishgan.",
      "Xizmat tez va samimiy, albatta yana kelamiz.",
      "Manti biroz sovuq keldi, lekin ta'mi yaxshi edi.",
      "Shashlik cho'g'da ajoyib pishirilgan, ziravorlari mos.",
      "Interyer chiroyli, milliy uslub his qilinadi.",
      "Baklava juda shirin va yangi tayyorlangan edi.",
    ];
    return comments.map((c, i) => ({
      id: i + 1, customer: custNames[(i + 5) % custNames.length], food: foods[i % foods.length],
      rating: 3 + (i % 3), comment: c, date: `2026-08-${10 + i}`,
      status: i === 2 ? "Hidden" : "Published",
    }));
  }

  function seedTapchans() {
    const arr = [];
    for (let i = 1; i <= 8; i++) {
      arr.push({
        id: i, name: `Tapchan ${i}`, capacity: [4, 6, 8, 10][i % 4],
        location: i <= 4 ? "Ichki zal" : i <= 6 ? "Tashqi hovli" : "VIP xona",
        status: statuses.tapchan[i % statuses.tapchan.length],
      });
    }
    return arr;
  }

  function seedNotifications() {
    return [
      { id: 1, type: "order", text: "Yangi buyurtma: MT-2429 — Aziz Karimov", time: "3 daqiqa oldin", unread: true },
      { id: 2, type: "reservation", text: "Yangi bron: RS-341 — 6 kishi, 20:00", time: "18 daqiqa oldin", unread: true },
      { id: 3, type: "review", text: "Yangi sharh: Osh uchun 5 yulduz", time: "42 daqiqa oldin", unread: true },
      { id: 4, type: "customer", text: "Yangi mijoz ro'yxatdan o'tdi: Nilufar Rashidova", time: "1 soat oldin", unread: false },
      { id: 5, type: "order", text: "Buyurtma MT-2415 yetkazib berildi", time: "2 soat oldin", unread: false },
      { id: 6, type: "reservation", text: "Bron RS-336 bekor qilindi", time: "4 soat oldin", unread: false },
    ];
  }

  const revenueData = [
    { label: "12-Avg", value: 4.1 }, { label: "13-Avg", value: 4.8 },
    { label: "14-Avg", value: 4.4 }, { label: "15-Avg", value: 5.6 },
    { label: "16-Avg", value: 6.2 }, { label: "17-Avg", value: 5.9 },
    { label: "18-Avg", value: 7.1 },
  ];
  const ordersChartData = [
    { label: "12-Avg", orders: 32 }, { label: "13-Avg", orders: 41 },
    { label: "14-Avg", orders: 38 }, { label: "15-Avg", orders: 52 },
    { label: "16-Avg", orders: 58 }, { label: "17-Avg", orders: 49 },
    { label: "18-Avg", orders: 63 },
  ];

  const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "orders", label: "Buyurtmalar", icon: ShoppingBag },
    { key: "reservations", label: "Bronlar", icon: CalendarCheck },
    { key: "foods", label: "Taomlar", icon: UtensilsCrossed },
    { key: "categories", label: "Kategoriyalar", icon: Tags },
    { key: "chefs", label: "Oshpazlar", icon: ChefHat },
    { key: "customers", label: "Mijozlar", icon: Users },
    { key: "reviews", label: "Sharhlar", icon: Star },
    { key: "tapchans", label: "Tapchanlar", icon: Armchair },
    { key: "notifications", label: "Bildirishnomalar", icon: Bell },
    { key: "settings", label: "Sozlamalar", icon: Settings },
  ];

  /* ============================================================
    HELPERS
    ============================================================ */
  function fmt(n) {
    return new Intl.NumberFormat("en-US").format(Math.round(n));
  }

  function getInitials(name) {
    if (!name) return "IA";
    return name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  }

  function getFirstName(name) {
    if (!name) return "Ibrohim";
    return name.trim().split(" ")[0];
  }

  /* ============================================================
    SMALL PRIMITIVES
    ============================================================ */
  function StatusPill({ status }) {
    const map = {
      Pending: "bg-[var(--gold-100)] text-[var(--gold)]",
      Confirmed: "bg-[var(--green-100)] text-[var(--green)]",
      Preparing: "bg-[var(--gold-100)] text-[var(--gold)]",
      Ready: "bg-[var(--green-100)] text-[var(--green)]",
      Delivered: "bg-[var(--green-100)] text-[var(--green)]",
      Completed: "bg-[var(--green-100)] text-[var(--green)]",
      Cancelled: "bg-red-500/10 text-red-500",
      Active: "bg-[var(--green-100)] text-[var(--green)]",
      Inactive: "bg-[var(--line)] text-[var(--ink-soft)]",
      "On leave": "bg-[var(--gold-100)] text-[var(--gold)]",
      Published: "bg-[var(--green-100)] text-[var(--green)]",
      Hidden: "bg-[var(--line)] text-[var(--ink-soft)]",
      Available: "bg-[var(--green-100)] text-[var(--green)]",
      Occupied: "bg-red-500/10 text-red-500",
      Reserved: "bg-[var(--gold-100)] text-[var(--gold)]",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-body ${map[status] || "bg-[var(--line)] text-[var(--ink-soft)]"}`}>
        {status}
      </span>
    );
  }

  function IconBtn({ icon: Icon, onClick, title, danger }) {
    return (
      <button
        onClick={onClick}
        title={title}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--line)] ${danger ? "text-red-500" : "text-[var(--ink-soft)]"}`}
      >
        <Icon size={15} />
      </button>
    );
  }

  function Card({ children, className = "" }) {
    return (
      <div
        className={`rounded-2xl border ${className}`}
        style={{ background: "var(--surface)", borderColor: "var(--line)", boxShadow: "var(--shadow)" }}
      >
        {children}
      </div>
    );
  }

  function SectionHeader({ title, subtitle, action }) {
    return (
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-2xl md:text-[28px] font-semibold" style={{ color: "var(--brown)" }}>{title}</h1>
          {subtitle && <p className="font-body text-sm mt-1" style={{ color: "var(--ink-soft)" }}>{subtitle}</p>}
        </div>
        {action}
      </div>
    );
  }

  function PrimaryBtn({ children, onClick, icon: Icon, type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
        style={{ background: "linear-gradient(135deg, var(--green-700), var(--green))", boxShadow: "var(--shadow)" }}
      >
        {Icon && <Icon size={15} />} {children}
      </button>
    );
  }

  function GhostBtn({ children, onClick, icon: Icon }) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-body text-sm font-semibold transition-colors"
        style={{ border: "1px solid var(--line)", color: "var(--brown)" }}
      >
        {Icon && <Icon size={15} />} {children}
      </button>
    );
  }

  function Input({ label, ...props }) {
    return (
      <label className="block">
        {label && <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>{label}</span>}
        <input
          {...props}
          className="w-full rounded-xl px-3.5 py-2.5 text-sm font-body outline-none transition-colors focus:ring-2"
          style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}
        />
      </label>
    );
  }

  function Select({ label, options, ...props }) {
    return (
      <label className="block">
        {label && <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>{label}</span>}
        <select
          {...props}
          className="w-full rounded-xl px-3.5 py-2.5 text-sm font-body outline-none appearance-none"
          style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  }

  function Textarea({ label, ...props }) {
    return (
      <label className="block">
        {label && <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>{label}</span>}
        <textarea
          {...props}
          className="w-full rounded-xl px-3.5 py-2.5 text-sm font-body outline-none resize-none"
          style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}
        />
      </label>
    );
  }

  function EmptyState({ icon: Icon, title, hint }) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--cream-soft)" }}>
          <Icon size={22} style={{ color: "var(--gold)" }} />
        </div>
        <p className="font-display text-lg font-semibold" style={{ color: "var(--brown)" }}>{title}</p>
        <p className="font-body text-sm mt-1" style={{ color: "var(--ink-soft)" }}>{hint}</p>
      </div>
    );
  }

  function Modal({ open, onClose, title, children, width = "max-w-lg" }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(20,14,8,0.55)" }} onClick={onClose}>
        <div
          className={`w-full ${width} rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto scrollbar-thin rise`}
          style={{ background: "var(--surface)", boxShadow: "var(--shadow)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-5 sticky top-0 z-10" style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
            <h3 className="font-display text-lg font-semibold" style={{ color: "var(--brown)" }}>{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--line)]">
              <X size={16} style={{ color: "var(--ink-soft)" }} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }

  function ConfirmDialog({ open, onCancel, onConfirm, title, message }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" style={{ background: "rgba(20,14,8,0.55)" }} onClick={onCancel}>
        <div className="w-full max-w-sm rounded-2xl p-6 rise" style={{ background: "var(--surface)", boxShadow: "var(--shadow)" }} onClick={(e) => e.stopPropagation()}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-red-500/10">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <h3 className="font-display text-lg font-semibold" style={{ color: "var(--brown)" }}>{title}</h3>
          <p className="font-body text-sm mt-1.5" style={{ color: "var(--ink-soft)" }}>{message}</p>
          <div className="flex gap-2 mt-6">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm font-semibold font-body" style={{ border: "1px solid var(--line)", color: "var(--brown)" }}>Bekor qilish</button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-semibold font-body text-white bg-red-500">O'chirish</button>
          </div>
        </div>
      </div>
    );
  }

  function Toasts({ toasts, remove }) {
    return (
      <div className="fixed top-4 right-4 z-[120] flex flex-col gap-2 w-[calc(100%-2rem)] sm:w-80">
        {toasts.map((t) => (
          <div key={t.id} className="toast-anim flex items-start gap-2.5 px-4 py-3 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}>
            {t.type === "error" ? <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" /> : <CheckCircle2 size={16} style={{ color: "var(--green)" }} className="mt-0.5 shrink-0" />}
            <p className="font-body text-sm flex-1" style={{ color: "var(--ink)" }}>{t.message}</p>
            <button onClick={() => remove(t.id)}><X size={14} style={{ color: "var(--ink-soft)" }} /></button>
          </div>
        ))}
      </div>
    );
  }

  function SkeletonRow({ cols }) {
    return (
      <tr>
        {Array.from({ length: cols }).map((_, i) => (
          <td key={i} className="px-4 py-3.5"><div className="h-3.5 rounded animate-pulse" style={{ background: "var(--line)" }} /></td>
        ))}
      </tr>
    );
  }

  function SortHeader({ label, field, sort, setSort }) {
    const active = sort.field === field;
    return (
      <button
        onClick={() => setSort({ field, dir: active && sort.dir === "asc" ? "desc" : "asc" })}
        className="inline-flex items-center gap-1 font-semibold uppercase tracking-wide text-[11px] font-body"
        style={{ color: active ? "var(--brown)" : "var(--ink-soft)" }}
      >
        {label} <ArrowUpDown size={11} />
      </button>
    );
  }

  /* ============================================================
    SIDEBAR + HEADER
    ============================================================ */
  function Sidebar({ active, setActive, mobileOpen, setMobileOpen, theme, user, onLogout }) {
    const initials = getInitials(user?.name);
    const displayName = user?.name || "Ibrohim Akmalov";

    return (
      <>
        {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
        <aside
          className={`fixed lg:sticky top-0 z-50 h-screen w-72 shrink-0 flex flex-col transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ background: "var(--brown)", color: "var(--cream)" }}
        >
          <div className="px-6 pt-7 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-lg font-bold" style={{ background: "linear-gradient(135deg, var(--gold-300), var(--gold))", color: "var(--brown)" }}>MT</div>
              <div>
                <p className="font-display text-[15px] font-semibold leading-tight" style={{ color: "var(--cream)" }}>Milly Taomlar</p>
                <p className="text-[11px] font-body opacity-60">Admin Panel</p>
              </div>
            </div>
            <button className="lg:hidden" onClick={() => setMobileOpen(false)}><X size={18} /></button>
          </div>
          <div className="seam mx-6" />

          <nav className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { setActive(item.key); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-body text-[13.5px] font-medium transition-all relative"
                  style={{
                    background: isActive ? "rgba(198,154,60,0.16)" : "transparent",
                    color: isActive ? "var(--gold-300)" : "rgba(246,239,224,0.72)",
                  }}
                >
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full" style={{ background: "var(--gold)" }} />}
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t" style={{ borderColor: "rgba(246,239,224,0.1)" }}>
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-sm font-semibold shrink-0" style={{ background: "var(--gold-300)", color: "var(--brown)" }}>{initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold font-body truncate" style={{ color: "var(--cream)" }}>{displayName}</p>
                <p className="text-[11px] font-body opacity-55 truncate">Bosh administrator</p>
              </div>
              <button onClick={onLogout} title="Chiqish" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 shrink-0">
                <LogOut size={14} style={{ color: "rgba(246,239,224,0.7)" }} />
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  }

  function Header({ setMobileOpen, theme, setTheme, notifications, activeLabel, user }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [lang, setLang] = useState("O'zbek");
    const unread = notifications.filter((n) => n.unread).length;
    const initials = getInitials(user?.name);
    const firstName = getFirstName(user?.name);

    return (
      <header
        className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 h-16 backdrop-blur"
        style={{ background: "color-mix(in srgb, var(--cream-soft) 92%, transparent)", borderBottom: "1px solid var(--line)" }}
      >
        <button className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center" style={{ border: "1px solid var(--line)" }} onClick={() => setMobileOpen(true)}>
          <Menu size={16} style={{ color: "var(--brown)" }} />
        </button>

        <div className="hidden lg:block">
          <p className="font-display text-[15px] font-semibold" style={{ color: "var(--brown)" }}>{activeLabel}</p>
        </div>

        <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 rounded-xl px-3.5 py-2 ml-2" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
          <Search size={15} style={{ color: "var(--ink-soft)" }} />
          <input placeholder="Qidirish..." className="bg-transparent outline-none text-sm font-body flex-1" style={{ color: "var(--ink)" }} />
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); }} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold font-body" style={{ border: "1px solid var(--line)", color: "var(--brown)" }}>
              <Globe size={13} /> {lang} <ChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl overflow-hidden rise z-20" style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}>
                {["O'zbek", "Русский", "English"].map((l) => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false); }} className="w-full text-left px-3.5 py-2.5 text-sm font-body hover:bg-[var(--cream-soft)]" style={{ color: "var(--ink)" }}>{l}</button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ border: "1px solid var(--line)" }}>
            {theme === "dark" ? <Sun size={15} style={{ color: "var(--gold)" }} /> : <Moon size={15} style={{ color: "var(--brown)" }} />}
          </button>

          <div className="relative">
            <button onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); }} className="relative w-9 h-9 rounded-lg flex items-center justify-center" style={{ border: "1px solid var(--line)" }}>
              <Bell size={15} style={{ color: "var(--brown)" }} />
              {unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white font-bold" style={{ background: "var(--gold)" }}>{unread}</span>}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[85vw] rounded-xl overflow-hidden rise z-20" style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}>
                <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--line)" }}>
                  <p className="font-display text-sm font-semibold" style={{ color: "var(--brown)" }}>Bildirishnomalar</p>
                </div>
                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className="px-4 py-3 flex gap-2.5" style={{ borderBottom: "1px solid var(--line)" }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: n.unread ? "var(--gold)" : "transparent" }} />
                      <div className="min-w-0">
                        <p className="text-[13px] font-body leading-snug" style={{ color: "var(--ink)" }}>{n.text}</p>
                        <p className="text-[11px] font-body mt-0.5" style={{ color: "var(--ink-soft)" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pl-2 ml-1" style={{ borderLeft: "1px solid var(--line)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold" style={{ background: "var(--gold-300)", color: "var(--brown)" }}>{initials}</div>
            <span className="hidden sm:block text-xs font-semibold font-body" style={{ color: "var(--brown)" }}>{firstName}</span>
          </div>
        </div>
      </header>
    );
  }

  /* ============================================================
    DASHBOARD VIEW
    ============================================================ */
  function StatCard({ icon: Icon, label, value, trend, up, delay }) {
    return (
      <Card className="p-5 rise" style={{ animationDelay: `${delay}ms` }}>
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--green-100)" }}>
            <Icon size={17} style={{ color: "var(--green)" }} />
          </div>
          <span className={`inline-flex items-center gap-1 text-xs font-semibold font-body ${up ? "" : "text-red-500"}`} style={up ? { color: "var(--green)" } : {}}>
            {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}
          </span>
        </div>
        <p className="font-display text-2xl font-bold mt-4" style={{ color: "var(--brown)" }}>{value}</p>
        <p className="text-xs font-body mt-1" style={{ color: "var(--ink-soft)" }}>{label}</p>
      </Card>
    );
  }

  function DashboardView({ orders, reservations, foods, chefs, theme, userName }) {
    const popularFoods = [...foods].sort((a, b) => b.rating - a.rating).slice(0, 5);
    return (
      <div className="space-y-6">
        <SectionHeader title={`Xush kelibsiz, ${userName}`} subtitle="Bugungi restoran faoliyati bo'yicha umumiy ko'rinish" />

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={DollarSign} label="Umumiy daromad" value="71.2M so'm" trend="12.4%" up delay={0} />
          <StatCard icon={ShoppingBag} label="Umumiy buyurtmalar" value="1,248" trend="8.1%" up delay={40} />
          <StatCard icon={CalendarPlus} label="Yangi bronlar" value="34" trend="3.2%" up delay={80} />
          <StatCard icon={Users} label="Umumiy mijozlar" value="892" trend="5.6%" up delay={120} />
          <StatCard icon={UtensilsCrossed} label="Umumiy taomlar" value={foods.length} trend="2 yangi" up delay={160} />
          <StatCard icon={Star} label="O'rtacha reyting" value="4.8" trend="0.2%" up={false} delay={200} />
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <p className="font-display text-base font-semibold" style={{ color: "var(--brown)" }}>Daromad dinamikasi</p>
              <span className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>Oxirgi 7 kun (mln so'm)</span>
            </div>
            <div className="h-64 mt-3 -ml-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 12, fontFamily: "Inter" }} />
                  <Area type="monotone" dataKey="value" stroke="var(--gold)" strokeWidth={2.5} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-display text-base font-semibold mb-1" style={{ color: "var(--brown)" }}>Buyurtmalar</p>
            <span className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>Kunlik son</span>
            <div className="h-64 mt-3 -ml-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 12, fontFamily: "Inter" }} />
                  <Bar dataKey="orders" fill="var(--green)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="p-5 lg:col-span-2">
            <p className="font-display text-base font-semibold mb-4" style={{ color: "var(--brown)" }}>So'nggi buyurtmalar</p>
            <div className="space-y-1">
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid var(--line)" }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{FOOD_EMOJI[o.food.split(" ")[0]] || "🍽️"}</span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold font-body truncate" style={{ color: "var(--ink)" }}>{o.customer}</p>
                      <p className="text-[11px] font-body" style={{ color: "var(--ink-soft)" }}>{o.food} · {o.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[13px] font-semibold font-body hidden sm:block" style={{ color: "var(--brown)" }}>{fmt(o.total)} so'm</span>
                    <StatusPill status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-display text-base font-semibold mb-4" style={{ color: "var(--brown)" }}>So'nggi bronlar</p>
            <div className="space-y-3">
              {reservations.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gold-100)" }}>
                    <Armchair size={14} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold font-body truncate" style={{ color: "var(--ink)" }}>{r.customer}</p>
                    <p className="text-[11px] font-body" style={{ color: "var(--ink-soft)" }}>{r.tapchan} · {r.guests} kishi · {r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <p className="font-display text-base font-semibold mb-4" style={{ color: "var(--brown)" }}>Mashhur taomlar</p>
            <div className="space-y-3">
              {popularFoods.map((f, i) => (
                <div key={f.id} className="flex items-center gap-3">
                  <span className="font-display text-sm w-4 font-semibold" style={{ color: "var(--gold)" }}>{i + 1}</span>
                  <span className="text-xl">{FOOD_EMOJI[f.name.split(" ")[0]] || "🍽️"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold font-body truncate" style={{ color: "var(--ink)" }}>{f.name}</p>
                    <p className="text-[11px] font-body" style={{ color: "var(--ink-soft)" }}>{f.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold font-body" style={{ color: "var(--gold)" }}><Star size={11} fill="var(--gold)" strokeWidth={0} /> {f.rating}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-display text-base font-semibold mb-4" style={{ color: "var(--brown)" }}>Top oshpazlar</p>
            <div className="space-y-3">
              {chefs.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-semibold shrink-0" style={{ background: "var(--green-100)", color: "var(--green)" }}>
                    {c.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold font-body truncate" style={{ color: "var(--ink)" }}>{c.name}</p>
                    <p className="text-[11px] font-body" style={{ color: "var(--ink-soft)" }}>{c.specialty}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold font-body" style={{ color: "var(--gold)" }}><Award size={12} /> {c.rating}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  /* ============================================================
    ORDERS VIEW
    ============================================================ */
  function OrdersView({ orders, setOrders, notify }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Barchasi");
    const [sort, setSort] = useState({ field: "date", dir: "desc" });
    const [viewOrder, setViewOrder] = useState(null);

    const filtered = useMemo(() => {
      let list = orders.filter((o) =>
        (statusFilter === "Barchasi" || o.status === statusFilter) &&
        (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
      );
      list.sort((a, b) => {
        const dir = sort.dir === "asc" ? 1 : -1;
        if (a[sort.field] < b[sort.field]) return -1 * dir;
        if (a[sort.field] > b[sort.field]) return 1 * dir;
        return 0;
      });
      return list;
    }, [orders, search, statusFilter, sort]);

    function changeStatus(id, status) {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      notify(`${id} holati "${status}" ga o'zgartirildi`);
    }

    return (
      <div>
        <SectionHeader title="Buyurtmalar" subtitle={`${orders.length} ta buyurtma, ${filtered.length} ta ko'rsatilmoqda`} />

        <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2 flex-1 min-w-[200px]" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <Search size={14} style={{ color: "var(--ink-soft)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Mijoz yoki ID bo'yicha qidirish..." className="bg-transparent outline-none text-sm font-body flex-1" style={{ color: "var(--ink)" }} />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: "var(--ink-soft)" }} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl px-3 py-2 text-sm font-body outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}>
              {["Barchasi", ...statuses.order].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </Card>

        <Card className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <th className="text-left px-4 py-3.5"><SortHeader label="ID" field="id" sort={sort} setSort={setSort} /></th>
                <th className="text-left px-4 py-3.5"><SortHeader label="Mijoz" field="customer" sort={sort} setSort={setSort} /></th>
                <th className="text-left px-4 py-3.5 font-body font-semibold uppercase text-[11px] tracking-wide" style={{ color: "var(--ink-soft)" }}>Taom</th>
                <th className="text-left px-4 py-3.5 font-body font-semibold uppercase text-[11px] tracking-wide" style={{ color: "var(--ink-soft)" }}>Miqdor</th>
                <th className="text-left px-4 py-3.5"><SortHeader label="Narx" field="total" sort={sort} setSort={setSort} /></th>
                <th className="text-left px-4 py-3.5"><SortHeader label="Sana" field="date" sort={sort} setSort={setSort} /></th>
                <th className="text-left px-4 py-3.5 font-body font-semibold uppercase text-[11px] tracking-wide" style={{ color: "var(--ink-soft)" }}>Holat</th>
                <th className="text-left px-4 py-3.5 font-body font-semibold uppercase text-[11px] tracking-wide" style={{ color: "var(--ink-soft)" }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-[var(--cream-soft)] transition-colors" style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-4 py-3.5 font-body font-semibold" style={{ color: "var(--brown)" }}>{o.id}</td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink)" }}>{o.customer}</td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink)" }}>{FOOD_EMOJI[o.food.split(" ")[0]] || "🍽️"} {o.food}</td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink)" }}>{o.qty}</td>
                  <td className="px-4 py-3.5 font-body font-semibold" style={{ color: "var(--brown)" }}>{fmt(o.total)} so'm</td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink-soft)" }}>{o.date}</td>
                  <td className="px-4 py-3.5">
                    <select value={o.status} onChange={(e) => changeStatus(o.id, e.target.value)} className="text-xs font-semibold font-body rounded-full px-2.5 py-1 outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--brown)" }}>
                      {statuses.order.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3.5"><IconBtn icon={Eye} onClick={() => setViewOrder(o)} title="Ko'rish" /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8}><EmptyState icon={ShoppingBag} title="Buyurtma topilmadi" hint="Qidiruv yoki filtrni o'zgartirib ko'ring." /></td></tr>
              )}
            </tbody>
          </table>
        </Card>

        <Modal open={!!viewOrder} onClose={() => setViewOrder(null)} title={viewOrder ? `Buyurtma ${viewOrder.id}` : ""}>
          {viewOrder && (
            <div className="space-y-4 font-body text-sm">
              <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Mijoz</span><span className="font-semibold" style={{ color: "var(--ink)" }}>{viewOrder.customer}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Taom</span><span className="font-semibold" style={{ color: "var(--ink)" }}>{viewOrder.food}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Miqdor</span><span className="font-semibold" style={{ color: "var(--ink)" }}>{viewOrder.qty}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Jami narx</span><span className="font-semibold" style={{ color: "var(--brown)" }}>{fmt(viewOrder.total)} so'm</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Sana</span><span className="font-semibold" style={{ color: "var(--ink)" }}>{viewOrder.date}</span></div>
              <div className="flex justify-between items-center"><span style={{ color: "var(--ink-soft)" }}>Holat</span><StatusPill status={viewOrder.status} /></div>
            </div>
          )}
        </Modal>
      </div>
    );
  }

  /* ============================================================
    FOODS VIEW
    ============================================================ */
  function FoodModal({ open, onClose, onSave, categories, initial }) {
    const empty = { name: "", category: categories[0]?.name || "", price: "", desc: "", ingredients: "", prepTime: "", available: true };
    const [form, setForm] = useState(initial || empty);
    useEffect(() => setForm(initial || empty), [initial, open]);
    return (
      <Modal open={open} onClose={onClose} title={initial ? "Taomni tahrirlash" : "Yangi taom qo'shish"} width="max-w-xl">
        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); onSave({ ...form, price: Number(form.price), prepTime: Number(form.prepTime) }); }}
        >
          <div
            className="w-full h-28 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            style={{ background: "var(--cream-soft)", border: "1.5px dashed var(--line)" }}
          >
            <ImagePlus size={20} style={{ color: "var(--ink-soft)" }} />
            <span className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>Taom rasmini yuklash</span>
          </div>
          <Input label="Taom nomi" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Masalan: Osh (Palov)" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Kategoriya" options={categories.map((c) => c.name)} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input label="Narx (so'm)" required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="35000" />
          </div>
          <Textarea label="Tavsif" rows={2} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Taom haqida qisqacha ma'lumot" />
          <Input label="Tarkibi" value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} placeholder="Guruch, go'sht, sabzi..." />
          <div className="grid grid-cols-2 gap-3 items-end">
            <Input label="Tayyorlash vaqti (daqiqa)" type="number" value={form.prepTime} onChange={(e) => setForm({ ...form, prepTime: e.target.value })} placeholder="25" />
            <label className="flex items-center gap-2.5 pb-2.5 cursor-pointer">
              <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="w-4 h-4 accent-[var(--green)]" />
              <span className="text-sm font-body font-semibold" style={{ color: "var(--ink)" }}>Mavjud</span>
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold font-body" style={{ border: "1px solid var(--line)", color: "var(--brown)" }}>Bekor qilish</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold font-body text-white" style={{ background: "linear-gradient(135deg, var(--green-700), var(--green))" }}>Saqlash</button>
          </div>
        </form>
      </Modal>
    );
  }

  function FoodsView({ foods, setFoods, categories, notify }) {
    const [search, setSearch] = useState("");
    const [catFilter, setCatFilter] = useState("Barchasi");
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const filtered = foods.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) &&
      (catFilter === "Barchasi" || f.category === catFilter)
    );

    function save(data) {
      if (editing) {
        setFoods((prev) => prev.map((f) => (f.id === editing.id ? { ...f, ...data } : f)));
        notify(`${data.name} yangilandi`);
      } else {
        setFoods((prev) => [{ id: Date.now(), rating: 0, ...data }, ...prev]);
        notify(`${data.name} qo'shildi`);
      }
      setModalOpen(false); setEditing(null);
    }
    function toggleAvailable(id) {
      setFoods((prev) => prev.map((f) => (f.id === id ? { ...f, available: !f.available } : f)));
    }
    function confirmDelete() {
      setFoods((prev) => prev.filter((f) => f.id !== deleting.id));
      notify(`${deleting.name} o'chirildi`, "error");
      setDeleting(null);
    }

    return (
      <div>
        <SectionHeader
          title="Taomlar"
          subtitle={`${foods.length} ta taom menyuda`}
          action={<PrimaryBtn icon={Plus} onClick={() => { setEditing(null); setModalOpen(true); }}>Taom qo'shish</PrimaryBtn>}
        />

        <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2 flex-1 min-w-[200px]" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <Search size={14} style={{ color: "var(--ink-soft)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Taom qidirish..." className="bg-transparent outline-none text-sm font-body flex-1" style={{ color: "var(--ink)" }} />
          </div>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="rounded-xl px-3 py-2 text-sm font-body outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}>
            {["Barchasi", ...categories.map((c) => c.name)].map((c) => <option key={c}>{c}</option>)}
          </select>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((f) => (
            <Card key={f.id} className="p-4 rise">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: "var(--cream-soft)" }}>
                  {FOOD_EMOJI[f.name.split(" ")[0]] || "🍽️"}
                </div>
                <div className="flex gap-1">
                  <IconBtn icon={Pencil} onClick={() => { setEditing(f); setModalOpen(true); }} title="Tahrirlash" />
                  <IconBtn icon={Trash2} onClick={() => setDeleting(f)} title="O'chirish" danger />
                </div>
              </div>
              <p className="font-display text-[15px] font-semibold mt-3" style={{ color: "var(--brown)" }}>{f.name}</p>
              <p className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>{f.category}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-body text-sm font-bold" style={{ color: "var(--brown)" }}>{fmt(f.price)} so'm</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold font-body" style={{ color: "var(--gold)" }}><Star size={11} fill="var(--gold)" strokeWidth={0} /> {f.rating}</span>
              </div>
              <button
                onClick={() => toggleAvailable(f.id)}
                className="w-full mt-3 py-2 rounded-lg text-xs font-semibold font-body transition-colors"
                style={f.available ? { background: "var(--green-100)", color: "var(--green)" } : { background: "var(--line)", color: "var(--ink-soft)" }}
              >
                {f.available ? "✓ Mavjud" : "Mavjud emas"}
              </button>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <Card><EmptyState icon={UtensilsCrossed} title="Taom topilmadi" hint="Boshqa qidiruv so'zini sinab ko'ring yoki yangi taom qo'shing." /></Card>
            </div>
          )}
        </div>

        <FoodModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={save} categories={categories} initial={editing} />
        <ConfirmDialog open={!!deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} title="Taomni o'chirish" message={deleting ? `"${deleting.name}" menyudan butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.` : ""} />
      </div>
    );
  }

  /* ============================================================
    CATEGORIES VIEW
    ============================================================ */
  function CategoriesView({ categories, setCategories, notify }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [name, setName] = useState("");
    const [deleting, setDeleting] = useState(null);

    function openNew() { setEditing(null); setName(""); setModalOpen(true); }
    function openEdit(c) { setEditing(c); setName(c.name); setModalOpen(true); }
    function save(e) {
      e.preventDefault();
      if (editing) {
        setCategories((prev) => prev.map((c) => (c.id === editing.id ? { ...c, name } : c)));
        notify("Kategoriya yangilandi");
      } else {
        setCategories((prev) => [...prev, { id: Date.now(), name, count: 0 }]);
        notify("Kategoriya qo'shildi");
      }
      setModalOpen(false);
    }
    function confirmDelete() {
      setCategories((prev) => prev.filter((c) => c.id !== deleting.id));
      notify(`"${deleting.name}" o'chirildi`, "error");
      setDeleting(null);
    }

    return (
      <div>
        <SectionHeader title="Kategoriyalar" subtitle={`${categories.length} ta kategoriya`} action={<PrimaryBtn icon={Plus} onClick={openNew}>Kategoriya qo'shish</PrimaryBtn>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Card key={c.id} className="p-5 flex items-center justify-between rise">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--gold-100)" }}>
                  <Tags size={17} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-semibold" style={{ color: "var(--brown)" }}>{c.name}</p>
                  <p className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>{c.count} ta taom</p>
                </div>
              </div>
              <div className="flex gap-1">
                <IconBtn icon={Pencil} onClick={() => openEdit(c)} title="Tahrirlash" />
                <IconBtn icon={Trash2} onClick={() => setDeleting(c)} title="O'chirish" danger />
              </div>
            </Card>
          ))}
        </div>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Kategoriyani tahrirlash" : "Yangi kategoriya"} width="max-w-sm">
          <form onSubmit={save} className="space-y-4">
            <Input label="Kategoriya nomi" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Masalan: Sho'rvalar" />
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold font-body" style={{ border: "1px solid var(--line)", color: "var(--brown)" }}>Bekor qilish</button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold font-body text-white" style={{ background: "linear-gradient(135deg, var(--green-700), var(--green))" }}>Saqlash</button>
            </div>
          </form>
        </Modal>
        <ConfirmDialog open={!!deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} title="Kategoriyani o'chirish" message={deleting ? `"${deleting.name}" kategoriyasi o'chiriladi.` : ""} />
      </div>
    );
  }

  /* ============================================================
    RESERVATIONS VIEW
    ============================================================ */
  function ReservationsView({ reservations, setReservations, notify }) {
    const [statusFilter, setStatusFilter] = useState("Barchasi");
    const [dateFilter, setDateFilter] = useState("");

    const filtered = reservations.filter((r) =>
      (statusFilter === "Barchasi" || r.status === statusFilter) &&
      (dateFilter === "" || r.date === dateFilter)
    );

    function changeStatus(id, status) {
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      notify(`${id} holati "${status}" ga o'zgartirildi`);
    }

    return (
      <div>
        <SectionHeader title="Bronlar" subtitle={`${reservations.length} ta bron, ${filtered.length} ta ko'rsatilmoqda`} />
        <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="rounded-xl px-3 py-2 text-sm font-body outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl px-3 py-2 text-sm font-body outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}>
            {["Barchasi", ...statuses.reservation].map((s) => <option key={s}>{s}</option>)}
          </select>
          {dateFilter && <button onClick={() => setDateFilter("")} className="text-xs font-body font-semibold" style={{ color: "var(--gold)" }}>Filtrni tozalash</button>}
        </Card>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <Card key={r.id} className="p-5 rise">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-[15px] font-semibold" style={{ color: "var(--brown)" }}>{r.customer}</p>
                  <p className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>{r.id}</p>
                </div>
                <StatusPill status={r.status} />
              </div>
              <div className="space-y-1.5 text-xs font-body" style={{ color: "var(--ink-soft)" }}>
                <div className="flex items-center gap-2"><Clock size={12} /> {r.date} · {r.time}</div>
                <div className="flex items-center gap-2"><Users size={12} /> {r.guests} kishi</div>
                <div className="flex items-center gap-2"><Armchair size={12} /> {r.tapchan}</div>
              </div>
              <select value={r.status} onChange={(e) => changeStatus(r.id, e.target.value)} className="w-full mt-3.5 text-xs font-semibold font-body rounded-lg px-2.5 py-2 outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--brown)" }}>
                {statuses.reservation.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Card>
          ))}
          {filtered.length === 0 && <div className="md:col-span-2 xl:col-span-3"><Card><EmptyState icon={CalendarCheck} title="Bron topilmadi" hint="Boshqa sana yoki holatni tanlang." /></Card></div>}
        </div>
      </div>
    );
  }

  /* ============================================================
    CHEFS VIEW
    ============================================================ */
  function ChefsView({ chefs, setChefs, notify }) {
    const [deleting, setDeleting] = useState(null);
    function confirmDelete() {
      setChefs((prev) => prev.filter((c) => c.id !== deleting.id));
      notify(`${deleting.name} o'chirildi`, "error");
      setDeleting(null);
    }
    return (
      <div>
        <SectionHeader title="Oshpazlar" subtitle={`${chefs.length} ta oshpaz jamoada`} action={<PrimaryBtn icon={Plus}>Oshpaz qo'shish</PrimaryBtn>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chefs.map((c) => (
            <Card key={c.id} className="p-5 text-center rise">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center font-display text-xl font-bold" style={{ background: "linear-gradient(135deg, var(--gold-300), var(--gold))", color: "var(--brown)" }}>
                {c.name.split(" ").slice(-1)[0][0]}
              </div>
              <p className="font-display text-[15px] font-semibold mt-3" style={{ color: "var(--brown)" }}>{c.name}</p>
              <p className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>{c.specialty}</p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs font-body" style={{ color: "var(--ink-soft)" }}>
                <span>{c.experience} yil tajriba</span>
                <span className="inline-flex items-center gap-1" style={{ color: "var(--gold)" }}><Star size={11} fill="var(--gold)" strokeWidth={0} /> {c.rating}</span>
              </div>
              <div className="mt-3"><StatusPill status={c.status} /></div>
              <div className="flex gap-2 justify-center mt-4">
                <GhostBtn icon={Pencil}>Tahrirlash</GhostBtn>
                <button onClick={() => setDeleting(c)} className="w-9 h-9 rounded-xl flex items-center justify-center text-red-500" style={{ border: "1px solid var(--line)" }}><Trash2 size={14} /></button>
              </div>
            </Card>
          ))}
        </div>
        <ConfirmDialog open={!!deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} title="Oshpazni o'chirish" message={deleting ? `${deleting.name} jamoadan o'chiriladi.` : ""} />
      </div>
    );
  }

  /* ============================================================
    CUSTOMERS VIEW
    ============================================================ */
  function CustomersView({ customers }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Barchasi");
    const [selected, setSelected] = useState(null);
    const filtered = customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "Barchasi" || c.status === statusFilter)
    );
    return (
      <div>
        <SectionHeader title="Mijozlar" subtitle={`${customers.length} ta ro'yxatdan o'tgan mijoz`} />
        <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2 flex-1 min-w-[200px]" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <Search size={14} style={{ color: "var(--ink-soft)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Mijoz qidirish..." className="bg-transparent outline-none text-sm font-body flex-1" style={{ color: "var(--ink)" }} />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl px-3 py-2 text-sm font-body outline-none" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)", color: "var(--ink)" }}>
            {["Barchasi", ...statuses.customer].map((s) => <option key={s}>{s}</option>)}
          </select>
        </Card>
        <Card className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                {["Mijoz", "Email", "Telefon", "Buyurtmalar", "Ro'yxatdan o'tgan", "Holat", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 font-body font-semibold uppercase text-[11px] tracking-wide" style={{ color: "var(--ink-soft)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[var(--cream-soft)] cursor-pointer transition-colors" style={{ borderBottom: "1px solid var(--line)" }} onClick={() => setSelected(c)}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold shrink-0" style={{ background: "var(--green-100)", color: "var(--green)" }}>{c.name[0]}</div>
                      <span className="font-body font-semibold" style={{ color: "var(--ink)" }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink-soft)" }}>{c.email}</td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink-soft)" }}>{c.phone}</td>
                  <td className="px-4 py-3.5 font-body font-semibold" style={{ color: "var(--brown)" }}>{c.orders}</td>
                  <td className="px-4 py-3.5 font-body" style={{ color: "var(--ink-soft)" }}>{c.registered}</td>
                  <td className="px-4 py-3.5"><StatusPill status={c.status} /></td>
                  <td className="px-4 py-3.5"><IconBtn icon={Eye} onClick={(e) => { e.stopPropagation(); setSelected(c); }} title="Ko'rish" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Modal open={!!selected} onClose={() => setSelected(null)} title="Mijoz ma'lumotlari">
          {selected && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl font-semibold" style={{ background: "var(--green-100)", color: "var(--green)" }}>{selected.name[0]}</div>
                <div>
                  <p className="font-display text-base font-semibold" style={{ color: "var(--brown)" }}>{selected.name}</p>
                  <StatusPill status={selected.status} />
                </div>
              </div>
              <div className="space-y-3 font-body text-sm">
                <div className="flex items-center gap-2.5" style={{ color: "var(--ink)" }}><Mail size={14} style={{ color: "var(--ink-soft)" }} /> {selected.email}</div>
                <div className="flex items-center gap-2.5" style={{ color: "var(--ink)" }}><Phone size={14} style={{ color: "var(--ink-soft)" }} /> {selected.phone}</div>
                <div className="flex items-center gap-2.5" style={{ color: "var(--ink)" }}><ShoppingBag size={14} style={{ color: "var(--ink-soft)" }} /> {selected.orders} ta buyurtma</div>
                <div className="flex items-center gap-2.5" style={{ color: "var(--ink)" }}><CalendarCheck size={14} style={{ color: "var(--ink-soft)" }} /> {selected.registered} sanasida ro'yxatdan o'tgan</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }

  /* ============================================================
    REVIEWS VIEW
    ============================================================ */
  function ReviewsView({ reviews, setReviews, notify }) {
    const [deleting, setDeleting] = useState(null);
    function toggle(id) {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: r.status === "Published" ? "Hidden" : "Published" } : r)));
    }
    function confirmDelete() {
      setReviews((prev) => prev.filter((r) => r.id !== deleting.id));
      notify("Sharh o'chirildi", "error");
      setDeleting(null);
    }
    return (
      <div>
        <SectionHeader title="Sharhlar" subtitle={`${reviews.length} ta mijoz sharhi`} />
        <div className="space-y-3">
          {reviews.map((r) => (
            <Card key={r.id} className="p-5 rise">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-semibold shrink-0" style={{ background: "var(--gold-100)", color: "var(--gold)" }}>{r.customer[0]}</div>
                  <div>
                    <p className="font-body font-semibold text-sm" style={{ color: "var(--ink)" }}>{r.customer}</p>
                    <p className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>{r.food} · {r.date}</p>
                  </div>
                </div>
                <StatusPill status={r.status} />
              </div>
              <div className="flex items-center gap-0.5 mt-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill={i < r.rating ? "var(--gold)" : "none"} strokeWidth={1.5} style={{ color: "var(--gold)" }} />)}
              </div>
              <p className="text-sm font-body mt-2 leading-relaxed" style={{ color: "var(--ink)" }}>{r.comment}</p>
              <div className="flex gap-2 mt-4">
                <GhostBtn icon={r.status === "Published" ? XCircle : Check} onClick={() => toggle(r.id)}>{r.status === "Published" ? "Yashirish" : "Tasdiqlash"}</GhostBtn>
                <button onClick={() => setDeleting(r)} className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold font-body text-red-500" style={{ border: "1px solid var(--line)" }}><Trash2 size={14} /> O'chirish</button>
              </div>
            </Card>
          ))}
        </div>
        <ConfirmDialog open={!!deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} title="Sharhni o'chirish" message="Bu sharh butunlay o'chiriladi." />
      </div>
    );
  }

  /* ============================================================
    TAPCHANS VIEW
    ============================================================ */
  function TapchansView({ tapchans, setTapchans, notify }) {
    function cycle(id) {
      setTapchans((prev) => prev.map((t) => {
        if (t.id !== id) return t;
        const idx = statuses.tapchan.indexOf(t.status);
        const next = statuses.tapchan[(idx + 1) % statuses.tapchan.length];
        return { ...t, status: next };
      }));
    }
    return (
      <div>
        <SectionHeader title="Tapchanlar" subtitle="An'anaviy o'tirish joylarini boshqarish" action={<PrimaryBtn icon={Plus}>Tapchan qo'shish</PrimaryBtn>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tapchans.map((t) => (
            <Card key={t.id} className="p-5 rise">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--gold-100)" }}>
                  <Armchair size={18} style={{ color: "var(--gold)" }} />
                </div>
                <StatusPill status={t.status} />
              </div>
              <p className="font-display text-[15px] font-semibold mt-3" style={{ color: "var(--brown)" }}>{t.name}</p>
              <p className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>{t.location} · {t.capacity} kishilik</p>
              <button onClick={() => cycle(t.id)} className="w-full mt-3.5 py-2 rounded-lg text-xs font-semibold font-body" style={{ border: "1px solid var(--line)", color: "var(--brown)" }}>Holatni o'zgartirish</button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  /* ============================================================
    NOTIFICATIONS VIEW
    ============================================================ */
  function NotificationsView({ notifications, setNotifications }) {
    const icons = { order: ShoppingBag, reservation: CalendarCheck, review: Star, customer: UserPlus };
    const colors = { order: "var(--green)", reservation: "var(--gold)", review: "var(--gold)", customer: "var(--green)" };
    function markAll() { setNotifications((prev) => prev.map((n) => ({ ...n, unread: false }))); }
    return (
      <div>
        <SectionHeader title="Bildirishnomalar" subtitle="So'nggi tizim faoliyati" action={<GhostBtn onClick={markAll}>Barchasini o'qilgan deb belgilash</GhostBtn>} />
        <Card>
          {notifications.map((n, i) => {
            const Icon = icons[n.type] || Info;
            return (
              <div key={n.id} className="flex items-start gap-3.5 px-5 py-4" style={{ borderBottom: i < notifications.length - 1 ? "1px solid var(--line)" : "none", background: n.unread ? "var(--cream-soft)" : "transparent" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--green-100)" }}>
                  <Icon size={16} style={{ color: colors[n.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body" style={{ color: "var(--ink)" }}>{n.text}</p>
                  <p className="text-xs font-body mt-0.5" style={{ color: "var(--ink-soft)" }}>{n.time}</p>
                </div>
                {n.unread && <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: "var(--gold)" }} />}
              </div>
            );
          })}
        </Card>
      </div>
    );
  }

  /* ============================================================
    SETTINGS VIEW
    ============================================================ */
  function SettingsView({ notify, user }) {
    const [tab, setTab] = useState("restaurant");
    const tabs = [
      { key: "restaurant", label: "Restoran ma'lumotlari" },
      { key: "profile", label: "Admin profili" },
      { key: "website", label: "Veb-sayt sozlamalari" },
    ];
    const initials = getInitials(user?.name);
    const [firstName, ...restName] = (user?.name || "Ibrohim Akmalov").split(" ");
    const lastName = restName.join(" ") || "Akmalov";

    return (
      <div>
        <SectionHeader title="Sozlamalar" subtitle="Restoran va tizim sozlamalarini boshqarish" />
        <Card className="p-2 mb-5 inline-flex gap-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-colors" style={tab === t.key ? { background: "var(--green)", color: "white" } : { color: "var(--ink-soft)" }}>
              {t.label}
            </button>
          ))}
        </Card>

        <Card className="p-6 max-w-2xl">
          <form onSubmit={(e) => { e.preventDefault(); notify("Sozlamalar saqlandi"); }} className="space-y-4">
            {tab === "restaurant" && (
              <>
                <Input label="Restoran nomi" defaultValue="Milly Taomlar" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Telefon" defaultValue="+998 71 200 10 10" />
                  <Input label="Email" defaultValue="info@millytaomlar.uz" />
                </div>
                <Input label="Manzil" defaultValue="Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi 45" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Ish vaqti (dushanba-shanba)" defaultValue="09:00 – 23:00" />
                  <Input label="Ish vaqti (yakshanba)" defaultValue="10:00 – 22:00" />
                </div>
              </>
            )}
            {tab === "profile" && (
              <>
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-semibold mb-2" style={{ background: "var(--gold-300)", color: "var(--brown)" }}>{initials}</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Ism" defaultValue={firstName} />
                  <Input label="Familiya" defaultValue={lastName} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Lavozim" defaultValue="Bosh administrator" />
                  <Input label="Yosh" type="number" defaultValue="16" />
                </div>
                <Input label="Email" defaultValue={user?.email || "ibrohim.akmalov@millytaomlar.uz"} />
                <Input label="Yangi parol" type="password" placeholder="••••••••" />
              </>
            )}
            {tab === "website" && (
              <>
                <Input label="Veb-sayt sarlavhasi" defaultValue="Milly Taomlar — O'zbek milliy taomlari" />
                <Select label="Standart til" options={["O'zbek", "Русский", "English"]} defaultValue="O'zbek" />
                <div className="w-full h-24 rounded-xl flex flex-col items-center justify-center gap-1.5" style={{ background: "var(--cream-soft)", border: "1.5px dashed var(--line)" }}>
                  <ImagePlus size={18} style={{ color: "var(--ink-soft)" }} />
                  <span className="text-xs font-body" style={{ color: "var(--ink-soft)" }}>Logotip yuklash</span>
                </div>
              </>
            )}
            <div className="pt-2"><PrimaryBtn type="submit">O'zgarishlarni saqlash</PrimaryBtn></div>
          </form>
        </Card>
      </div>
    );
  }

  /* ============================================================
    APP
    ============================================================ */
  export default function App() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [theme, setTheme] = useState("light");
    const [active, setActive] = useState("dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    const [orders, setOrders] = useState(seedOrders);
    const [foods, setFoods] = useState(initialFoods);
    const [categories, setCategories] = useState(initialCategories);
    const [reservations, setReservations] = useState(seedReservations);
    const [chefs, setChefs] = useState(seedChefs);
    const [customers] = useState(seedCustomers);
    const [reviews, setReviews] = useState(seedReviews);
    const [tapchans, setTapchans] = useState(seedTapchans);
    const [notifications, setNotifications] = useState(seedNotifications);

    function notify(message, type = "success") {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
    }

    function handleLogout() {
      logout();
      router.push("/login");
    }

    const activeLabel = NAV_ITEMS.find((n) => n.key === active)?.label || "";
    const userFirstName = getFirstName(user?.name);

    const views = {
      dashboard: <DashboardView orders={orders} reservations={reservations} foods={foods} chefs={chefs} theme={theme} userName={userFirstName} />,
      orders: <OrdersView orders={orders} setOrders={setOrders} notify={notify} />,
      reservations: <ReservationsView reservations={reservations} setReservations={setReservations} notify={notify} />,
      foods: <FoodsView foods={foods} setFoods={setFoods} categories={categories} notify={notify} />,
      categories: <CategoriesView categories={categories} setCategories={setCategories} notify={notify} />,
      chefs: <ChefsView chefs={chefs} setChefs={setChefs} notify={notify} />,
      customers: <CustomersView customers={customers} />,
      reviews: <ReviewsView reviews={reviews} setReviews={setReviews} notify={notify} />,
      tapchans: <TapchansView tapchans={tapchans} setTapchans={setTapchans} notify={notify} />,
      notifications: <NotificationsView notifications={notifications} setNotifications={setNotifications} />,
      settings: <SettingsView notify={notify} user={user} />,
    };

    return (
      <div className={theme === "dark" ? "dark" : ""}>
        <style>{FONT_IMPORT + THEME_VARS}</style>
        <div className="flex min-h-screen font-body" style={{ background: "var(--cream)" }}>
          <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} theme={theme} user={user} onLogout={handleLogout} />
          <div className="flex-1 min-w-0 flex flex-col">
            <Header setMobileOpen={setMobileOpen} theme={theme} setTheme={setTheme} notifications={notifications} activeLabel={activeLabel} user={user} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
              {views[active]}
            </main>
          </div>
        </div>
        <Toasts toasts={toasts} remove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
      </div>
    );
  }