"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) {
      router.replace("/register");
    }
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F6EFE0" }}>
        <p style={{ fontFamily: "Inter, sans-serif", color: "#5B4A38", fontSize: 14 }}>Yuklanmoqda...</p>
      </div>
    );
  }

  if (!user) return null;

  return children;
}