"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { MenuItem as MenuItemType } from "@/app/lib/types";
import VegDot from "./VegDot";
import { useCart } from "@/app/context/CartContext";

interface Props {
  item: MenuItemType;
  restaurantId: number;
  restaurantName: string;
}

export default function MenuItem({ item, restaurantId, restaurantName }: Props) {
  const { cart, addItem, updateQuantity } = useCart();
  const cartItem = cart.items.find((i) => i.id === item.id);
  const qty = cartItem?.quantity ?? 0;

  function handleAdd() {
    addItem(
      {
        id: item.id,
        restaurantId,
        name: item.name,
        price: item.price,
        is_veg: item.is_veg,
      },
      restaurantName
    );
  }

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <VegDot isVeg={item.is_veg} />
          {item.is_bestseller === 1 && (
            <span className="text-xs font-bold text-[#FC8019] bg-orange-50 px-1.5 py-0.5 rounded">
              ⭐ Bestseller
            </span>
          )}
        </div>
        <h4 className="font-semibold text-[#3d4152] text-sm leading-snug">{item.name}</h4>
        <p className="text-sm font-bold text-[#3d4152] mt-1">₹{item.price}</p>
        {item.description && (
          <p className="text-xs text-[#93959f] mt-1.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Image + Add button */}
      <div className="relative shrink-0">
        {item.image && (
          <div className="w-28 h-20 rounded-xl overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              width={112}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Add / stepper button */}
        <div className={`${item.image ? "absolute -bottom-3 left-1/2 -translate-x-1/2" : "mt-2"}`}>
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 bg-white border-2 border-[#60b246] text-[#60b246] font-bold text-sm px-4 py-1 rounded-lg shadow-sm hover:bg-green-50 transition whitespace-nowrap"
            >
              <Plus size={14} />
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#60b246] text-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="px-2 py-1 hover:bg-green-700 transition"
              >
                <Minus size={14} />
              </button>
              <span className="px-2 text-sm font-bold min-w-[1.5rem] text-center">{qty}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="px-2 py-1 hover:bg-green-700 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
