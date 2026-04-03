"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { GroceryProduct } from "@/app/lib/types";

export interface ScheduleCartItem {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
  quantity: number;
}

interface Props {
  products: GroceryProduct[];
  cart: ScheduleCartItem[];
  onUpdate: (cart: ScheduleCartItem[]) => void;
}

export default function ScheduleItemPicker({ products, cart, onUpdate }: Props) {
  function getQty(id: number) {
    return cart.find((i) => i.id === id)?.quantity ?? 0;
  }

  function add(product: GroceryProduct) {
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      onUpdate(cart.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      onUpdate([...cart, {
        id: product.id,
        name: product.name,
        weight: product.weight,
        price: product.price,
        image: product.image,
        quantity: 1,
      }]);
    }
  }

  function remove(id: number) {
    const updated = cart
      .map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      .filter((i) => i.quantity > 0);
    onUpdate(updated);
  }

  // Group by category_id for display
  const categoryMap = new Map<number, GroceryProduct[]>();
  for (const p of products) {
    if (!categoryMap.has(p.category_id)) categoryMap.set(p.category_id, []);
    categoryMap.get(p.category_id)!.push(p);
  }

  return (
    <div className="space-y-6">
      {Array.from(categoryMap.entries()).map(([, prods]) => (
        <div key={prods[0].category_id}>
          <p className="text-xs font-bold text-[#93959f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>{(prods[0] as GroceryProduct & { category_emoji?: string }).category_emoji ?? "🛒"}</span>
            {(prods[0] as GroceryProduct & { category_name?: string }).category_name ?? "Products"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {prods.filter((p) => p.in_stock).map((product) => {
              const qty = getQty(product.id);
              return (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                  <div className="relative bg-gray-50 aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                    {product.discount_pct ? (
                      <span className="absolute top-1.5 left-1.5 bg-[#ff3e6c] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                        {product.discount_pct}% OFF
                      </span>
                    ) : null}
                  </div>
                  <div className="p-2.5 flex flex-col flex-1">
                    <p className="text-[10px] text-[#93959f]">{product.weight}</p>
                    <p className="text-xs font-semibold text-[#3d4152] leading-snug line-clamp-2 flex-1">
                      {product.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <p className="text-sm font-black text-[#3d4152]">₹{product.price}</p>
                      {qty === 0 ? (
                        <button
                          onClick={() => add(product)}
                          className="flex items-center gap-0.5 border-2 border-[#0c831f] text-[#0c831f] font-black text-xs px-2.5 py-1.5 rounded-lg hover:bg-green-50 transition"
                        >
                          <Plus size={11} /> ADD
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#0c831f] text-white rounded-lg overflow-hidden">
                          <button onClick={() => remove(product.id)} className="px-1.5 py-1.5 hover:bg-green-800 transition">
                            <Minus size={11} />
                          </button>
                          <span className="px-1.5 text-xs font-black min-w-[1.25rem] text-center">{qty}</span>
                          <button onClick={() => add(product)} className="px-1.5 py-1.5 hover:bg-green-800 transition">
                            <Plus size={11} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
