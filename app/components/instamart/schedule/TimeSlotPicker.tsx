"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export const TIME_SLOTS = [
  {
    id: "morning",
    label: "Morning",
    range: "7:00 AM – 9:00 AM",
    emoji: "🌅",
    subSlots: ["7:00 – 8:00 AM", "8:00 – 9:00 AM"],
  },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "12:00 – 2:00 PM",
    emoji: "☀️",
    subSlots: ["12:00 – 1:00 PM", "1:00 – 2:00 PM"],
  },
  {
    id: "evening",
    label: "Evening",
    range: "5:00 – 7:00 PM",
    emoji: "🌆",
    subSlots: ["5:00 – 6:00 PM", "6:00 – 7:00 PM"],
  },
  {
    id: "night",
    label: "Night",
    range: "9:00 – 11:00 PM",
    emoji: "🌙",
    subSlots: ["9:00 – 10:00 PM", "10:00 – 11:00 PM"],
  },
];

interface Props {
  selected: string;       // slot id e.g. "morning"
  onChange: (slotId: string) => void;
}

export default function TimeSlotPicker({ selected, onChange }: Props) {
  const [slotOpen, setSlotOpen]       = useState(false);
  const [subOpen, setSubOpen]         = useState(false);
  const [subSlot, setSubSlot]         = useState<string | null>(null);

  const activeSlot = TIME_SLOTS.find((s) => s.id === selected) ?? TIME_SLOTS[0];

  function handleSlotSelect(id: string) {
    onChange(id);
    setSubSlot(null);   // reset sub-slot when period changes
    setSlotOpen(false);
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-bold text-[#3d4152] mb-0.5">When should we deliver?</p>
        <p className="text-xs text-[#93959f]">
          We&apos;ll arrive within your chosen window on every scheduled day.
        </p>
      </div>

      {/* Dropdown 1 — time period */}
      <div>
        <p className="text-[10px] font-bold text-[#93959f] uppercase tracking-wider mb-1.5">Delivery period</p>
        <div className="relative">
          <button
            onClick={() => { setSlotOpen((o) => !o); setSubOpen(false); }}
            className={`w-full flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 text-left transition-colors ${
              slotOpen ? "border-[#0c831f]" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-xl shrink-0">{activeSlot.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#3d4152]">{activeSlot.label}</p>
              <p className="text-xs text-[#93959f]">{activeSlot.range}</p>
            </div>
            <ChevronDown size={15} className={`text-[#93959f] transition-transform shrink-0 ${slotOpen ? "rotate-180" : ""}`} />
          </button>

          {slotOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
              {TIME_SLOTS.map((slot, i) => {
                const isSelected = selected === slot.id;
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                      ${i < TIME_SLOTS.length - 1 ? "border-b border-gray-50" : ""}
                      ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}`}
                  >
                    <span className="text-base shrink-0">{slot.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isSelected ? "text-[#0c831f]" : "text-[#3d4152]"}`}>
                        {slot.label}
                      </p>
                      <p className="text-xs text-[#93959f]">{slot.range}</p>
                    </div>
                    {isSelected && <Check size={13} className="text-[#0c831f] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Dropdown 2 — specific 1-hour window */}
      <div>
        <p className="text-[10px] font-bold text-[#93959f] uppercase tracking-wider mb-1.5">Preferred hour</p>
        <div className="relative">
          <button
            onClick={() => { setSubOpen((o) => !o); setSlotOpen(false); }}
            className={`w-full flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 text-left transition-colors ${
              subOpen ? "border-[#0c831f]" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${subSlot ? "text-[#3d4152]" : "text-[#93959f]"}`}>
                {subSlot ?? "Any time within window"}
              </p>
            </div>
            <ChevronDown size={15} className={`text-[#93959f] transition-transform shrink-0 ${subOpen ? "rotate-180" : ""}`} />
          </button>

          {subOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
              {/* "No preference" option */}
              <button
                onClick={() => { setSubSlot(null); setSubOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 border-b border-gray-50 text-left transition-colors ${
                  !subSlot ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                <span className={`text-sm font-semibold ${!subSlot ? "text-[#0c831f]" : "text-[#93959f]"}`}>
                  Any time within window
                </span>
                {!subSlot && <Check size={13} className="text-[#0c831f]" />}
              </button>

              {activeSlot.subSlots.map((s, i) => {
                const isSelected = subSlot === s;
                return (
                  <button
                    key={s}
                    onClick={() => { setSubSlot(s); setSubOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors
                      ${i < activeSlot.subSlots.length - 1 ? "border-b border-gray-50" : ""}
                      ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}`}
                  >
                    <span className={`text-sm font-semibold ${isSelected ? "text-[#0c831f]" : "text-[#3d4152]"}`}>
                      {s}
                    </span>
                    {isSelected && <Check size={13} className="text-[#0c831f]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <span className="text-lg shrink-0">{activeSlot.emoji}</span>
        <div>
          <p className="text-sm font-bold text-[#0c831f]">
            {activeSlot.label} · {subSlot ?? activeSlot.range}
          </p>
          <p className="text-xs text-green-700 mt-0.5">Every scheduled delivery day</p>
        </div>
      </div>
    </div>
  );
}
