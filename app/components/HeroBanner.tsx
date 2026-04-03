"use client";

import { MapPin } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black text-[#3d4152] leading-tight mb-4">
            Order food &amp; <br />
            <span className="text-[#FC8019]">groceries.</span> Delivered.
          </h1>
          <p className="text-[#93959f] text-lg mb-6">
            Order from your favourite restaurants and stores near you.
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-[#f0f0f5] rounded-lg px-4 py-3 flex-1 max-w-xs">
              <MapPin size={18} className="text-[#FC8019] shrink-0" />
              <input
                type="text"
                defaultValue="Bengaluru, Karnataka"
                className="bg-transparent text-sm text-[#3d4152] focus:outline-none w-full"
              />
            </div>
            <button className="bg-[#FC8019] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition">
              Find Food
            </button>
          </div>
        </div>

        {/* Illustration / promo image placeholder */}
        <div className="hidden md:flex flex-col items-center justify-center w-72 h-48 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
          <span className="text-6xl">🛵</span>
          <p className="mt-2 text-sm font-semibold text-[#FC8019]">Fast delivery</p>
          <p className="text-xs text-[#93959f]">Average 30 minutes</p>
        </div>
      </div>
    </section>
  );
}
