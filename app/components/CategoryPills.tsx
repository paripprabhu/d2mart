"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CATEGORIES = [
  { label: "All", emoji: "🍽️" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Biryani", emoji: "🍚" },
  { label: "Burger", emoji: "🍔" },
  { label: "Chicken", emoji: "🍗" },
  { label: "North Indian", emoji: "🫕" },
  { label: "Chinese", emoji: "🥡" },
  { label: "Desserts", emoji: "🍨" },
  { label: "South Indian", emoji: "🥥" },
  { label: "Rolls", emoji: "🌯" },
];

function PillsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "All";

  function handleClick(label: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (label === "All") {
      params.delete("category");
    } else {
      params.set("category", label);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-2">
      {CATEGORIES.map(({ label, emoji }) => {
        const isActive = label === active || (label === "All" && active === "All");
        return (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`flex flex-col items-center gap-1.5 shrink-0 px-4 py-3 rounded-xl text-sm font-semibold transition
              ${isActive
                ? "bg-[#FC8019] text-white shadow-md"
                : "bg-white text-[#3d4152] hover:bg-orange-50 hover:text-[#FC8019]"
              }`}
          >
            <span className="text-xl">{emoji}</span>
            <span className="text-xs">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function CategoryPills() {
  return (
    <Suspense fallback={<div className="h-20 bg-white rounded-xl animate-pulse" />}>
      <PillsInner />
    </Suspense>
  );
}
