"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Sessiya tekshirilib bo'lgandan keyin, agar foydalanuvchi yo'q bo'lsa — loginga otish
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  // Sessiya hali tekshirilmoqda — hech narsa (yoki loader) ko'rsatamiz,
  // aks holda bir lahza admin panel "ko'rinib" keyin loginga otishi mumkin
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F6EFE0" }}>
        <p className="text-sm" style={{ color: "#5B4A38", fontFamily: "Inter, system-ui, sans-serif" }}>
          Yuklanmoqda...
        </p>
      </div>
    );
  }

  // ready=true lekin user=null — redirect hali amalga oshmoqda, hech narsa render qilmaymiz
  if (!user) {
    return null;
  }

  return children;
}