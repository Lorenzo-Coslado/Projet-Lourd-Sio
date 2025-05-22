import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

type FavoritesContextType = {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  addFavorite: (id: number) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  refreshFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  addFavorite: async () => {},
  removeFavorite: async () => {},
  refreshFavorites: async () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuth } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);

  // Charger les favoris au login
  useEffect(() => {
    if (isAuth && user?.id) {
      refreshFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuth, user?.id]);

  const refreshFavorites = async () => {
    if (!user?.id) return;
    try {
      const favs = await apiService.getFavoris(user.id);
      setFavorites(favs);
      await AsyncStorage.setItem("favorites", JSON.stringify(favs));
    } catch {
      setFavorites([]);
    }
  };

  const addFavorite = async (id: number) => {
    if (!user?.id) return;
    setFavorites((prev) => [...prev, id]);
    await apiService.addFavoris(user.id, id);
    await refreshFavorites();
  };

  const removeFavorite = async (id: number) => {
    if (!user?.id) return;
    setFavorites((prev) => prev.filter((f) => f !== id));
    await apiService.removeFavoris(user.id, id);
    await refreshFavorites();
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};