"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useGroceryCart } from "@/app/context/GroceryCartContext";

export default function FloatingCartBar() {
  const { items, itemCount, total } = useGroceryCart();
  const router = useRouter();

  if (itemCount === 0) return null;

  const DELIVERY_FEE = total >= 199 ? 0 : 25;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pointer-events-none">
      <button
        onClick={() => router.push("/instamart/cart")}
        className="pointer-events-auto w-full max-w-xl mx-auto flex items-center bg-[#0c831f] text-white rounded-2xl shadow-2xl px-4 py-3.5 hover:bg-green-800 active:scale-[0.98] transition-all"
      >
        {/* Count badge */}
        <div className="bg-green-700 rounded-xl px-2.5 py-1 mr-3 shrink-0 text-center min-w-[2rem]">
          <span className="text-sm font-black">{itemCount}</span>
        </div>

        {/* Middle */}
        <div className="flex-1 text-left">
          <p className="text-sm font-black leading-none">
            {items.length} item{items.length > 1 ? "s" : ""} added
          </p>
          <p className="text-xs text-green-200 mt-0.5">
            {DELIVERY_FEE === 0 ? "Free delivery" : `+₹${DELIVERY_FEE} delivery`} · ~8 min
          </p>
        </div>

        {/* Total + CTA */}
        <div className="flex items-center gap-1 font-black text-sm shrink-0">
          <span>₹{total + DELIVERY_FEE}</span>
          <span className="text-green-200 font-normal mx-1">·</span>
          View Cart
          <ChevronRight size={15} />
        </div>
      </button>
    </div>
  );
}
