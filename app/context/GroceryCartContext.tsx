"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { GroceryCartItem } from "@/app/lib/types";

interface GroceryCartContextValue {
  items: GroceryCartItem[];
  addItem: (item: Omit<GroceryCartItem, "quantity">) => void;
  updateQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const GroceryCartContext = createContext<GroceryCartContextValue | null>(null);

const STORAGE_KEY = "swiggy_instamart_cart";

export function GroceryCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<GroceryCartItem[]>([]);

  // Rehydrate from localStorage (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<GroceryCartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <GroceryCartContext.Provider
      value={{ items, addItem, updateQuantity, clearCart, itemCount, total }}
    >
      {children}
    </GroceryCartContext.Provider>
  );
}

export function useGroceryCart() {
  const ctx = useContext(GroceryCartContext);
  if (!ctx) throw new Error("useGroceryCart must be used within GroceryCartProvider");
  return ctx;
}
