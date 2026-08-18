"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthShell from "@/components/auth/AuthShell";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Parollar bir xil emas.");
      return;
    }
    if (form.password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const res = register(form);
      setLoading(false);
      if (res.ok) {
        router.push("/");
      } else {
        setError(res.error);
      }
    }, 400);
  }

  return (
    <AuthShell
      title="Hisob yaratish"
      subtitle="Milly Taomlar admin paneliga ro'yxatdan o'ting"
      footer={
        <p className="text-sm font-body" style={{ color: "var(--ink-soft)" }}>
          Hisobingiz bormi?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "var(--gold)" }}>
            Kirish
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-body bg-red-500/10 text-red-500">
            <AlertCircle size={14} className="shrink-0" /> {error}
          </div>
        )}

        <label className="block">
          <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>To'liq ism</span>
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <User size={15} style={{ color: "var(--ink-soft)" }} />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Sardor Nazarov"
              className="bg-transparent outline-none text-sm font-body flex-1"
              style={{ color: "var(--ink)" }}
            />
          </div>
        </label>

        <label className="block">
          <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>Email</span>
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <Mail size={15} style={{ color: "var(--ink-soft)" }} />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="siz@misol.uz"
              className="bg-transparent outline-none text-sm font-body flex-1"
              style={{ color: "var(--ink)" }}
            />
          </div>
        </label>

        <label className="block">
          <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>Parol</span>
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <Lock size={15} style={{ color: "var(--ink-soft)" }} />
            <input
              type={showPass ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="bg-transparent outline-none text-sm font-body flex-1"
              style={{ color: "var(--ink)" }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={15} style={{ color: "var(--ink-soft)" }} /> : <Eye size={15} style={{ color: "var(--ink-soft)" }} />}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="block text-xs font-semibold font-body mb-1.5" style={{ color: "var(--ink-soft)" }}>Parolni tasdiqlang</span>
          <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: "var(--cream-soft)", border: "1px solid var(--line)" }}>
            <Lock size={15} style={{ color: "var(--ink-soft)" }} />
            <input
              type={showPass ? "text" : "password"}
              required
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="••••••••"
              className="bg-transparent outline-none text-sm font-body flex-1"
              style={{ color: "var(--ink)" }}
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold font-body text-white transition-opacity disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, var(--green-700), var(--green))" }}
        >
          {loading ? "Yaratilmoqda..." : "Hisob yaratish"}
        </button>
      </form>
    </AuthShell>
  );
}