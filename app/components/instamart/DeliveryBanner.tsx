"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function DeliveryBanner() {
  const [seconds, setSeconds] = useState(8 * 60);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 8 * 60));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="bg-[#0c831f] text-white">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={15} className="fill-yellow-300 text-yellow-300 shrink-0" />
          <span className="text-sm font-bold">
            Delivery in{" "}
            <span className="text-yellow-300">
              {mins}:{secs.toString().padStart(2, "0")} min
            </span>
          </span>
          <span className="hidden sm:inline text-xs text-green-200 ml-1">
            · Manipal, Karnataka
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-green-100">
          <span className="hidden md:inline">⚡ Lightning-fast grocery delivery</span>
          <span className="bg-yellow-300 text-[#0c831f] font-black px-2 py-0.5 rounded-full text-xs tracking-wide">
            D2MART
          </span>
        </div>
      </div>
    </div>
  );
}
