"use client";

import { MenuSection } from "@/app/lib/types";

interface Props {
  sections: MenuSection[];
}

export default function MenuSidebar({ sections }: Props) {
  function scrollTo(id: number) {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const offset = 80; // header height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-24 bg-white rounded-xl shadow-sm overflow-hidden">
        <p className="px-4 py-3 text-xs font-bold text-[#93959f] uppercase tracking-wider border-b border-gray-100">
          Menu
        </p>
        <nav className="py-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="w-full text-left px-4 py-2.5 text-sm text-[#3d4152] hover:bg-orange-50 hover:text-[#FC8019] transition font-medium"
            >
              {s.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
