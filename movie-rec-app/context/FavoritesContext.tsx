import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FavoritesContextValue = {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites, isFavorite, toggleFavorite]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}