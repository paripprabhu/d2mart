"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MapPin, Search, ShoppingCart, ChevronDown, Zap, CalendarDays, ShoppingBasket } from "lucide-react";
import { useGroceryCart } from "@/app/context/GroceryCartContext";
import { useState, Suspense } from "react";

function HeaderInner() {
  const { itemCount, total } = useGroceryCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");

  const isShop     = pathname === "/instamart/shop" || (pathname === "/instamart" && false);
  const isSchedule = pathname.startsWith("/instamart/schedule");
  const showSearch = isShop;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchVal.trim()) params.set("search", searchVal.trim());
    router.push(`/instamart/shop?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main bar */}
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">

        {/* Logo */}
        <Link href="/instamart" className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 bg-[#0c831f] rounded-lg flex items-center justify-center">
            <Zap size={15} className="text-white fill-white" />
          </div>
          <span className="text-lg font-black text-[#0c831f] tracking-tight">
            D2<span className="text-[#3d4152]">mart</span>
          </span>
        </Link>

        {/* Location — desktop */}
        <button className="hidden md:flex items-center gap-1 text-xs font-semibold text-[#3d4152] hover:text-[#0c831f] transition shrink-0">
          <MapPin size={13} className="text-[#0c831f]" />
          <span className="border-b border-[#3d4152]">Manipal</span>
          <ChevronDown size={11} className="text-[#0c831f]" />
        </button>

        {/* Search — only on shop page */}
        {showSearch ? (
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#93959f]" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search groceries, snacks..."
                className="w-full pl-8 pr-4 py-2 bg-[#f0f0f5] rounded-lg text-sm text-[#3d4152] placeholder-[#93959f] focus:outline-none focus:ring-2 focus:ring-[#0c831f]/30"
              />
            </div>
          </form>
        ) : (
          <div className="flex-1" />
        )}

        {/* Cart */}
        <Link
          href="/instamart/cart"
          className="flex items-center gap-1.5 bg-[#0c831f] text-white px-3 py-2 rounded-xl font-bold text-sm hover:bg-green-800 transition relative shrink-0"
        >
          <ShoppingCart size={15} />
          <span className="hidden sm:inline text-sm">Cart</span>
          {itemCount > 0 && (
            <>
              <span className="hidden sm:inline text-green-200">·</span>
              <span className="hidden sm:inline text-sm">₹{total}</span>
              <span className="sm:hidden absolute -top-1.5 -right-1.5 bg-yellow-400 text-[#0c831f] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-black">
                {itemCount}
              </span>
            </>
          )}
        </Link>
      </div>

      {/* Nav tabs */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          <Link
            href="/instamart/shop"
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              isShop
                ? "border-[#0c831f] text-[#0c831f]"
                : "border-transparent text-[#93959f] hover:text-[#3d4152]"
            }`}
          >
            <ShoppingBasket size={13} />
            Shop
          </Link>
          <Link
            href="/instamart/schedule"
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              isSchedule
                ? "border-[#0c831f] text-[#0c831f]"
                : "border-transparent text-[#93959f] hover:text-[#3d4152]"
            }`}
          >
            <CalendarDays size={13} />
            Schedule
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="h-14 flex items-center px-4 gap-2">
          <div className="w-7 h-7 bg-[#0c831f] rounded-lg" />
          <span className="text-lg font-black text-[#0c831f]">D2<span className="text-[#3d4152]">mart</span></span>
        </div>
        <div className="border-t border-gray-100 h-9" />
      </header>
    }>
      <HeaderInner />
    </Suspense>
  );
}
