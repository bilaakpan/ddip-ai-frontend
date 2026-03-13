"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  createElement,
  type ReactNode,
} from "react";
import { authApi, type AdminUser } from "@/lib/api";

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isSuperAdmin: boolean;
  isAdminOrAbove: boolean;
  isEditorOrAbove: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ROLE_LEVELS: Record<string, number> = {
  VIEWER: 0,
  EDITOR: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("ddip_admin_token");
    const storedUser = localStorage.getItem("ddip_admin_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("ddip_admin_token");
        localStorage.removeItem("ddip_admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const { token: newToken, user: newUser } = response.data;

    localStorage.setItem("ddip_admin_token", newToken);
    localStorage.setItem("ddip_admin_user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ddip_admin_token");
    localStorage.removeItem("ddip_admin_user");
    setToken(null);
    setUser(null);
  }, []);

  const userLevel = user ? ROLE_LEVELS[user.role] ?? 0 : -1;

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isSuperAdmin: userLevel >= 3,
    isAdminOrAbove: userLevel >= 2,
    isEditorOrAbove: userLevel >= 1,
  };

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
