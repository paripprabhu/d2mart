"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { GroceryProduct } from "@/app/lib/types";
import { useGroceryCart } from "@/app/context/GroceryCartContext";

export default function ProductCard({ product }: { product: GroceryProduct }) {
  const { items, addItem, updateQuantity } = useGroceryCart();
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const outOfStock = !product.in_stock;

  function handleAdd() {
    if (outOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      weight: product.weight,
      price: product.price,
      image: product.image,
    });
  }

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-shadow hover:shadow-md ${outOfStock ? "opacity-60" : ""}`}>
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className={`object-cover ${outOfStock ? "grayscale" : ""}`}
        />
        {/* Discount badge */}
        {product.discount_pct && product.discount_pct > 0 ? (
          <span className="absolute top-2 left-2 bg-[#ff3e6c] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
            {product.discount_pct}% OFF
          </span>
        ) : null}
        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-white text-[#93959f] text-xs font-bold px-2 py-1 rounded-lg border border-gray-200">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-[10px] text-[#93959f] mb-0.5">{product.weight}</p>
        <p className="text-xs font-semibold text-[#3d4152] leading-snug line-clamp-2 flex-1">
          {product.name}
        </p>

        {/* Price row + Add button */}
        <div className="mt-2 flex items-center justify-between gap-1">
          <div>
            <p className="text-sm font-black text-[#3d4152]">₹{product.price}</p>
            {product.original_price > product.price && (
              <p className="text-[10px] text-[#93959f] line-through leading-none">
                ₹{product.original_price}
              </p>
            )}
          </div>

          {/* Add / stepper */}
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="flex items-center gap-0.5 border-2 border-[#0c831f] text-[#0c831f] font-black text-xs px-3 py-2 rounded-lg hover:bg-green-50 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <Plus size={12} />
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#0c831f] text-white rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="px-2 py-2 hover:bg-green-800 transition"
              >
                <Minus size={11} />
              </button>
              <span className="px-2 text-xs font-black min-w-[1.25rem] text-center">{qty}</span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="px-2 py-2 hover:bg-green-800 transition"
              >
                <Plus size={11} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
