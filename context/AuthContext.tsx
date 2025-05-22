import apiService from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: AuthUser | null;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuth: false,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const isAuth = !!user;

  useEffect(() => {
    // Charger l'utilisateur depuis le stockage local au démarrage
    (async () => {
      const stored = await AsyncStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiService.login(email, password);
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await apiService.register(name, email, password);
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
