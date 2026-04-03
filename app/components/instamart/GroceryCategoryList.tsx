"use client";

import { GroceryCategory } from "@/app/lib/types";

interface Props {
  categories: GroceryCategory[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  variant?: "vertical" | "horizontal";
}

export default function GroceryCategoryList({
  categories,
  activeSlug,
  onSelect,
  variant = "vertical",
}: Props) {
  if (variant === "horizontal") {
    return (
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => {
          const isActive = cat.slug === activeSlug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelect(cat.slug)}
              className={`flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-full text-xs font-semibold transition-all border ${
                isActive
                  ? "bg-[#0c831f] border-[#0c831f] text-white"
                  : "bg-white border-gray-200 text-[#3d4152] active:bg-gray-50"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <aside className="w-20 md:w-28 shrink-0">
      <div className="sticky top-28 flex flex-col gap-1">
        {categories.map((cat) => {
          const isActive = cat.slug === activeSlug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelect(cat.slug)}
              className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-center transition-all border-l-4 ${
                isActive
                  ? "bg-green-50 border-[#0c831f]"
                  : "bg-white border-transparent hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl leading-none">{cat.emoji}</span>
              <span
                className={`text-xs leading-tight font-semibold ${
                  isActive ? "text-[#0c831f]" : "text-[#3d4152]"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
