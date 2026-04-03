"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAY_KEYS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_HEADS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS    = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface Props {
  selected: string[];
  onChange: (days: string[]) => void;
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

const PRESETS = [
  { label: "Every day",  days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] },
  { label: "Weekdays",   days: ["Mon","Tue","Wed","Thu","Fri"] },
  { label: "Weekends",   days: ["Sat","Sun"] },
  { label: "M · W · F", days: ["Mon","Wed","Fri"] },
];

export default function DayPicker({ selected, onChange }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate]      = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDates, setSelected] = useState<Set<string>>(new Set());

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build cells: fill with prev-month overflow, current month, next-month overflow
  const cells: { date: Date; inMonth: boolean }[] = [];

  // Prev-month trailing days
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDow - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, prevMonthDays - i), inMonth: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  // Next-month leading days
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: new Date(year, month + 1, next++), inMonth: false });
  }

  function toggleDate(d: Date) {
    if (d < today) return;
    const key  = dateKey(d);
    const next = new Set(selectedDates);
    if (next.has(key)) next.delete(key); else next.add(key);
    setSelected(next);
    syncWeekdays(next);
  }

  function syncWeekdays(dates: Set<string>) {
    const keys = [...new Set(
      [...dates].map((k) => {
        const [y, m, day] = k.split("-").map(Number);
        return DAY_KEYS[new Date(y, m, day).getDay()];
      })
    )];
    onChange(keys);
  }

  function applyPreset(days: string[]) {
    const next = new Set<string>();
    const cursor = new Date(today);
    for (let i = 0; i < 14; i++) {
      if (days.includes(DAY_KEYS[cursor.getDay()])) next.add(dateKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    setSelected(next);
    onChange(days);
  }

  const canGoPrev = year > today.getFullYear() || month > today.getMonth();
  const orderedSelected = DAY_KEYS.filter((k) => selected.includes(k));
  const weeks = cells.length / 7;

  return (
    <div className="space-y-4">

      <div>
        <p className="text-sm font-bold text-[#3d4152] mb-0.5">Pick your delivery dates</p>
        <p className="text-xs text-[#93959f]">
          Tap dates to select — we&apos;ll repeat deliveries on those weekdays every week.
        </p>
      </div>

      {/* Calendar card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Month navigation */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            disabled={!canGoPrev}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} className="text-[#3d4152]" />
          </button>

          <p className="font-bold text-[#3d4152] text-sm tracking-wide select-none">
            {MONTHS[month]} {year}
          </p>

          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight size={16} className="text-[#3d4152]" />
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {DAY_HEADS.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-8 text-[10px] font-semibold text-[#93959f] uppercase tracking-wider select-none"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date grid */}
        <div className="grid grid-cols-7">
          {cells.map(({ date: d, inMonth }, i) => {
            const isLastCol  = (i + 1) % 7 === 0;
            const rowIdx     = Math.floor(i / 7);
            const isLastRow  = rowIdx === weeks - 1;
            const isPast     = d < today;
            const isToday    = d.getTime() === today.getTime();
            const isSelected = selectedDates.has(dateKey(d));
            const isPattern  = !isSelected && !isPast && inMonth && selected.includes(DAY_KEYS[d.getDay()]);
            const isDisabled = isPast || !inMonth;

            return (
              <button
                key={`${dateKey(d)}-${inMonth}`}
                onClick={() => inMonth ? toggleDate(d) : undefined}
                disabled={isDisabled}
                className={[
                  "relative h-14 flex flex-col items-end justify-start pt-1.5 pr-2 transition-colors",
                  !isLastCol ? "border-r border-gray-100" : "",
                  !isLastRow ? "border-b border-gray-100" : "",
                  isSelected              ? "bg-[#0c831f]"
                  : isPattern            ? "bg-green-50"
                  : !inMonth             ? "bg-gray-50 cursor-default"
                  : isPast               ? "bg-white cursor-default"
                  : "bg-white hover:bg-gray-50 cursor-pointer",
                ].join(" ")}
              >
                {/* Date number — circle for today */}
                <span
                  className={[
                    "w-7 h-7 flex items-center justify-center rounded-full text-sm select-none",
                    isSelected  ? "text-white font-bold"
                    : isToday   ? "bg-[#0c831f] text-white font-bold"
                    : isPattern ? "text-[#0c831f] font-semibold"
                    : !inMonth  ? "text-gray-300 font-normal"
                    : isPast    ? "text-gray-300 font-normal"
                    : "text-[#3d4152] font-medium",
                  ].join(" ")}
                >
                  {d.getDate()}
                </span>

                {/* Green dot for pattern days */}
                {isPattern && (
                  <span className="absolute bottom-1.5 right-3.5 w-1 h-1 rounded-full bg-[#0c831f]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#0c831f] inline-block" />
            <span className="text-[10px] text-[#93959f]">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-green-50 border border-green-300 inline-block" />
            <span className="text-[10px] text-[#93959f]">Recurring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0c831f] inline-block" />
            <span className="text-[10px] text-[#93959f]">Today</span>
          </div>
        </div>
      </div>

      {/* Quick presets */}
      <div>
        <p className="text-[10px] font-bold text-[#93959f] uppercase tracking-widest mb-2">Quick select</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const isActive =
              p.days.length === selected.length &&
              p.days.every((d) => selected.includes(d));
            return (
              <button
                key={p.label}
                onClick={() => applyPreset(p.days)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                  isActive
                    ? "bg-[#0c831f] border-[#0c831f] text-white shadow-sm"
                    : "bg-white border-gray-200 text-[#3d4152] hover:border-[#0c831f] hover:text-[#0c831f]"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {selected.length > 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-lg shrink-0">📅</span>
          <div>
            <p className="text-sm font-bold text-[#0c831f]">
              {selected.length} day{selected.length !== 1 ? "s" : ""} / week — recurring
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              Every {orderedSelected.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-gray-200 rounded-2xl px-4 py-3">
          <p className="text-sm text-[#93959f]">Tap dates above to choose delivery days</p>
        </div>
      )}

    </div>
  );
}
