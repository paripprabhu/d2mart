"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CartItem } from "@/app/lib/types";

interface CartState {
  restaurantId: number | null;
  restaurantName: string;
  items: CartItem[];
}

interface CartContextValue {
  cart: CartState;
  addItem: (item: Omit<CartItem, "quantity">, restaurantName: string) => void;
  updateQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  showClearModal: boolean;
  pendingItem: { item: Omit<CartItem, "quantity">; restaurantName: string } | null;
  confirmClear: () => void;
  cancelClear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "swiggy_cart";

const EMPTY_CART: CartState = { restaurantId: null, restaurantName: "", items: [] };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>(EMPTY_CART);
  const [showClearModal, setShowClearModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<{
    item: Omit<CartItem, "quantity">;
    restaurantName: string;
  } | null>(null);

  // Rehydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, restaurantName: string) => {
      setCart((prev) => {
        // Different restaurant — prompt to clear
        if (prev.restaurantId !== null && prev.restaurantId !== item.restaurantId) {
          setPendingItem({ item, restaurantName });
          setShowClearModal(true);
          return prev;
        }

        const existing = prev.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            ...prev,
            items: prev.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return {
          restaurantId: item.restaurantId,
          restaurantName,
          items: [...prev.items, { ...item, quantity: 1 }],
        };
      });
    },
    []
  );

  const updateQuantity = useCallback((itemId: number, delta: number) => {
    setCart((prev) => {
      const updated = prev.items
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0);
      if (updated.length === 0) return EMPTY_CART;
      return { ...prev, items: updated };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart(EMPTY_CART);
  }, []);

  const confirmClear = useCallback(() => {
    if (!pendingItem) return;
    const { item, restaurantName } = pendingItem;
    setCart({
      restaurantId: item.restaurantId,
      restaurantName,
      items: [{ ...item, quantity: 1 }],
    });
    setPendingItem(null);
    setShowClearModal(false);
  }, [pendingItem]);

  const cancelClear = useCallback(() => {
    setPendingItem(null);
    setShowClearModal(false);
  }, []);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
        showClearModal,
        pendingItem,
        confirmClear,
        cancelClear,
      }}
    >
      {children}

      {/* Clear cart confirmation modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#3d4152] mb-2">
              Items already in cart
            </h3>
            <p className="text-[#93959f] text-sm mb-6">
              Your cart contains items from{" "}
              <span className="font-semibold text-[#3d4152]">
                {cart.restaurantName}
              </span>
              . Do you want to discard the selection and add items from{" "}
              <span className="font-semibold text-[#3d4152]">
                {pendingItem?.restaurantName}
              </span>
              ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelClear}
                className="flex-1 py-2.5 border border-[#FC8019] text-[#FC8019] rounded font-semibold text-sm hover:bg-orange-50 transition"
              >
                No
              </button>
              <button
                onClick={confirmClear}
                className="flex-1 py-2.5 bg-[#FC8019] text-white rounded font-semibold text-sm hover:bg-orange-600 transition"
              >
                Yes, start fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
