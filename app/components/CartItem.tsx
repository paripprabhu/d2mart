"use client";

import { Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "@/app/lib/types";
import VegDot from "./VegDot";
import { useCart } from "@/app/context/CartContext";

export default function CartItemRow({ item }: { item: CartItemType }) {
  const { updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <VegDot isVeg={item.is_veg} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#3d4152] truncate">{item.name}</p>
        <p className="text-xs text-[#93959f]">₹{item.price} × {item.quantity}</p>
      </div>
      <div className="flex items-center bg-[#60b246] text-white rounded-lg overflow-hidden shrink-0">
        <button
          onClick={() => updateQuantity(item.id, -1)}
          className="px-2 py-1 hover:bg-green-700 transition"
        >
          <Minus size={12} />
        </button>
        <span className="px-1.5 text-sm font-bold min-w-[1.25rem] text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, 1)}
          className="px-2 py-1 hover:bg-green-700 transition"
        >
          <Plus size={12} />
        </button>
      </div>
      <p className="text-sm font-bold text-[#3d4152] w-14 text-right shrink-0">
        ₹{item.price * item.quantity}
      </p>
    </div>
  );
}
