/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "auth.user";

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => readJson(USER_KEY));

  useEffect(() => {
    const syncFromStorage = () => {
      setToken(localStorage.getItem(TOKEN_KEY));
      setUser(readJson(USER_KEY));
    };

    // “storage” ne se déclenche pas toujours dans le même onglet
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("auth:changed", syncFromStorage);

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("auth:changed", syncFromStorage);
    };
  }, []);

  const value = useMemo(() => {
    return {
      token,
      user,
      isAuthenticated: Boolean(token),

      setSession: ({ token, user }) => {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        else localStorage.removeItem(TOKEN_KEY);

        if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
        else localStorage.removeItem(USER_KEY);

        window.dispatchEvent(new Event("auth:changed"));
        setToken(token ?? null);
        setUser(user ?? null);
      },

      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.dispatchEvent(new Event("auth:changed"));
        setToken(null);
        setUser(null);
      },
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}