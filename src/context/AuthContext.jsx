  "use client";

  import React, { createContext, useContext, useEffect, useState } from "react";

  const AuthContext = createContext(null);

  const USERS_KEY = "milly_taomlar_users";
  const SESSION_KEY = "milly_taomlar_session";

  function loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch {
        // ignore corrupted session
      }
      setReady(true);
    }, []);

    function register({ name, email, password }) {
      const users = loadUsers();
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { ok: false, error: "Bu email bilan hisob allaqachon mavjud." };
      }
      const newUser = { id: Date.now(), name, email, password };
      saveUsers([...users, newUser]);
      const session = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return { ok: true };
    }

    function login({ email, password }) {
      const users = loadUsers();
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!found) {
        return { ok: false, error: "Email yoki parol noto'g'ri." };
      }
      const session = { id: found.id, name: found.name, email: found.email };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return { ok: true };
    }

    function logout() {
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }

    return (
      <AuthContext.Provider value={{ user, ready, register, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak");
    return ctx;
  }